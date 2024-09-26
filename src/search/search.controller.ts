import { Controller, Get } from '@nestjs/common';
import { SearchService } from './search.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ValidRoles } from 'src/auth/interfaces';

@ApiTags('search')
@ApiBearerAuth()
@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Auth(ValidRoles.Admin, ValidRoles.User)
  @ApiOperation({
    summary: 'Get students grades',
  })
  @Get('get-students-grades')
  getStudentsGrades() {
    return this.searchService.getStudentsGrades();
  }
}
