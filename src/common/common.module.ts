import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { CommonController } from './common.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  exports: [CommonService],
  controllers: [CommonController],
  providers: [CommonService],
  imports: [HttpModule],
})
export class CommonModule {}
