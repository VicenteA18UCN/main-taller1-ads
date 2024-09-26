import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginBodyDto } from './dto/login-body.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Login a user',
  })
  @Post('login')
  login(@Body() loginBodyDto: LoginBodyDto) {
    return this.authService.login(loginBodyDto);
  }
}
