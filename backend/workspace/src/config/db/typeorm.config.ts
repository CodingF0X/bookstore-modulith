import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { IDatabaseConfig } from './database.config-interface';

export const typeOrmConfig = async (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => {
  const dbConfig = configService.get<IDatabaseConfig>('database');

  return Promise.resolve({
    type: 'postgres',
    host: dbConfig!.host,
    port: dbConfig!.port,
    username: dbConfig!.username,
    password: dbConfig!.password,
    database: dbConfig!.database,
    autoLoadEntities: true,
    synchronize: process.env.STAGE === 'dev', // Only sync schema in development!
  });
};
