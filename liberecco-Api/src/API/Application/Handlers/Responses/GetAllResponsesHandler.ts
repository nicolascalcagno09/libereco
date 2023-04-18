import GetAllResponsesCommand from '../../Commands/Responses/GetAllResponsesCommand';
import ResponseServices from '../../Services/Responses/ResponseServices';

export default class GetAllResponsesHandler {
  private responseServices: ResponseServices;

  constructor() {
    this.responseServices = new ResponseServices();
  }

  public async  handle(command : GetAllResponsesCommand) {
    // TODO: Implement bussines logic
    return await this.responseServices.getAll();
  }
}
