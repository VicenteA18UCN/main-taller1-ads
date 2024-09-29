import { Controller, Get } from '@nestjs/common';
import { SearchService } from './search.service';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ValidRoles } from 'src/auth/interfaces';

@ApiTags('search')
@ApiBearerAuth()
@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @ApiOkResponse({
    description: 'Students grades fetched successfully',
  })
  @Auth(ValidRoles.Admin, ValidRoles.Docente)
  @ApiOperation({
    summary: 'Get students grades',
  })
  @Get('get-students-grades')
  getStudentsGrades() {
    return this.searchService.getStudentsGrades();
  }
}
