import PresentacionServices from '../../Services/Presentacions/PresentacionServices';
import GetAllActivosPresentacionsCommand from '../../Commands/Presentacions/GetAllActivosPresentacionsCommand';

export default class GetAllActivosPresentacionsHandler {
  private presentacionServices: PresentacionServices;

  constructor() {
    this.presentacionServices = new PresentacionServices();
  }

  public async  handle(command : GetAllActivosPresentacionsCommand) {
    // TODO: Implement bussines logic
    return await this.presentacionServices.getAllActivos();
  }
}
