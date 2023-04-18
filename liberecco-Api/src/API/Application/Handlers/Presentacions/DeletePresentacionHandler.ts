import DeletePresentacionCommand from '../../Commands/Presentacions/DeletePresentacionCommand';
import PresentacionServices from '../../Services/Presentacions/PresentacionServices';

export default class DeletePresentacionHandler {
  private presentacionServices: PresentacionServices;

  constructor() {
    this.presentacionServices = new PresentacionServices();
  }

  public async  handle(command : DeletePresentacionCommand) {
    return await this.presentacionServices.destroy(command.getId());
  }
}
