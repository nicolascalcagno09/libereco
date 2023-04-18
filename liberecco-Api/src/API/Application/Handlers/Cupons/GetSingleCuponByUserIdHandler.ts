import GetSingleCuponByUserIdCommand from '../../Commands/Cupons/GetSingleCuponByUserIdCommand';
import CuponServices from '../../Services/Cupons/CuponServices';

export default class GetSingleCuponByUserIdHandler {
  private cuponServices: CuponServices;

  constructor() {
    this.cuponServices = new CuponServices();
  }

  public async  handle(command : GetSingleCuponByUserIdCommand) {
    return await this.cuponServices.getByUserId(command.getId(),command.getFilters());
  }
}
