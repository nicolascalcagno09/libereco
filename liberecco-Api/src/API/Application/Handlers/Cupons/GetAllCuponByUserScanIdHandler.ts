import GetAllCuponByUserScanIdCommand from '../../Commands/Cupons/GetAllCuponByUserScanIdCommand';
import CuponServices from '../../Services/Cupons/CuponServices';

export default class GetAllCuponByUserScandIdHandler {
  private cuponServices: CuponServices;

  constructor() {
    this.cuponServices = new CuponServices();
  }

  public async  handle(command : GetAllCuponByUserScanIdCommand) {
    return await this.cuponServices.getByUserScanId(command.getUserId(), command.getFilters());
  }
}
