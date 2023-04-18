import {
  CommandBus,
  CommandHandlerMiddleware,
  ClassNameExtractor,
  InMemoryLocator,
  HandleInflector,
  Middleware,
} from 'simple-command-bus';

import SingleInstanceCommand from './SingleInstanceCommand';
import { sleep } from '../../Common/Utils';
import CommandAlreadyRunningException from '../Exceptions/CommandAlreadyRunningException';
import CommandInstanceServices from '../Services/CommandInstances/CommandInstanceServices';
import NamespaceHandlerLocator from './NamespaceHandlerLocator';

import AsyncLoggerMiddleware from './AsyncLoggerMiddleware';

import dotenv from 'dotenv';

dotenv.config();

const classNameExtractor = new ClassNameExtractor();
const locator = new NamespaceHandlerLocator(__dirname + '/../Handlers');
const handlerInflector = new HandleInflector();
const commandHandlerMiddleware = new CommandHandlerMiddleware(classNameExtractor,
  locator,
  handlerInflector);

class CommandHandlerGate extends Middleware {
  constructor() {
    super();
  }

  async safeExecution(command, next) {
    const commandInstanceServices = new CommandInstanceServices();
    const clean = await commandInstanceServices.clean();
    const waitingTime = process.env.WAIT_ON_SYNC ? Number(process.env.WAIT_ON_SYNC) : 10000;
    const isRunning = await command.isRunning();
    if (!isRunning) {
      try {

        const commandInstance = await command.createInstance();
        const watcher = setInterval(async _ => {
          await commandInstance.refreshExpirationDate();
          await commandInstance.save();

        }, waitingTime);

        return next(command)
          .then(async r => {
            clearInterval(watcher);
            return await command.removeInstance();
          })
          .catch(async (e) => {
            console.error(command, 'CommandFailed. Removing from DB', e);
            clearInterval(watcher);
            return await command.removeInstance();
          });
      } catch (e) {
        console.error('CommandFailed. Removing from DB', e);
        await command.removeInstance();
      }
    }
    return false;
  }

  async execute(command, next) {
    const waitingTime = process.env.WAIT_ON_SYNC ? process.env.WAIT_ON_SYNC : 10000;
    if (command instanceof SingleInstanceCommand) {
      let safeExecutionResult = await this.safeExecution(command, next);
      if (safeExecutionResult) {
        return safeExecutionResult;
      } else {
        await sleep(waitingTime);
        safeExecutionResult = await this.safeExecution(command, next);
        if (!safeExecutionResult) {
          throw new CommandAlreadyRunningException(`${command.constructor.name} is already running, try again later`);
        }
      }
    } else {
      return await next(command);
    }
  }
}

const stack = Array<Middleware>();

import CommandLogger from './CommandLogger'

stack.push(new AsyncLoggerMiddleware(console));
stack.push(new CommandLogger());
stack.push(new CommandHandlerGate());
stack.push(commandHandlerMiddleware);

const commandBus = new CommandBus(stack);

export default commandBus;