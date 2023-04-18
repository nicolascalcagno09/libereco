import SaborServices from '../../Services/Sabors/SaborServices';
import GetAllSaborsActivosByOrdenCommand from '../../Commands/Sabors/GetAllSaborsActivosByOrdenCommand';

export default class GetAllSaborsActivosByOrdenHandler {
  private saborServices: SaborServices;

  constructor() {
    this.saborServices = new SaborServices();
  }

  public async  handle(command : GetAllSaborsActivosByOrdenCommand) {
    // TODO: Implement bussines logic
    return await this.saborServices.getAllActivosByOrden();
  }
}
