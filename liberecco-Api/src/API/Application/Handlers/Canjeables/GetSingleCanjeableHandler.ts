import GetSingleCanjeableCommand from '../../Commands/Canjeables/GetSingleCanjeableCommand';
import CanjeableServices from '../../Services/Canjeables/CanjeableServices';

export default class GetSingleCanjeableHandler {
  private canjeableServices: CanjeableServices;

  constructor() {
    this.canjeableServices = new CanjeableServices();
  }

  public async  handle(command : GetSingleCanjeableCommand) {
    return await this.canjeableServices.getById(command.getId());
  }
}
