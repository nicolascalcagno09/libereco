import GetSingleCuponCommand from '../../Commands/Cupons/GetSingleCuponCommand';
import CuponServices from '../../Services/Cupons/CuponServices';

export default class GetSingleCuponHandler {
  private cuponServices: CuponServices;

  constructor() {
    this.cuponServices = new CuponServices();
  }

  public async  handle(command : GetSingleCuponCommand) {
    return await this.cuponServices.getById(command.getId());
  }
}
