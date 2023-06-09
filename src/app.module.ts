import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { config } from './config/application.config';
import { TypeOrmCoreModule } from '@nestjs/typeorm/dist/typeorm-core.module';
import { IamModule } from './iam/iam.module';
import { UsersModule } from './users/users.module';
import { CoffeesModule } from './coffees/coffees.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CoffeesModule,
    UsersModule,
    TypeOrmCoreModule.forRoot(config.postgres),
    IamModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
