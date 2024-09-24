import { Injectable } from '@nestjs/common';
import { LoginUserDto } from './dto/login/login-user.dto';

@Injectable()
export class UsersService {
  login(loginUserDto: LoginUserDto) {
    console.log(loginUserDto);
    return 'This action logs a user in';
  }
}
