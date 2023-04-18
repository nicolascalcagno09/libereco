import SucursalServices from '../../Services/Sucursals/SucursalServices';
import GetAllActivosSucursalsCommand from '../../Commands/Sucursals/GetAllActivosSucursalsCommand';

export default class GetAllActivosSucursalsHandler {
  private sucursalServices: SucursalServices;

  constructor() {
    this.sucursalServices = new SucursalServices();
  }

  public async  handle(command : GetAllActivosSucursalsCommand) {
    // TODO: Implement bussines logic
    return await this.sucursalServices.getAllActivos();
  }
}
