import { Controller, Post, Body } from '@nestjs/common';
import { GradesService } from './grades.service';
import { AssignGradeDto } from './dto/assign-grade.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ValidRoles } from 'src/auth/interfaces';

@ApiTags('grades')
@Controller('grades')
export class GradesController {
  constructor(private readonly gradesService: GradesService) {}

  @Auth(ValidRoles.Admin, ValidRoles.User)
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'Assign grades to students',
  })
  @ApiOperation({
    summary: 'Assign grades to students',
  })
  @Post('assign')
  assign(@Body() assignCreateDto: AssignGradeDto) {
    return this.gradesService.assign(assignCreateDto);
  }
}
