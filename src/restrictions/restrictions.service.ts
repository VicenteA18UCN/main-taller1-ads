import { Injectable } from '@nestjs/common';
import { AssignRestrictionDto } from './dto/assign-restriction.dto';

@Injectable()
export class RestrictionsService {
  assign(assignRestrictionDto: AssignRestrictionDto) {
    console.log(assignRestrictionDto);
    return 'This action adds a new restriction';
  }
}
