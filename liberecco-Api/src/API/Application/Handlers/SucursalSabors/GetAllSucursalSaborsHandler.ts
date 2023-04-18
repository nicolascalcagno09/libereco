import GetAllSucursalSaborsCommand from '../../Commands/SucursalSabors/GetAllSucursalSaborsCommand';
import SucursalSaborServices from '../../Services/SucursalSabors/SucursalSaborServices';

export default class GetAllSucursalSaborsHandler {
  private sucursalSaborServices: SucursalSaborServices;

  constructor() {
    this.sucursalSaborServices = new SucursalSaborServices();
  }

  public async  handle(command : GetAllSucursalSaborsCommand) {
    // TODO: Implement bussines logic
    return await this.sucursalSaborServices.getAll();
  }
}
