import { Injectable } from '@nestjs/common';
import { AssignGradeDto } from './dto/assign-grade.dto';

@Injectable()
export class GradesService {
  assign(assignGradeDto: AssignGradeDto) {
    console.log(assignGradeDto);
    return 'This action adds a new grade';
  }
}
