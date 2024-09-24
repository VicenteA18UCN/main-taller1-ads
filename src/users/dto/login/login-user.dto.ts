import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, IsEmail, IsString } from 'class-validator';

export class LoginUserDto {
  @ApiProperty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsAlphanumeric()
  password: string;
}
