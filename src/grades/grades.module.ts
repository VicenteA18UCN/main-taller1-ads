import { Module } from '@nestjs/common';
import { GradesService } from './grades.service';
import { GradesController } from './grades.controller';
import { HttpModule } from '@nestjs/axios';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [GradesController],
  providers: [GradesService],
  imports: [HttpModule, CommonModule],
})
export class GradesModule {}
