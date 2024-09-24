import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateGradeDto {
  @ApiProperty()
  @IsString()
  subjectName: string;

  @ApiProperty()
  @IsString()
  gradeName: string;

  @ApiProperty()
  @IsNumber()
  gradeValue: number;

  @ApiProperty()
  @IsString()
  comment: string;
}
