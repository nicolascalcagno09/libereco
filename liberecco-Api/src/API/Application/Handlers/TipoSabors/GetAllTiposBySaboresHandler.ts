import GetAllSaboresByTiposCommand from '../../Commands/TipoSabors/GetAllTiposBySabores';
import TipoSaborServices from '../../Services/TipoSabors/TipoSaborServices';

export default class GetAllTiposBySaboresHandler {
  private tipoSaborServices: TipoSaborServices;

  constructor() {
    this.tipoSaborServices = new TipoSaborServices();
  }

  public async  handle(command : GetAllSaboresByTiposCommand) {
    // TODO: Implement bussines logic
    return await this.tipoSaborServices.getAllTiposConSabores();
  }
}
