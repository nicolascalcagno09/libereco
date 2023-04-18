import database from '../../../API/Config/database';
import { createConnection, getConnection } from 'typeorm';
import 'reflect-metadata'; // Don't remove TypeORM need this.
import asyncForEach from '../../../API/Common/AsyncForeach';

let config = JSON.parse(JSON.stringify(database));
config.entities = database.entities;
config.synchronize = true;



async function getEntities(connection) {
  const entities = [];
  connection.entityMetadatas.forEach(
    x => {
      entities.push({ name: x.name, tableName: x.tableName });
    }
  );
  return entities;
}

export async function dropDataEntity(entity) {

  try {
    const conn = await getConnection();
    const entities = await getEntities(conn);
    entity = entities.filter(x => x.name == entity)[0];
    // Drop table
    const repository = await conn.getRepository(entity.name);
    await repository.query(`SET FOREIGN_KEY_CHECKS = 0 ;`);
    await repository.query(`TRUNCATE TABLE ${entity.tableName};`);
    console.log(`Truncate table ${entity.tableName};`)


  } catch (error) {
    throw new Error(`ERROR: Cleaning test db: ${error}`);
  }
}

export async function dropDataByTableName(tableName) {

  try {
    const conn = await getConnection();
    const repository = await conn;
    await repository.query(`SET FOREIGN_KEY_CHECKS = 0 ;`);
    await repository.query(`TRUNCATE TABLE ${tableName};`);

  } catch (error) {
    throw new Error(`ERROR: Cleaning test db: ${error}`);
  }
}

export async function recconectDatabase() {
  await getConnection().close()
  // Create conection to load entities again
  return await createConnection(config);
}

