import PresentacionServices from '../../Services/Presentacions/PresentacionServices';
import GetAllActivosPresentacionsByOrdenCommand from '../../Commands/Presentacions/GetAllActivosPresentacionsByOrdenCommand';

export default class GetAllActivosPresentacionsByOrdenHandler {
  private presentacionServices: PresentacionServices;

  constructor() {
    this.presentacionServices = new PresentacionServices();
  }

  public async  handle(command : GetAllActivosPresentacionsByOrdenCommand) {
    // TODO: Implement bussines logic
    return await this.presentacionServices.getAllActivosByOrden();
  }
}
