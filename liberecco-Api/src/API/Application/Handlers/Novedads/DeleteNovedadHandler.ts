import DeleteNovedadCommand from '../../Commands/Novedads/DeleteNovedadCommand';
import NovedadServices from '../../Services/Novedads/NovedadServices';

export default class DeleteNovedadHandler {
  private novedadServices: NovedadServices;

  constructor() {
    this.novedadServices = new NovedadServices();
  }

  public async  handle(command : DeleteNovedadCommand) {
    return await this.novedadServices.delete(command.getId());
  }
}
