import database from '../API/Config/database';
import { createConnection, getManager } from 'typeorm';

createConnection(database).then(async () => {
  const argv = require('yargs').argv;
  const dbName = argv.test ? process.env.TYPEORM_DATABASE_TEST : process.env.TYPEORM_DATABASE;

  await getManager().transaction(async manager => {

    await manager.query(`DELETE FROM ${dbName}.vin_command_instance;`);
  });
  process.exit(0);

}).catch((err) => {
  console.error('ERROR @index.ts:createConnection');
  console.error(err);
  process.exit(1);
});
