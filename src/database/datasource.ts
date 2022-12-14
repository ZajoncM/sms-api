import { DatabaseConfig, makeDatabaseConfig } from './database.config';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export default new DataSource({
  ...makeDatabaseConfig(DatabaseConfig()),
  migrations: [__dirname + '/../database/migrations/*.{js,ts}'],
});
