import database from '../../../API/Config/database';
import { createConnection } from 'typeorm';
import 'reflect-metadata'; // Don't remove TypeORM need this.

let config = JSON.parse(JSON.stringify(database));
config.entities = database.entities;
config.synchronize = true;

createConnection(config).then(async (conn) => {
  await getEntities(conn);
  console.log('Migration Global Succesfull');
  process.exit();
}).catch((err) => {
  console.error('ERROR @index.ts:createConnection');
  console.error(err);
  process.exit(1);
});

async function getEntities(connection) {
  const entities = [];
  connection.entityMetadatas.forEach(
    x => {
      entities.push({ name: x.name, tableName: x.tableName });
    }
  );
  await dropEntities(connection, entities);
}


async function dropEntities(conection, entities) {
  try {
    for (const entity of entities) {
      const repository = await conection.getRepository(entity.name);
      await repository.query(`SET FOREIGN_KEY_CHECKS = 0 ;`);
      await repository.query(`DROP TABLE IF EXISTS ${entity.tableName};`);
    }
  } catch (error) {
    throw new Error(`ERROR: Cleaning test db: ${error}`);
  }
}



