import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import routes from './API/Routes/routes';
import configuration from './API/Config/configuration';
import database from './API/Config/database';
import {
  createConnection,
  Connection
} from 'typeorm';

import 'reflect-metadata'; // Don't remove TypeORM need this.

import { createServer } from "http";
import { Server, Socket } from "socket.io";
import corsConfiguration from './API/Config/cors';










/* Instantiate ExpressJs Application */
export const app = express();


const httpServer = require("http").createServer(app);

const options = { 
  cors: {
    origin: "http://localhost:8100",
    methods: ["GET", "POST"]
  }
};
export const io = require("socket.io")(httpServer, options);

/*
  ====== KNOWN BUG ======
  Las entidades no se registran en la conexión "default" cuando se lee la
  ruta de ´.env' y se ejecuta mocha

  Seguramente el error esta en los ciclos de vida la los "Objetcs"
  al crear con new las cosas y no utilizar algun tipo de DI
*/
let currentConnection: Promise<Connection>;
export function defaultConnection(): Promise<Connection> {
  console.log('Default connection');
  const result = new Promise<Connection>((resolve, reject) => {
    return currentConnection ? resolve(currentConnection) : createConnection(database).then((conn) => {
      console.log('Connection created');
      app.emit('connectionCreated');
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

if (require.main === module || process.env.seeder) {

  console.log('Should run de application server');
  app.on('connectionCreated', () => {
    /* Add support for Application/Json & x-www-format-urlencoded */
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cors(corsConfiguration));
    /* Routes declarations */
    app.use(routes);

    /* Turn on Server on specific PORT */
    app.listen(configuration.port, () => {
      console.log(`Application started. Check the documentation at http://localhost:${configuration.port}/api-docs`);
      app.locals.ready = true;
      app.emit('ready');

      process.on('unhandledRejection', (reason, _p) => {
        console.error(reason);
      });
    });






    interface QrData {
      userId: number,
      promotionId: number,
      cuponId: number
    }

    io.on("connection", (socket: any) => {
      console.log("a user connected");
      socket.on("qrOpen", (qrData: QrData) => {
        console.log(qrData);
        socket.join(qrData.userId)
        // echo the message back down the
        // websocket connection
        io.to(qrData.userId).emit("qrScanEvent", "Usuario conectado "+ qrData.userId);
      });
    });



    httpServer.listen(3020);



  });

  defaultConnection();
}

export default app;
