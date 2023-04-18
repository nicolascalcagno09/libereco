import SucursalServices from '../../Services/Sucursals/SucursalServices';
import GetAllSucursalsLightCommand from '../../Commands/Sucursals/GetAllSucursalsLightCommand';

export default class GetAllSucursalsLightHandler {
  private sucursalServices: SucursalServices;

  constructor() {
    this.sucursalServices = new SucursalServices();
  }

  public async  handle(command : GetAllSucursalsLightCommand) {
    // TODO: Implement bussines logic
    return await this.sucursalServices.getAllLight();
  }
}
