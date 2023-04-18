import GetAllSucursalPresentacionsCommand from '../../Commands/SucursalPresentacions/GetAllSucursalPresentacionsCommand';
import SucursalPresentacionServices from '../../Services/SucursalPresentacions/SucursalPresentacionServices';

export default class GetAllSucursalPresentacionsHandler {
  private sucursalPresentacionServices: SucursalPresentacionServices;

  constructor() {
    this.sucursalPresentacionServices = new SucursalPresentacionServices();
  }

  public async  handle(command : GetAllSucursalPresentacionsCommand) {
    // TODO: Implement bussines logic
    return await this.sucursalPresentacionServices.getAll();
  }
}
