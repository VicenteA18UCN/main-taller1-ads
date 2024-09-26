import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { AssignRestrictionDto } from './dto/assign-restriction.dto';
import { lastValueFrom } from 'rxjs';
import { CommonService } from 'src/common/common.service';
import { AxiosError } from 'axios';
import { SearchService } from 'src/search/search.service';
import { RemoveRestrictionDto } from './dto/remove-restriction.dto';

@Injectable()
export class RestrictionsService {
  private baseUrl: string;
  private logger: Logger = new Logger(RestrictionsService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly commonService: CommonService,
    private readonly searchService: SearchService,
  ) {
    this.baseUrl = this.configService.get<string>('URL_RESTRICTIONS_SERVICE');
  }

  async assign(assignRestrictionDto: AssignRestrictionDto) {
    const restrictions = assignRestrictionDto.restrictions;
    console;

    const promises = restrictions.map(async (restriction) => {
      const { studentUuid, description } = restriction;
      const isStudent = await this.commonService.checkStudent(studentUuid);
      if (!isStudent) {
        return {
          studentUuid,
          success: false,
          data: new NotFoundException('Student not found'),
        };
      }

      const url = `${this.baseUrl}/restrictions-service/${studentUuid}/add`;

      try {
        const response = await lastValueFrom(
          this.httpService.post(url, { description }),
        );
        const responseSearchRes = await this.searchService.createRestrictions(
          response.data.restriction.id,
          description,
        );
        const responseResToStudent =
          await this.searchService.addRestrictionToStudent(
            studentUuid,
            responseSearchRes.data.uuid,
          );

        this.logger.log(responseResToStudent);
        return {
          studentUuid,
          success: true,
          data: response.data,
        };
      } catch (error) {
        if (error instanceof AxiosError) {
          this.logger.error('Error in HTTP response:', {
            status: error.response?.status,
            data: error.response?.data,
            message: error.message,
          });
        } else {
          this.logger.error('Unexpected error:', error);
        }
      }
    });

    const results = await Promise.all(promises);

    return results;
  }

  async remove(removeRestrictionDto: RemoveRestrictionDto) {
    console.log(removeRestrictionDto);
    const students = await this.searchService.getStudentsByRestrictionId(
      removeRestrictionDto.restrictionId,
    );

    console.log(students);
    return;
  }
}
