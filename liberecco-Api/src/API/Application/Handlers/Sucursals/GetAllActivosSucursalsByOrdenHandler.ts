import SucursalServices from '../../Services/Sucursals/SucursalServices';
import GetAllActivosSucursalsByOrdenCommand from '../../Commands/Sucursals/GetAllActivosSucursalsByOrdenCommand';

export default class GetAllActivosSucursalsByOrdenHandler {
  private sucursalServices: SucursalServices;

  constructor() {
    this.sucursalServices = new SucursalServices();
  }

  public async  handle(command : GetAllActivosSucursalsByOrdenCommand) {
    // TODO: Implement bussines logic
    return await this.sucursalServices.getAllActivosByOrden();
  }
}
