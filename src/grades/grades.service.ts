import { Injectable, Logger } from '@nestjs/common';
import { AssignGradeDto } from './dto/assign-grade.dto';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { CommonService } from 'src/common/common.service';
import { lastValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { SearchService } from 'src/search/search.service';

@Injectable()
export class GradesService {
  private baseUrl: string;
  private logger: Logger = new Logger(GradesService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly commonService: CommonService,
    private readonly searchService: SearchService,
  ) {
    this.baseUrl = this.configService.get<string>('URL_GRADES_SERVICE');
  }

  async assign(assignGradeDto: AssignGradeDto) {
    console.log(assignGradeDto);

    const isRestricted = await this.commonService.checkRestriction(
      assignGradeDto.studentUuid,
    );

    const isStudent = await this.commonService.checkStudent(
      assignGradeDto.studentUuid,
    );

    this.logger.log(`isRestricted: ${isRestricted}`);
    this.logger.log(`isStudent: ${isStudent}`);

    if (isRestricted || !isStudent) {
      return {
        success: false,
        data: 'Student not found or is restricted',
      };
    }

    const url = `${this.baseUrl}/grade/assignGrade`;

    const grades = assignGradeDto.grades.map(async (grade) => {
      const body = {
        studentUuid: assignGradeDto.studentUuid,
        ...grade,
      };
      this.logger.log(body);
      try {
        const response = await lastValueFrom(this.httpService.post(url, body));
        const gradeId = response.data;
        this.logger.log(gradeId);

        const responseSearch = await this.searchService.createGrade(
          assignGradeDto.studentUuid,
          gradeId,
          grade,
        );

        this.logger.log(responseSearch);
        return response.data;
      } catch (error) {
        if (error instanceof AxiosError) {
          this.logger.error('Error response:', {
            status: error.response?.status,
            data: error.response?.data,
            message: error.message,
          });

          return {
            success: false,
            data: error.response?.data,
          };
        } else {
          this.logger.error('Unexpected error:', error);
        }
        return [];
      }
    });

    const results = await Promise.all(grades);
    return results;
  }
}
