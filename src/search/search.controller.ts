import { Controller, Get } from '@nestjs/common';
import { SearchService } from './search.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('search')
@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @ApiOperation({
    summary: 'Get students grades',
  })
  @Get('get-students-grades')
  getStudentsGrades() {
    return this.searchService.getStudentsGrades();
  }
}
