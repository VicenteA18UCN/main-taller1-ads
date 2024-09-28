import { Controller, Post, Body, Delete } from '@nestjs/common';
import { RestrictionsService } from './restrictions.service';

import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AssignRestrictionDto } from './dto/assign-restriction.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ValidRoles } from 'src/auth/interfaces';
import { RemoveRestrictionDto } from './dto/remove-restriction.dto';

@ApiTags('restrictions')
@Controller('restrictions')
export class RestrictionsController {
  constructor(private readonly restrictionsService: RestrictionsService) {}

  @ApiCreatedResponse({
    description:
      "List of restrictions assigned with status 'success' or 'error'",
  })
  @ApiBadRequestResponse({
    description: 'Error assigning restrictions',
  })
  @Auth(ValidRoles.Admin)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Assign a restriction',
  })
  @Post('assign')
  assign(@Body() assignRestrictionDto: AssignRestrictionDto) {
    return this.restrictionsService.assign(assignRestrictionDto);
  }

  @ApiOkResponse({
    description:
      "List of restrictions removed with status 'success' or 'error'",
  })
  @Auth(ValidRoles.Admin)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Remove a restriction',
  })
  @Delete('remove')
  remove(@Body() removeRestrictionDto: RemoveRestrictionDto) {
    return this.restrictionsService.remove(removeRestrictionDto);
  }
}
