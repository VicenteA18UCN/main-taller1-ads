import { Controller, Post, Body } from '@nestjs/common';
import { RestrictionsService } from './restrictions.service';

import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AssignRestrictionDto } from './dto/assign-restriction.dto';

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
