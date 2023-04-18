import SucursalServices from '../../Services/Sucursals/SucursalServices';
import GetAllSucursalsByOrdenCommand from '../../Commands/Sucursals/GetAllSucursalsByOrdenCommand';

export default class GetAllSucursalsByOrdenHandler {
  private sucursalServices: SucursalServices;

  constructor() {
    this.sucursalServices = new SucursalServices();
  }

  public async  handle(command : GetAllSucursalsByOrdenCommand) {
    // TODO: Implement bussines logic
    return await this.sucursalServices.getAllByOrden();
  }
}
