import GetAllPresentacionsCommand from '../../Commands/Presentacions/GetAllPresentacionsCommand';
import PresentacionServices from '../../Services/Presentacions/PresentacionServices';

export default class GetAllPresentacionsHandler {
  private presentacionServices: PresentacionServices;

  constructor() {
    this.presentacionServices = new PresentacionServices();
  }

  public async  handle(command : GetAllPresentacionsCommand) {
    // TODO: Implement bussines logic
    return await this.presentacionServices.getAll();
  }
}
