import GetSingleSucursalSaborCommand from '../../Commands/SucursalSabors/GetSingleSucursalSaborCommand';
import SucursalSaborServices from '../../Services/SucursalSabors/SucursalSaborServices';

export default class GetSingleSucursalSaborHandler {
  private sucursalSaborServices: SucursalSaborServices;

  constructor() {
    this.sucursalSaborServices = new SucursalSaborServices();
  }

  public async  handle(command : GetSingleSucursalSaborCommand) {
    return await this.sucursalSaborServices.getById(command.getId());
  }
}
