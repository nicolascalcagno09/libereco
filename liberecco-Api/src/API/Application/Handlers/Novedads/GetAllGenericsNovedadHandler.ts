import GetAllGenericsNovedadCommand from '../../Commands/Novedads/GetAllGenericsNovedadCommand';
import NovedadServices from '../../Services/Novedads/NovedadServices';

export default class GetAllGenericsNovedadHandler {
  private novedadServices: NovedadServices;

  constructor() {
    this.novedadServices = new NovedadServices();
  }

  public async handle(command : GetAllGenericsNovedadCommand) {
    // TODO: Implement bussines logic
    return await this.novedadServices.getAllGenerics();
  }
}
