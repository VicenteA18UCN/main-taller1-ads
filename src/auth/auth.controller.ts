import { Controller, Post, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiAcceptedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginBodyDto } from './dto/login-body.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiAcceptedResponse({
    description: 'User logged in successfully',
  })
  @ApiOperation({
    summary: 'Login a user',
  })
  @Post('login')
  @HttpCode(HttpStatus.ACCEPTED)
  login(@Body() loginBodyDto: LoginBodyDto) {
    return this.authService.login(loginBodyDto);
  }
}
