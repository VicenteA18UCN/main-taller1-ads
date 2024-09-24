import { IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateGradeDto {
  @IsUUID()
  studentUuid: string;

  @IsString()
  subjectName: string;

  @IsString()
  gradeName: string;

  @IsNumber()
  gradeValue: number;

  @IsString()
  comment: string;
}
