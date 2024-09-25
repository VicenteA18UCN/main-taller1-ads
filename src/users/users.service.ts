import { Injectable, Logger } from '@nestjs/common';
import { LoginBodyDto } from './dto/login/login-body.dto';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';
import { lastValueFrom } from 'rxjs';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  private baseUrl: string;
  private logger: Logger = new Logger(UsersService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {
    this.baseUrl = this.configService.get<string>('URL_USERS_SERVICE');
  }

  async login(loginBodyDto: LoginBodyDto) {
    this.logger.log(loginBodyDto);
    const url = `${this.baseUrl}/user/login`;

    try {
      const response = await lastValueFrom(
        this.httpService.post(url, loginBodyDto),
      );
      const jwt = this.signToken(response.data);
      return { token: jwt };
    } catch (error) {
      if (error instanceof AxiosError) {
        this.logger.error('Error response:', {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message,
        });
      } else {
        this.logger.error('Unexpected error:', error);
      }
      return [];
    }
  }

  private signToken(payload: LoginBodyDto, options?: JwtSignOptions) {
    const token = this.jwtService.sign(payload, options);
    return token;
  }
}
