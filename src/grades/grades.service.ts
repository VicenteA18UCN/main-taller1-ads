import { Injectable, Logger } from '@nestjs/common';
import { AssignGradeDto } from './dto/assign-grade.dto';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { RestrictionsService } from '../restrictions/restrictions.service';

@Injectable()
export class GradesService {
  private baseUrl: string;
  private logger: Logger = new Logger(GradesService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly restrictionsService: RestrictionsService,
  ) {
    this.baseUrl = this.configService.get<string>('URL_GRADES_SERVICE');
  }

  assign(assignGradeDto: AssignGradeDto) {
    console.log(assignGradeDto);

    return this.restrictionsService.checkRestriction(
      assignGradeDto.studentUuid,
    );
  }
}
