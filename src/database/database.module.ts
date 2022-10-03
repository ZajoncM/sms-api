import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  DatabaseConfig,
  DatabaseConfigType,
  makeDatabaseConfig,
} from './database.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forFeature(DatabaseConfig)],
      inject: [DatabaseConfig.KEY],
      useFactory(config: DatabaseConfigType) {
        return makeDatabaseConfig(config);
      },
    }),
  ],
})
export class DatabaseModule {}
