import { Module } from '@nestjs/common';
import { RestrictionsService } from './restrictions.service';
import { RestrictionsController } from './restrictions.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [RestrictionsController],
  providers: [RestrictionsService],
  exports: [RestrictionsService],
})
export class RestrictionsModule {}
