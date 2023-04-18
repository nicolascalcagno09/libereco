import GetAllRequestsCommand from '../../Commands/Requests/GetAllRequestsCommand';
import RequestServices from '../../Services/Requests/RequestServices';

export default class GetAllRequestsHandler {
  private requestServices: RequestServices;

  constructor() {
    this.requestServices = new RequestServices();
  }

  public async  handle(command : GetAllRequestsCommand) {
    // TODO: Implement bussines logic
    return await this.requestServices.getAll();
  }
}
