import DeleteTipoSaborCommand from '../../Commands/TipoSabors/DeleteTipoSaborCommand';
import TipoSaborServices from '../../Services/TipoSabors/TipoSaborServices';

export default class DeleteTipoSaborHandler {
  private tipoSaborServices: TipoSaborServices;

  constructor() {
    this.tipoSaborServices = new TipoSaborServices();
  }

  public async  handle(command : DeleteTipoSaborCommand) {
    return await this.tipoSaborServices.destroy(command.getId());
  }
}
