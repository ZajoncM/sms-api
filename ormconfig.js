const dotEnvPath = process.env.NODE_ENV === '.env';
const SnakeNamingStrategy =
  require('typeorm-naming-strategies').SnakeNamingStrategy; // eslint-disable-line @typescript-eslint/no-var-requires

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: dotEnvPath });

module.exports = {
  type: 'postgres',
  database: process.env.POSTGRES_DB ?? '',
  username: process.env.POSTGRES_USER ?? '',
  password: process.env.POSTGRES_PASSWORD ?? '',
  port: +(process.env.POSTGRES_PORT ?? 5432),
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  namingStrategy: new SnakeNamingStrategy(),
};
