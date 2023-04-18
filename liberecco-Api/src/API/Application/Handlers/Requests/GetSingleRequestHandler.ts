import GetSingleRequestCommand from '../../Commands/Requests/GetSingleRequestCommand';
import RequestServices from '../../Services/Requests/RequestServices';

export default class GetSingleRequestHandler {
  private requestServices: RequestServices;

  constructor() {
    this.requestServices = new RequestServices();
  }

  public async  handle(command : GetSingleRequestCommand) {
    return await this.requestServices.getById(command.getId());
  }
}
