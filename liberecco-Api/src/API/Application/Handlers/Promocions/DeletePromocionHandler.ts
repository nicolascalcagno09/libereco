import DeletePromocionCommand from '../../Commands/Promocions/DeletePromocionCommand';
import PromocionServices from '../../Services/Promocions/PromocionServices';

export default class DeletePromocionHandler {
  private promocionServices: PromocionServices;

  constructor() {
    this.promocionServices = new PromocionServices();
  }

  public async  handle(command : DeletePromocionCommand) {
    return await this.promocionServices.delete(command.getId());
  }
}
