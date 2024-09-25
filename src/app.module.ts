import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { GradesModule } from './grades/grades.module';
import { SearchModule } from './search/search.module';
import { ConfigModule } from '@nestjs/config';
import { RestrictionsModule } from './restrictions/restrictions.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    GradesModule,
    SearchModule,
    RestrictionsModule,
  ],
  controllers: [],
})
export class AppModule {}
