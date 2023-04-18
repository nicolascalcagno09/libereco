import database from '../../../API/Config/database';
import { createConnection } from 'typeorm';
import 'reflect-metadata'; // Don't remove TypeORM need this.

let config = JSON.parse(JSON.stringify(database));
config.entities = database.entities;
config.synchronize = true;

createConnection(config).then((conn) => {

  console.log('Migration Global Succesfull');
  process.exit();
}).catch((err) => {
  console.error('ERROR @index.ts:createConnection');
  console.error(err);
  process.exit(1);
});





