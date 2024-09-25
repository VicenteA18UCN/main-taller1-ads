import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { AssignRestrictionDto } from './dto/assign-restriction.dto';
import { map } from 'rxjs/operators';

@Injectable()
export class RestrictionsService {
  private readonly restrictionServiceUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.restrictionServiceUrl = this.configService.get<string>(
      'URL_RESTRICTIONS_SERVICE',
    );
  }

  async assign(assignRestrictionDto: AssignRestrictionDto) {
    const { studentUuid, description } = assignRestrictionDto;

    const url = `${this.restrictionServiceUrl}/students/${studentUuid}/restrictions`;

    const response = await this.httpService
      .post(url, { description })
      .pipe(map((response) => response.data));

    return response;
  }

  public async checkRestriction(studentUuid: string) {
    const url = `${this.restrictionServiceUrl}/restrictions-service/${studentUuid}/check-restrictions`;

    const response = await this.httpService
      .get(url)
      .pipe(map((response) => response.data));

    return response;
  }
}
