import { Injectable, Logger } from '@nestjs/common';
import { AssignGradeDto } from './dto/assign-grade.dto';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { CommonService } from 'src/common/common.service';

@Injectable()
export class GradesService {
  private baseUrl: string;
  private logger: Logger = new Logger(GradesService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly commonService: CommonService,
  ) {
    this.baseUrl = this.configService.get<string>('URL_GRADES_SERVICE');
  }

  assign(assignGradeDto: AssignGradeDto) {
    console.log(assignGradeDto);

    return this.commonService.checkRestriction(assignGradeDto.studentUuid);
  }
}
