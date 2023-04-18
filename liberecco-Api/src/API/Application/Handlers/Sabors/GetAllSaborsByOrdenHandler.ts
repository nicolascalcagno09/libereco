import SaborServices from '../../Services/Sabors/SaborServices';
import GetAllSaborsByOrdenCommand from '../../Commands/Sabors/GetAllSaborsByOrdenCommand';

export default class GetAllSaborsByOrdenHandler {
  private saborServices: SaborServices;

  constructor() {
    this.saborServices = new SaborServices();
  }

  public async  handle(command : GetAllSaborsByOrdenCommand) {
    // TODO: Implement bussines logic
    return await this.saborServices.getAllByOrden();
  }
}
