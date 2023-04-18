process.env.seeder = 'true';
import { app } from '../..';

import UsersSeeder from './UsersSeeder';
import ClientsSeeder from './ClientsSeeder';
async function seed() {
  console.log('Try to execute seeders...');

  await execute();

  console.log('Seeders executed');
}

async function execute() {
  //const zonesColor = new ZonesColorSeeder();
  const users = new UsersSeeder();
  const clients = new ClientsSeeder();

  try {

    await clients.seed();
    await users.seed();


  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

app.on('ready', async () => {
  console.log('Ready Bootstrap');
  await seed();
  process.exit();
});

// module.exports.seed = seed;
