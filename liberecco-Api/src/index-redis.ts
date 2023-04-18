/**
* @file index
* @description Starts a microservice defined on config/service.json powered by hydra
**/
import hydraExpress from 'hydra-express';
import packageJson from '../package.json';
import serviceJson from './API/Config/service.json';
import 'reflect-metadata'; // Don't remove TypeORM need this.
import cors from 'cors';
import { Express } from 'express';
import bodyParser from 'body-parser';
import {
  createConnection,
  Connection
} from 'typeorm';
import './API/Common/Logger';
import routes from './API/Routes/routes';
import database from './API/Config/database';
import registerPids from './API/Common/RegisterPids';
import configuration from './API/Config/configuration';
import requestFirewall from './API/Middlewares/RequestFirewall';
import ErrorHandler from './API/Middlewares/ErrorHandler';
import CommandBus from './API/Application/Commands/CommandBus';
import ListenPickOrderACKCommand from './API/Application/Commands/ATLAS/Input/ListenPickOrderACKCommand';
import ListenFotoCelulaCommand from './API/Application/Commands/ATLAS/Input/ListenFotoCelulaCommand';
import expressListEndpoints from 'express-list-endpoints';
import corsConfiguration from './API/Config/cors';
/* Instantiate ExpressJs Application */
export const app = hydraExpress.getExpressApp();
var expressStatic = require('express');

const formidableMiddleware = require('express-formidable');
hydraExpress.log = () => { };
let currentConnection: Promise<Connection>;

async function openQueues() {
  var queues = [
    ListenPickOrderACKCommand,
    // "ATLASPICKORDERCONF",
    // "ATLASINVENTARIOCONF",
    // "ATLASCOMANDOSRESPUESTAS",
    // "ATLASINCIDENCIAS",
    // "ATLASCONSULTAS",
    ListenFotoCelulaCommand,
  ];
  return Promise.all(queues.map((listener) => CommandBus.handle(new listener())));
}

export function defaultConnection(): Promise<Connection> {
  console.log('Starting connection with Database');
  const result = new Promise<Connection>((resolve, reject) => {
    return currentConnection ? resolve(currentConnection) : createConnection(database).then((conn) => {
      app.emit('connectionCreated');
      console.log('Database connection established.');
      currentConnection = Promise.resolve(conn);
      return resolve(currentConnection);
    }).catch((err) => {
      console.error('ERROR @index.ts:createConnection');
      console.error(err);
      return reject(err);
    });
  });
  return result;
}

export async function listen() {
  console.debug('Starting API');
  if (currentConnection) {
    await openPort(Number(configuration.port), true);
  } else {
    app.on('connectionCreated', async () => {
      await openPort(Number(configuration.port), true);
    });
  }
  defaultConnection();
}

export function openPort(port: number = 3000, info = false): Promise<Express> {
  /* Add support for Application/Json & x-www-format-urlencoded */
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(cors(corsConfiguration));

  //app.use(requestFirewall)
  /* Routes declarations */
  app.use(routes);
  app.use(ErrorHandler);
  return new Promise((resolve, reject) => {
    process.on('uncaughtException', (e) => {
      reject(e);
      console.error(e);
    });

    process.on('unhandledRejection', (reason, _p) => {
      reject(reason);
      console.error(reason);
    });

    /* Turn on Server on specific PORT */
    hydraExpress.init(serviceJson, packageJson.version,
      () => {
        /* Routes declarations */
        app.use(routes);

        const routeList = expressListEndpoints(app)
          .reduce((list, item) => {
            return list.concat(item.methods.map((method) => {
              return `[${method.toLowerCase()}]${item.path}`
            }));
          }, []);
        hydraExpress.getHydra().registerRoutes(routeList);
        console.log('Routes registered');
      },
      () => {
        // Register midlewares
        /* Add support for Application/Json & x-www-format-urlencoded */
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(cors(corsConfiguration));
        app.use(requestFirewall);
        app.use(ErrorHandler);
      }
    ).then(async (serviceConfig) => {
      if (info) {
        console.log(`Service ${serviceConfig.serviceName} started.`);
        console.log(`Review the documentation at http://${serviceConfig.serviceIP}:${serviceConfig.servicePort}/api-docs`);
      }
      app.locals.ready = true;
      resolve(app);
      app.emit('ready');
      await registerPids(process.pid);
      setInterval(async () => {
        await registerPids(process.pid);
      }, 60000);
    })
      .catch((err) => { console.error(err) });
  });
}



if (require.main === module || process.env.seeder) {
  // if (process.env.MESSAGE_QUEUEING_URL && process.env.MESSAGE_QUEUEING_URL.toLowerCase() !== 'false') {
  //   openQueues().then(()=>{
  //     listen()
  //   })
  // } else {
  //   console.warn('MESSAGE_QUEUEING_URL is not defined. Some actions may be unavailable due a missing AMQP Server');
  //   listen();
  // };
  listen()
}

export default app;
