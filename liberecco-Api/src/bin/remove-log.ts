import CommandBus from '../API/Application/Commands/CommandBus';
import dotenv from 'dotenv';

import DeleteLogBeforeDayCommand from '../API/Application/Commands/Logs/DeleteLogBeforeDayCommand';

import database from '../API/Config/database';
import { createConnection } from 'typeorm';

dotenv.config();

async function main() {
  if (process.argv.length > 2) {
    let days: number = Number(process.argv[2]);
    await CommandBus.handle(new DeleteLogBeforeDayCommand(days));
  } else {
    await CommandBus.handle(new DeleteLogBeforeDayCommand(0));
  }
}

createConnection(database).then(async (conn) => {

  await main();
  process.exit(0);

}).catch((err) => {
  console.error('ERROR @index.ts:createConnection');
  console.error(err);
  process.exit(1);
});

