import SaborServices from '../../Services/Sabors/SaborServices';
import GetAllActivosSaborsCommand from '../../Commands/Sabors/GetAllActivosSaborsCommand';

export default class GetAllActivosSaborsHandler {
  private saborServices: SaborServices;

  constructor() {
    this.saborServices = new SaborServices();
  }

  public async  handle(command : GetAllActivosSaborsCommand) {
    // TODO: Implement bussines logic
    return await this.saborServices.getAllActivos();
  }
}
