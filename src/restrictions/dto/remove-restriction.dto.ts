import { IsString } from 'class-validator';

export class RemoveRestrictionDto {
  @IsString()
  param: string;
}
