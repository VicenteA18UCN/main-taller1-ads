import { Controller, Post, Body } from '@nestjs/common';
import { RestrictionsService } from './restrictions.service';
import { AssignRestrictionDto } from './dto/assign-restriction.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('restrictions')
@Controller('restrictions')
export class RestrictionsController {
  constructor(private readonly restrictionsService: RestrictionsService) {}

  @ApiOperation({
    summary: 'Assign a restriction',
  })
  @Post('assign')
  assign(@Body() assignRestrictDto: AssignRestrictionDto) {
    return this.restrictionsService.assign(assignRestrictDto);
  }
}
