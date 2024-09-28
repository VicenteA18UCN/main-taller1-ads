import { Module } from '@nestjs/common';
import { GradesService } from './grades.service';
import { GradesController } from './grades.controller';
import { HttpModule } from '@nestjs/axios';
import { CommonModule } from 'src/common/common.module';
import { SearchModule } from 'src/search/search.module';

@Module({
  controllers: [GradesController],
  providers: [GradesService],
  imports: [HttpModule, CommonModule, SearchModule],
})
export class GradesModule {}
