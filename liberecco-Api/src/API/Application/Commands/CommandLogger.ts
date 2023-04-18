import Log from '../Domain/Entities/Log/Log';
import { Middleware } from 'simple-command-bus';
import { Connection } from 'typeorm';
import CommandLog from '../Domain/Entities/CommandLog';

export default class CommandLogger extends Middleware {

  async execute(command, next) {
    // const commandLog = new CommandLog( command.constructor.name, command, process.pid );
    // await commandLog.save().catch(e => { console.error(e); });
    
    const result = await next(command);
    // const commandLogResult = new CommandLog( command.constructor.name, result, process.pid );
    // await commandLogResult.save().catch(e => { console.error(e); });
    
    return result;
  }
}
