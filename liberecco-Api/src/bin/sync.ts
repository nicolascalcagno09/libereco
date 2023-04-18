#!/usr/bin/env ./node_modules/ts-node/dist/bin.js

import dotenv from 'dotenv';
import moment from 'moment';
import { createConnection } from 'typeorm';
import database from '../API/Config/database';
import CommandBus from '../API/Application/Commands/CommandBus';
import { ServiceType } from '../API/Application/Domain/Enums/ServiceType';
import StoppedServiceException from '../API/Application/Exceptions/StoppedServiceException';
import ServiceExpirationsServices from '../API/Application/Services/CommandPids/ServiceExpirationServices';
import CommandInstanceServices from '../API/Application/Services/CommandInstances/CommandInstanceServices';


import '../API/Common/Logger';


async function main() {
  console.log('Synchronize');
  if (process.argv.length > 2) {
    if (!process.argv[3] || process.argv[3].toLowerCase() !== '--force') {
      const serviceExpirationsServices = new ServiceExpirationsServices();
      const service = await serviceExpirationsServices.getByService(ServiceType.SYNC);
      if (service) {
        if (moment(service.getExpirationDate()).format() > moment().format()) {
          throw new StoppedServiceException('The synchronization service is temporarily stopped')
        } else if (service) {
          await serviceExpirationsServices.destroy(service.getId());
        }
      }
    }

    switch (process.argv[2].toLowerCase()) {
      case 'xxx':
        //await CommandBus.handle(new SynchronizePricesCommand());
        break;

    }
  }
}

if (process.argv.length === 2) {
  console.log('Usage: ' + process.argv[1] + ' [ colours | stores | sizes | models | all ]');
  process.exit(0);
}

createConnection(database).then(async (conn) => {
  const commandInstanceServices = new CommandInstanceServices();
  await commandInstanceServices.clear();

  await main();
  process.exit(0);
}).catch((err) => {
  console.error('ERROR @index.ts:createConnection');
  console.error(err);
  process.exit(1);
});

// console.log(process);
