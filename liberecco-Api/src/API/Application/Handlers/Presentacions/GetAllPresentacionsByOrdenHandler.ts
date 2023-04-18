import PresentacionServices from '../../Services/Presentacions/PresentacionServices';
import GetAllPresentacionsByOrdenCommand from '../../Commands/Presentacions/GetAllPresentacionsByOrdenCommand';

export default class GetAllPresentacionsByOrdenHandler {
  private presentacionServices: PresentacionServices;

  constructor() {
    this.presentacionServices = new PresentacionServices();
  }

  public async  handle(command : GetAllPresentacionsByOrdenCommand) {
    // TODO: Implement bussines logic
    return await this.presentacionServices.getAllByOrden();
  }
}
