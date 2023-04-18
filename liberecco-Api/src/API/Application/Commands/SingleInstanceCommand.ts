import { Command } from 'simple-command-bus';
import CommandInstance from '../Domain/Entities/CommandInstance';
import CommandInstanceServices from '../Services/CommandInstances/CommandInstanceServices';
import CommandBus from './CommandBus';
import UpsertCommandInstanceCommand from './CommandInstances/UpsertCommandInstanceCommand';

export default class SingleInstanceCommand extends Command {
  private commandInstanceServices = new CommandInstanceServices();

  constructor() {
    super();
    this.commandInstanceServices = new CommandInstanceServices();
  }

  async isRunning(): Promise<boolean> {
    // await this.commandInstanceServices.clear();
    const commandInstance = await this.commandInstanceServices.findOne({ command: this.constructor.name });
    return !!commandInstance;
  }

  async createInstance() {
    const commandInstance = new CommandInstance({
      pid : process.pid, 
      command: this.constructor.name,
      expirationDate: `CURRENT_TIMESTAMP`
    });
    return await commandInstance.save();
  }

  async removeInstance() {
    const commandInstance = await this.commandInstanceServices.findOne({ command: this.constructor.name });
    return await commandInstance.remove();
  }

}
