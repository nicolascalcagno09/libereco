import DeleteRequestCommand from '../../Commands/Requests/DeleteRequestCommand';
import RequestServices from '../../Services/Requests/RequestServices';

export default class DeleteRequestHandler {
  private requestServices: RequestServices;

  constructor() {
    this.requestServices = new RequestServices();
  }

  public async  handle(command : DeleteRequestCommand) {
    return await this.requestServices.destroy(command.getId());
  }
}
