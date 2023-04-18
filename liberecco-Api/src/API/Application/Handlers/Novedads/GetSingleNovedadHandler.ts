import GetSingleNovedadCommand from '../../Commands/Novedads/GetSingleNovedadCommand';
import NovedadServices from '../../Services/Novedads/NovedadServices';

export default class GetSingleNovedadHandler {
  private novedadServices: NovedadServices;

  constructor() {
    this.novedadServices = new NovedadServices();
  }

  public async  handle(command : GetSingleNovedadCommand) {
    return await this.novedadServices.getById(command.getId());
  }
}
