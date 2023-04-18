import TipoSaborServices from '../../Services/TipoSabors/TipoSaborServices';
import GetAllTiposBySaboresActivosCommand from '../../Commands/TipoSabors/GetAllTiposBySaboresActivosCommand';

export default class GetAllTiposBySaboresActivosHandler {
  private tipoSaborServices: TipoSaborServices;

  constructor() {
    this.tipoSaborServices = new TipoSaborServices();
  }

  public async  handle(command : GetAllTiposBySaboresActivosCommand) {
    // TODO: Implement bussines logic
    return await this.tipoSaborServices.getAllTiposConSaboresActivos();
  }
}
