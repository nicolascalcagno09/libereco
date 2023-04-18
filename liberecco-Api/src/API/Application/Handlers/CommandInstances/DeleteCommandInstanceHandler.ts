import DeleteCommandInstanceCommand from '../../Commands/CommandInstances/DeleteCommandInstanceCommand';
import CommandInstanceServices from '../../Services/CommandInstances/CommandInstanceServices';

export default class DeleteCommandInstanceHandler {
  private commandInstanceServices: CommandInstanceServices;

  constructor() {
    this.commandInstanceServices = new CommandInstanceServices();
  }

  public async  handle(command : DeleteCommandInstanceCommand) {
    return await this.commandInstanceServices.destroy(command.getId());
  }
}
