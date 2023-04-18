import NovedadServices from '../../Services/Novedads/NovedadServices';
import GetAllBySucursalNovedadCommand from '../../Commands/Novedads/GetAllBySucursalNovedadCommand';

export default class GetAllBySucursalNovedadHandler {
  private novedadServices: NovedadServices;

  constructor() {
    this.novedadServices = new NovedadServices();
  }

  public async  handle(command : GetAllBySucursalNovedadCommand) {
    return await this.novedadServices.getBySucursalId(command.getId());
  }
}
