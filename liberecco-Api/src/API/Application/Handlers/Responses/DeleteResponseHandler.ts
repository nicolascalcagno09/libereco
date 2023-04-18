import DeleteResponseCommand from '../../Commands/Responses/DeleteResponseCommand';
import ResponseServices from '../../Services/Responses/ResponseServices';

export default class DeleteResponseHandler {
  private responseServices: ResponseServices;

  constructor() {
    this.responseServices = new ResponseServices();
  }

  public async  handle(command : DeleteResponseCommand) {
    return await this.responseServices.destroy(command.getId());
  }
}
