import GetAllSaborsCommand from '../../Commands/Sabors/GetAllSaborsCommand';
import SaborServices from '../../Services/Sabors/SaborServices';

export default class GetAllSaborsHandler {
  private saborServices: SaborServices;

  constructor() {
    this.saborServices = new SaborServices();
  }

  public async  handle(command : GetAllSaborsCommand) {
    // TODO: Implement bussines logic
    return await this.saborServices.getAll();
  }
}
