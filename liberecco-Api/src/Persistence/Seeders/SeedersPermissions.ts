process.env.seeder = 'true';

import { app } from '../../';



async function seed() {
  console.log('Try to execute seeders...');

  await execute();

  console.log('Seeders executed');

}


async function execute() {


  try {
    // Remove data in tables related to permissions
    console.log('Truncate tables')
    //await dropDataEntity('PermissionGroupDetail');
    //await dropDataEntity('ProcessTypePermissionGroup');
    // await dropDataEntity('PermissionUser');
    // await dropDataEntity('PermissionUserWarehouse');
    // await dropDataByTableName('krack_role_permissions_permission');
    // await dropDataEntity('PermissionGroup');
    // await dropDataEntity('Permission');

    console.log('Loading Permission Seeders Again');
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
}



app.on('ready', async () => {
  console.log('Ready Bootstrap');
  await seed();
  process.exit();
});

// module.exports.seed = seed;
