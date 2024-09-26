import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { GradesModule } from './grades/grades.module';
import { SearchModule } from './search/search.module';
import { ConfigModule } from '@nestjs/config';
import { RestrictionsModule } from './restrictions/restrictions.module';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    GradesModule,
    SearchModule,
    RestrictionsModule,
    AuthModule,
    CommonModule,
  ],
  controllers: [],
})
export class AppModule {}
