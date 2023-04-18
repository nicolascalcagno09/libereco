import GetAllCuponBySucursalIdCommand from '../../Commands/Cupons/GetAllCuponBySucursalIdCommand';
import CuponServices from '../../Services/Cupons/CuponServices';

export default class GetAllCuponBySucursalIdHandler {
  private cuponServices: CuponServices;

  constructor() {
    this.cuponServices = new CuponServices();
  }

  public async  handle(command : GetAllCuponBySucursalIdCommand) {
    return await this.cuponServices.getBySucursalId(command.getSucursalId());
  }
}
