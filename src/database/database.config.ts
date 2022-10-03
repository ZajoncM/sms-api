import { ConfigType, registerAs } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const DatabaseConfig = registerAs('database', () => ({
  database: process.env.POSTGRES_DB ?? '',
  username: process.env.POSTGRES_USER ?? '',
  password: process.env.POSTGRES_PASSWORD ?? '',
  port: +(process.env.POSTGRES_PORT ?? 5432),
}));

export type DatabaseConfigType = ConfigType<typeof DatabaseConfig>;

export const makeDatabaseConfig = (
  config: DatabaseConfigType,
): DataSourceOptions => ({
  type: 'postgres',
  database: config.database,
  username: config.username,
  password: config.password,
  port: config.port,
  namingStrategy: new SnakeNamingStrategy(),
});
