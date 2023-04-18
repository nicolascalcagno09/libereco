import GetAllSucursalsCommand from '../../Commands/Sucursals/GetAllSucursalsCommand';
import SucursalServices from '../../Services/Sucursals/SucursalServices';

export default class GetAllSucursalsHandler {
  private sucursalServices: SucursalServices;

  constructor() {
    this.sucursalServices = new SucursalServices();
  }

  public async  handle(command : GetAllSucursalsCommand) {
    // TODO: Implement bussines logic
    return await this.sucursalServices.getAll();
  }
}
