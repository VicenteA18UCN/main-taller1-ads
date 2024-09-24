import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class SearchService {
  private baseUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.baseUrl = this.configService.get<string>('URL_SEARCH_SERVICE');
  }

  // Función para obtener y procesar las calificaciones de los estudiantes
  async getStudentsGrades() {
    const excelencia = await this.fetchGrades(6.0, 7.0);
    const bueno = await this.fetchGrades(5.0, 6.0);
    const aceptable = await this.fetchGrades(4.0, 5.0);
    const noEsperado = await this.fetchGrades(1.0, 4.0);

    return {
      excelencia,
      bueno,
      aceptable,
      noEsperado,
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
