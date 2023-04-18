import GetSingleTipoSaborCommand from '../../Commands/TipoSabors/GetSingleTipoSaborCommand';
import TipoSaborServices from '../../Services/TipoSabors/TipoSaborServices';

export default class GetSingleTipoSaborHandler {
  private tipoSaborServices: TipoSaborServices;

  constructor() {
    this.tipoSaborServices = new TipoSaborServices();
  }

  public async  handle(command : GetSingleTipoSaborCommand) {
    return await this.tipoSaborServices.getById(command.getId());
  }
}
