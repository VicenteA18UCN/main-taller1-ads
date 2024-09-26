import { Module } from '@nestjs/common';
import { RestrictionsService } from './restrictions.service';
import { RestrictionsController } from './restrictions.controller';
import { HttpModule } from '@nestjs/axios';
import { CommonModule } from 'src/common/common.module';
import { SearchModule } from 'src/search/search.module';

@Module({
  imports: [HttpModule, CommonModule, SearchModule],
  controllers: [RestrictionsController],
  providers: [RestrictionsService],
  exports: [RestrictionsService],
})
export class RestrictionsModule {}
