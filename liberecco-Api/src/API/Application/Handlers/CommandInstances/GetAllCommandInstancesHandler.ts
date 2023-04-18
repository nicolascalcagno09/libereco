import GetAllCommandInstancesCommand from '../../Commands/CommandInstances/GetAllCommandInstancesCommand';
import CommandInstanceServices from '../../Services/CommandInstances/CommandInstanceServices';

export default class GetAllCommandInstancesHandler {
  private commandInstanceServices: CommandInstanceServices;

  constructor() {
    this.commandInstanceServices = new CommandInstanceServices();
  }

  public async  handle(command : GetAllCommandInstancesCommand) {
    // TODO: Implement bussines logic
    return await this.commandInstanceServices.getAll();
  }
}
