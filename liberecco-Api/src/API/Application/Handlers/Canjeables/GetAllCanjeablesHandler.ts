import GetAllCanjeablesCommand from '../../Commands/Canjeables/GetAllCanjeablesCommand';
import CanjeableServices from '../../Services/Canjeables/CanjeableServices';

export default class GetAllCanjeablesHandler {
  private canjeableServices: CanjeableServices;

  constructor() {
    this.canjeableServices = new CanjeableServices();
  }

  public async  handle(command : GetAllCanjeablesCommand) {
    // TODO: Implement bussines logic
    if(command.userId) {
      return await this.canjeableServices.getAllNotExpired(command.userId);
    } 

    return await this.canjeableServices.getAll();
  }
}
