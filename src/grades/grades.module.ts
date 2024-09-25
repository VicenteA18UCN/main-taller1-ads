import { Module } from '@nestjs/common';
import { GradesService } from './grades.service';
import { GradesController } from './grades.controller';
import { RestrictionsModule } from 'src/restrictions/restrictions.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [GradesController],
  providers: [GradesService],
  imports: [RestrictionsModule, HttpModule],
})
export class GradesModule {}
