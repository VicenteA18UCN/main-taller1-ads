import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { CreateStudentDto } from 'src/users/dto/student/create-student.dto';

@Injectable()
export class SearchService {
  private baseUrl: string;
  private logger: Logger = new Logger(SearchService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.baseUrl = this.configService.get<string>('URL_SEARCH_SERVICE');
  }

  public async createStudents(createStudentDto: CreateStudentDto, id: string) {
    const url = `${this.baseUrl}/students`;
    const body = { ...createStudentDto, _id: id, uuid: id };

    try {
      const response = await lastValueFrom(this.httpService.post(url, body));
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        this.logger.error('Error in HTTP response:', {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message,
        });
      } else {
        this.logger.error('Unexpected error:', error);
      }
      return null;
    }
  }

  public async getStudentsByRestrictionId(param: string) {
    const url = `${this.baseUrl}/restrictions/students`;
    const queryParams = `?search=${param}`;

    try {
      const response = await lastValueFrom(
        this.httpService.get(`${url}${queryParams}`),
      );
      return response.data.data;
    } catch (error) {
      console.error('Error fetching students by restriction id:', error);
      return [];
    }
  }

  public async createRestrictions(id: string, restrictionReason: string) {
    const url = `${this.baseUrl}/restrictions`;
    const body = {
      _id: id,
      uuid: id,
      restrictionReason: restrictionReason,
    };

    try {
      const response = await lastValueFrom(this.httpService.post(url, body));
      return {
        id,
        success: true,
        data: response.data,
      };
    } catch (error) {
      if (error instanceof AxiosError) {
        this.logger.error('Error in HTTP response:', {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message,
        });
        return {
          id,
          success: false,
          data: error.response?.data,
        };
      } else {
        this.logger.error('Unexpected error:', error);
      }
      return null;
    }
  }

  public async removeRestricionFromAllStudents(restrictionUuid: string) {
    const url = `${this.baseUrl}/students/restrictions/${restrictionUuid}`;

    try {
      const response = await lastValueFrom(this.httpService.delete(url));
      this.logger.log(response.data);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        this.logger.error('Error in HTTP response:', {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message,
        });
      } else {
        this.logger.error('Unexpected error:', error);
      }
      return null;
    }
  }

  public async addRestrictionToStudent(
    studentUuid: string,
    restrictionUuid: string,
  ) {
    const url = `${this.baseUrl}/students/${studentUuid}`;
    const body = { restrictions: [restrictionUuid] };

    try {
      const response = await lastValueFrom(this.httpService.patch(url, body));
      return {
        studentUuid,
        success: true,
        data: response.data.data,
      };
    } catch (error) {
      if (error instanceof AxiosError) {
        this.logger.error('Error in HTTP response:', {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message,
        });
        return {
          studentUuid,
          success: false,
          data: error.response?.data,
        };
      } else {
        this.logger.error('Unexpected error:', error);
      }
      return null;
    }
  }

  // Función para obtener y procesar las calificaciones de los estudiantes
  async getStudentsGrades() {
    const excelent = await this.fetchGrades(6.0, 7.0);
    const good = await this.fetchGrades(5.0, 6.0);
    const aceptable = await this.fetchGrades(4.0, 5.0);
    const notExpected = await this.fetchGrades(1.0, 4.0);

    return {
      excelencia: excelent,
      bueno: good,
      aceptable: aceptable,
      noEsperado: notExpected,
    };
  }

  // Función para obtener las calificaciones de un rango específico
  private async fetchGrades(gte: number, lte: number) {
    const url = `${this.baseUrl}/grades`;
    const queryParams = `?value[gte]=${gte}&value[lte]=${lte}&sort=-value`;

    try {
      const response = await lastValueFrom(
        this.httpService.get(`${url}${queryParams}`),
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching grades between ${gte} and ${lte}:`, error);
      return [];
    }
  }
}
