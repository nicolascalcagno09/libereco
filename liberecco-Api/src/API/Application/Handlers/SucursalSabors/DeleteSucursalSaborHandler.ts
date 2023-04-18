import DeleteSucursalSaborCommand from '../../Commands/SucursalSabors/DeleteSucursalSaborCommand';
import SucursalSaborServices from '../../Services/SucursalSabors/SucursalSaborServices';

export default class DeleteSucursalSaborHandler {
  private sucursalSaborServices: SucursalSaborServices;

  constructor() {
    this.sucursalSaborServices = new SucursalSaborServices();
  }

  public async  handle(command : DeleteSucursalSaborCommand) {
    return await this.sucursalSaborServices.destroy(command.getId());
  }
}
