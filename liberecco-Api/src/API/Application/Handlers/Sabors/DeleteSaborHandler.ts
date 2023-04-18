import DeleteSaborCommand from '../../Commands/Sabors/DeleteSaborCommand';
import SaborServices from '../../Services/Sabors/SaborServices';

export default class DeleteSaborHandler {
  private saborServices: SaborServices;

  constructor() {
    this.saborServices = new SaborServices();
  }

  public async  handle(command : DeleteSaborCommand) {
    return await this.saborServices.destroy(command.getId());
  }
}
