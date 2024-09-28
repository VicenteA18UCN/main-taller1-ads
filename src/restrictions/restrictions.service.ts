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
            responseSearchRes.id,
          );

        if (responseSearchRes.success && responseResToStudent.success) {
          return {
            studentUuid,
            success: true,
            data: response.data,
          };
        } else {
          return {
            studentUuid,
            success: false,
          };
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          this.logger.error('Error in HTTP response:', {
            status: error.response?.status,
            data: error.response?.data,
            message: error.message,
          });
          return {
            studentUuid,
            success: false,
            data: error.response?.data,
          };
        } else {
          this.logger.error('Unexpected error:', error);
        }
      }
    });

    const results = await Promise.all(promises);

    return results;
  }

  async remove(removeRestrictionDto: RemoveRestrictionDto) {
    const students = await this.searchService.getStudentsByRestrictionId(
      removeRestrictionDto.param,
    );

    const uniqueRestrictionsIds = [];

    const promises = students.map(async (student) => {
      const url = `${this.baseUrl}/restrictions-service/${student.studentId}/restrictions/${student.restriction._id}`;

      if (!uniqueRestrictionsIds.includes(student.restriction._id)) {
        uniqueRestrictionsIds.push(student.restriction._id);
      }
      try {
        const response = await lastValueFrom(
          this.httpService.delete(url, { data: {} }),
        );

        return {
          success: true,
          ...response.data,
          restrictionId: student.restriction._id,
        };
      } catch (error) {
        if (error instanceof AxiosError) {
          this.logger.error('Error in HTTP response:', {
            status: error.response?.status,
            data: error.response?.data,
            message: error.message,
          });
          return {
            studentUuid: student.studentId,
            success: false,
            data: error.response,
          };
        } else {
          this.logger.error('Unexpected error:', error);
        }
      }
    });

    await Promise.all(
      uniqueRestrictionsIds.map(async (restrictionId) => {
        const responseSearch =
          await this.searchService.removeRestricionFromAllStudents(
            restrictionId,
          );

        return responseSearch;
      }),
    );

    const results = await Promise.all(promises);

    return results;
  }
}
