import dotenv from 'dotenv';
import { createConnection } from 'typeorm';
import RebootServiceCommand from '../API/Application/Commands/CommandPids/RebootServiceCommand';

import database from '../API/Config/database';
import CommandBus from '../API/Application/Commands/CommandBus';

dotenv.config();
async function main() {
  if (process.argv.length > 2) {
    switch(process.argv[2].toLocaleLowerCase()) {
      case 'all':
        await CommandBus.handle(new RebootServiceCommand('server'));
        await CommandBus.handle(new RebootServiceCommand('sync'));
      break
      case 'server':
        await CommandBus.handle(new RebootServiceCommand('server'));
      break;
      case 'sync':
        await CommandBus.handle(new RebootServiceCommand('sync'));
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