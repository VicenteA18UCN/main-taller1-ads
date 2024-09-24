import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { GradesModule } from './grades/grades.module';
import { SearchModule } from './search/search.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    GradesModule,
    SearchModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
