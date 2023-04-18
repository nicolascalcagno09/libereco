import GetSingleResponseCommand from '../../Commands/Responses/GetSingleResponseCommand';
import ResponseServices from '../../Services/Responses/ResponseServices';

export default class GetSingleResponseHandler {
  private responseServices: ResponseServices;

  constructor() {
    this.responseServices = new ResponseServices();
  }

  public async  handle(command : GetSingleResponseCommand) {
    return await this.responseServices.getById(command.getId());
  }
}
