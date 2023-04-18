import GetAllTipoSaborsCommand from '../../Commands/TipoSabors/GetAllTipoSaborsCommand';
import TipoSaborServices from '../../Services/TipoSabors/TipoSaborServices';

export default class GetAllTipoSaborsHandler {
  private tipoSaborServices: TipoSaborServices;

  constructor() {
    this.tipoSaborServices = new TipoSaborServices();
  }

  public async  handle(command : GetAllTipoSaborsCommand) {
    // TODO: Implement bussines logic
    return await this.tipoSaborServices.getAll();
  }
}
