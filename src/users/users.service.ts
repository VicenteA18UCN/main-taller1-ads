import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';
import { lastValueFrom } from 'rxjs';
import { CreateStudentDto } from './dto/student/create-student.dto';
import { SearchService } from '../search/search.service';

@Injectable()
export class UsersService {
  private baseUrl: string;
  private logger: Logger = new Logger(UsersService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly searchService: SearchService,
  ) {
    this.baseUrl = this.configService.get<string>('URL_USERS_SERVICE');
  }

  async createStudent(createStudentDto: CreateStudentDto) {
    const url = `${this.baseUrl}/user/createStudent`;

    try {
      const response = await lastValueFrom(
        this.httpService.post(url, createStudentDto),
      );
      const student = await this.searchService.createStudents(
        createStudentDto,
        response.data.id,
      );

      return student;
    } catch (error) {
      if (error instanceof AxiosError) {
        this.logger.error('Error response:', {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message,
        });
        if (error.response?.status === 400) {
          throw new ConflictException('Student already exists');
        }
      } else {
        this.logger.error('Unexpected error:', error);
      }
      return [];
    }
  }
}
