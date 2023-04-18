import * as dotenv from 'dotenv';
const argv = require('yargs').argv;
dotenv.config();

const appPort = argv.test ? process.env.APP_PORT_TEST : process.env.APP_PORT;

const configuration = {
  public_dir : process.env.PUBLIC_DIR ? process.env.PUBLIC_DIR : __dirname + '/../../public',
  static_dir : '/public',
  dev: process.env.NODE_ENV !== 'production',
  port: appPort ? appPort : 3000,
  url: process.env.APP_URL ? process.env.APP_URL : 'http://localhost',
  seeders_port: process.env.SEEDERS_PORT ? process.env.SEEDERS_PORT : 9000,
  oauth: {
    clients: {
      sga: {
        name: process.env.SGA_CLIENT_NAME,
        secret: process.env.SGA_CLIENT_SECRET,
        description: process.env.SGA_CLIENT_DESCRIPTION,
        enabled: Boolean(process.env.SGA_CLIENT_ENABLED),
      },
      app: {
        name: process.env.AL_CLIENT_NAME,
        secret: process.env.AL_CLIENT_SECRET,
        description: process.env.AL_CLIENT_DESCRIPTION,
        enabled: Boolean(process.env.AL_CLIENT_ENABLED),
      },
    },
  },
  deleteLogDays: process.env.DELETE_LOG_DAYS ? process.env.DELETE_LOG_DAYS : 15,
  messageQueueingUrl : process.env.MESSAGE_QUEUEING_URL ? process.env.MESSAGE_QUEUEING_URL : 'amqp://localhost'
};

export default configuration;
