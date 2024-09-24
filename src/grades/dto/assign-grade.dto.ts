import { ApiProperty } from '@nestjs/swagger';
import { CreateGradeDto } from './create-grade.dto';
import { IsArray, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class AssignGradeDto {
  @ApiProperty()
  @IsUUID()
  studentUuid: string;

  @ApiProperty({ type: [CreateGradeDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateGradeDto)
  grades: CreateGradeDto[];
}
