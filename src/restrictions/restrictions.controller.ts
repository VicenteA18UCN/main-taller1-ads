import { Controller, Post, Body } from '@nestjs/common';
import { RestrictionsService } from './restrictions.service';

import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AssignRestrictionDto } from './dto/assign-restriction.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ValidRoles } from 'src/auth/interfaces';

@ApiTags('restrictions')
@Controller('restrictions')
export class RestrictionsController {
  constructor(private readonly restrictionsService: RestrictionsService) {}

  @Auth(ValidRoles.Admin)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Assign a restriction',
  })
  @Post('assign')
  assign(@Body() assignRestrictDto: AssignRestrictionDto) {
    return this.restrictionsService.assign(assignRestrictDto);
  }

  @ApiOperation({
    summary: 'Remove a restriction',
  })
  @Post('remove')
  remove(@Body() assignRestrictDto: AssignRestrictionDto) {
    return this.restrictionsService.remove(assignRestrictDto);
  }
}
