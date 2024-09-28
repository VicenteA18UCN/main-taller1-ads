import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class CommonService {
  private usersUrl: string;
  private restrictionUrl: string;
  private logger: Logger = new Logger(CommonService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.usersUrl = this.configService.get<string>('URL_USERS_SERVICE');
    this.restrictionUrl = this.configService.get<string>(
      'URL_RESTRICTIONS_SERVICE',
    );
  }

  public async checkRestriction(studentUuid: string) {
    const url = `${this.restrictionUrl}/restrictions-service/${studentUuid}/check-restrictions`;

    try {
      const response = await lastValueFrom(this.httpService.get(url));
      return response.data.hasRestrictions;
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
      return null;
    }
  }

  public async checkStudent(studentUuid: string): Promise<boolean> {
    const url = `${this.usersUrl}/user/CheckStudent/${studentUuid}`;
    try {
      const response = await lastValueFrom(this.httpService.get(url));
      return response.data;
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
      return false;
    }
  }
}
