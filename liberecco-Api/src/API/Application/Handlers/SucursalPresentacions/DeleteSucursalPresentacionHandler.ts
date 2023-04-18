import DeleteSucursalPresentacionCommand from '../../Commands/SucursalPresentacions/DeleteSucursalPresentacionCommand';
import SucursalPresentacionServices from '../../Services/SucursalPresentacions/SucursalPresentacionServices';

export default class DeleteSucursalPresentacionHandler {
  private sucursalPresentacionServices: SucursalPresentacionServices;

  constructor() {
    this.sucursalPresentacionServices = new SucursalPresentacionServices();
  }

  public async  handle(command : DeleteSucursalPresentacionCommand) {
    return await this.sucursalPresentacionServices.destroy(command.getId());
  }
}
