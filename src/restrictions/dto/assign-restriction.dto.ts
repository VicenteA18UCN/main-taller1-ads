import { ApiProperty } from '@nestjs/swagger';
import { CreateRestrictionDto } from './create-restriction.dto';
import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class AssignRestrictionDto {
  @ApiProperty({ type: [CreateRestrictionDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateRestrictionDto)
  restrictions: CreateRestrictionDto[];
}
