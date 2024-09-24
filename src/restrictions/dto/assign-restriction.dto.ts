import { IsString, IsUUID } from 'class-validator';

export class AssignRestrictionDto {
  @IsUUID()
  studentUuid: string;
  @IsString()
  description: string;
}
