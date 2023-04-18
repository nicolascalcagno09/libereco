import GetAllCuponsCommand from '../../Commands/Cupons/GetAllCuponsCommand';
import CuponServices from '../../Services/Cupons/CuponServices';

export default class GetAllCuponsHandler {
  private cuponServices: CuponServices;

  constructor() {
    this.cuponServices = new CuponServices();
  }

  public async  handle(command : GetAllCuponsCommand) {
    // TODO: Implement bussines logic
    return await this.cuponServices.getAll();
  }
}
