import GetSingleSaborCommand from '../../Commands/Sabors/GetSingleSaborCommand';
import SaborServices from '../../Services/Sabors/SaborServices';

export default class GetSingleSaborHandler {
  private saborServices: SaborServices;

  constructor() {
    this.saborServices = new SaborServices();
  }

  public async  handle(command : GetSingleSaborCommand) {
    return await this.saborServices.getById(command.getId());
  }
}
