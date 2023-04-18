import GetSinglePresentacionCommand from '../../Commands/Presentacions/GetSinglePresentacionCommand';
import PresentacionServices from '../../Services/Presentacions/PresentacionServices';

export default class GetSinglePresentacionHandler {
  private presentacionServices: PresentacionServices;

  constructor() {
    this.presentacionServices = new PresentacionServices();
  }

  public async  handle(command : GetSinglePresentacionCommand) {
    return await this.presentacionServices.getById(command.getId());
  }
}
