import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from './config/db/database.config';
import { validationSchema } from './config/validation/validation.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/db/typeorm.config';
import { IamModule } from './modules/iam/iam.module';
import { LoggerConfigModule } from './config/logger/logger-config.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      isGlobal: true,
      load: [databaseConfig],
      validationSchema: validationSchema,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: typeOrmConfig,
    }),

    LoggerConfigModule,
    IamModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
