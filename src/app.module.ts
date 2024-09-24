import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { GradesModule } from './grades/grades.module';

@Module({
  imports: [UsersModule, GradesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
