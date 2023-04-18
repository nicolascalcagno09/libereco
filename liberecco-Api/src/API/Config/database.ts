import * as dotenv from 'dotenv';
const argv = require('yargs').argv;
import { ConnectionOptions } from 'typeorm';

dotenv.config();

const dbUsername = argv.test ? process.env.TYPEORM_USERNAME_TEST : process.env.TYPEORM_USERNAME;
const dbPassword = argv.test ? process.env.TYPEORM_PASSWORD_TEST : process.env.TYPEORM_PASSWORD;
const dbName = argv.test ? process.env.TYPEORM_DATABASE_TEST : process.env.TYPEORM_DATABASE;

const database: ConnectionOptions = {
  type: process.env.TYPEORM_CONNECTION as 'mysql',
  host: process.env.TYPEORM_HOST || 'localhost',
  port: Number(process.env.TYPEORM_PORT) || 3306,
  name: 'default',
  username: dbUsername || 'user',
  password: dbPassword || '',
  database: dbName || 'db',
  synchronize: false,
  logging: false,
  entityPrefix: process.env.TYPEORM_ENTITY_PREFIX || 'vin_',
  connectTimeout: 60000,
  acquireTimeout: 60 * 60 * 1000,
  entities: [
    'lib/src/API/Application/Domain/Entities/**/*.js',
    //'src/API/Application/Domain/Entities/**/*.ts',
  ],
};

export default database;







