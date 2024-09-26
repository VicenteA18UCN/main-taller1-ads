import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { HttpModule } from '@nestjs/axios';
import { SearchModule } from 'src/search/search.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [HttpModule, SearchModule, AuthModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
