import GetSinglePromocionCommand from '../../Commands/Promocions/GetSinglePromocionCommand';
import PromocionServices from '../../Services/Promocions/PromocionServices';

export default class GetSinglePromocionHandler {
  private promocionServices: PromocionServices;

  constructor() {
    this.promocionServices = new PromocionServices();
  }

  public async  handle(command : GetSinglePromocionCommand) {
    return await this.promocionServices.getById(command.getId());
  }
}
