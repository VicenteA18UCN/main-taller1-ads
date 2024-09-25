import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginBodyDto } from './dto/login/login-body.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({
    summary: 'Login a user',
  })
  @Post('login')
  login(@Body() loginBodyDto: LoginBodyDto) {
    return this.usersService.login(loginBodyDto);
  }
}
