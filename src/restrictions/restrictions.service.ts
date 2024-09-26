import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { AssignRestrictionDto } from './dto/assign-restriction.dto';
import { lastValueFrom } from 'rxjs';
import { CommonService } from 'src/common/common.service';
import { AxiosError } from 'axios';

@Injectable()
export class RestrictionsService {
  private baseUrl: string;
  private logger: Logger = new Logger(RestrictionsService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly commonService: CommonService,
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
}
