import GetAllNovedadsCommand from '../../Commands/Novedads/GetAllNovedadsCommand';
import NovedadServices from '../../Services/Novedads/NovedadServices';

export default class GetAllNovedadsHandler {
  private novedadServices: NovedadServices;

  constructor() {
    this.novedadServices = new NovedadServices();
  }

  public async  handle(command : GetAllNovedadsCommand) {
    // TODO: Implement bussines logic
    return await this.novedadServices.getAll();
  }
}
