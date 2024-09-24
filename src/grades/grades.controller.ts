import { Controller, Post, Body } from '@nestjs/common';
import { GradesService } from './grades.service';
import { AssignGradeDto } from './dto/assign-grade.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('grades')
@Controller('grades')
export class GradesController {
  constructor(private readonly gradesService: GradesService) {}

  @ApiOperation({
    summary: 'Assign grades to students',
  })
  @Post('assign')
  assign(@Body() assignCreateDto: AssignGradeDto) {
    return this.gradesService.assign(assignCreateDto);
  }
}
