import dotenv from 'dotenv';
import { createConnection } from 'typeorm';
import RemovePidCommand from '../API/Application/Commands/CommandPids/RemovePidCommand';

import database from '../API/Config/database';
import CommandBus from '../API/Application/Commands/CommandBus';

dotenv.config();
async function main() {
  if (process.argv.length > 2) {
    switch(process.argv[2].toLocaleLowerCase()) {
      case 'all':
        await CommandBus.handle(new RemovePidCommand('all'));
      break
      case 'server':
        await CommandBus.handle(new RemovePidCommand('server'));
      break;
      case 'sync':
        await CommandBus.handle(new RemovePidCommand('sync'));
      break;
    }
  }
}

createConnection(database).then(async () => {
  await main();
  process.exit(0);
}).catch((err) => {
  console.error('ERROR @index.ts:createConnection');
  console.error(err);
  process.exit(1);
});