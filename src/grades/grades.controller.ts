import { Controller, Post, Body } from '@nestjs/common';
import { GradesService } from './grades.service';
import { AssignGradeDto } from './dto/assign-grade.dto';

@Controller('grades')
export class GradesController {
  constructor(private readonly gradesService: GradesService) {}

  @Post('assign')
  create(@Body() assignCreateDto: AssignGradeDto) {
    return this.gradesService.assign(assignCreateDto);
  }
}
