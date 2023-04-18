import DeleteSucursalCommand from '../../Commands/Sucursals/DeleteSucursalCommand';
import SucursalServices from '../../Services/Sucursals/SucursalServices';

export default class DeleteSucursalHandler {
  private sucursalServices: SucursalServices;

  constructor() {
    this.sucursalServices = new SucursalServices();
  }

  public async  handle(command : DeleteSucursalCommand) {
    return await this.sucursalServices.destroy(command.getId());
  }
}
