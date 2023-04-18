import GetAllPromocionsCommand from '../../Commands/Promocions/GetAllPromocionsCommand';
import PromocionServices from '../../Services/Promocions/PromocionServices';

export default class GetAllPromocionsHandler {
  private promocionServices: PromocionServices;

  constructor() {
    this.promocionServices = new PromocionServices();
  }

  public async  handle(command : GetAllPromocionsCommand) {
    // TODO: Implement bussines logic
    return await this.promocionServices.getAll();
  }
}
