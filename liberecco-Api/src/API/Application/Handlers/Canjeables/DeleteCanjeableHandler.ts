import DeleteCanjeableCommand from '../../Commands/Canjeables/DeleteCanjeableCommand';
import CanjeableServices from '../../Services/Canjeables/CanjeableServices';

export default class DeleteCanjeableHandler {
  private canjeableServices: CanjeableServices;

  constructor() {
    this.canjeableServices = new CanjeableServices();
  }

  public async  handle(command : DeleteCanjeableCommand) {
    return await this.canjeableServices.delete(command.getId());
  }
}
