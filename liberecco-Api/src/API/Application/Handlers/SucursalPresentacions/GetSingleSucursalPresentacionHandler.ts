import GetSingleSucursalPresentacionCommand from '../../Commands/SucursalPresentacions/GetSingleSucursalPresentacionCommand';
import SucursalPresentacionServices from '../../Services/SucursalPresentacions/SucursalPresentacionServices';

export default class GetSingleSucursalPresentacionHandler {
  private sucursalPresentacionServices: SucursalPresentacionServices;

  constructor() {
    this.sucursalPresentacionServices = new SucursalPresentacionServices();
  }

  public async  handle(command : GetSingleSucursalPresentacionCommand) {
    return await this.sucursalPresentacionServices.getById(command.getId());
  }
}
