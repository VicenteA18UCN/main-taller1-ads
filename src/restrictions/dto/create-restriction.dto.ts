import { IsString, IsUUID } from 'class-validator';

export class CreateRestrictionDto {
  @IsUUID()
  studentUuid: string;
  @IsString()
  description: string;
}
