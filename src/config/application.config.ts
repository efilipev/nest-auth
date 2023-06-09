import * as process from 'process';
import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';

export const config: { [key: string]: TypeOrmModuleOptions } = {
  postgres: {
    type: 'postgres',
    host: 'localhost',
    port: process.env.POSTGRES_PORT || 5432,
    username: 'postgres',
    password: '12345',
    database: 'postgres',
    autoLoadEntities: true,
    synchronize: true,
  } as TypeOrmModuleOptions,
};
