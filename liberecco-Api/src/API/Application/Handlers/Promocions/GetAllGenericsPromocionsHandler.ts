import GetAllGenericsPromocionsCommand from '../../Commands/Promocions/GetAllGenericsPromocionsCommand';
import PromocionServices from '../../Services/Promocions/PromocionServices';

export default class GetAllGenericsPromocionsHandler {
  private promocionServices: PromocionServices;

  constructor() {
    this.promocionServices = new PromocionServices();
  }

  public async  handle(command : GetAllGenericsPromocionsCommand) {
    // TODO: Implement bussines logic
    return await this.promocionServices.getAllGenerics();
  }
}
