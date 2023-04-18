import GetSingleCommandInstanceCommand from '../../Commands/CommandInstances/GetSingleCommandInstanceCommand';
import CommandInstanceServices from '../../Services/CommandInstances/CommandInstanceServices';

export default class GetSingleCommandInstanceHandler {
  private commandInstanceServices: CommandInstanceServices;

  constructor() {
    this.commandInstanceServices = new CommandInstanceServices();
  }

  public async  handle(command : GetSingleCommandInstanceCommand) {
    return await this.commandInstanceServices.getById(command.getId());
  }
}
