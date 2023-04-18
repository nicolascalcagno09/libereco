import PromocionServices from '../../Services/Promocions/PromocionServices';
import GetAllBySucursalPromocionCommand from '../../Commands/Promocions/GetAllBySucursalPromocionCommand';

export default class GetAllBySucursalPromocionHandler {
  private promocionServices: PromocionServices;

  constructor() {
    this.promocionServices = new PromocionServices();
  }

  public async handle(command : GetAllBySucursalPromocionCommand) {
    return await this.promocionServices.getBySucursalId(command.getId(), command.getUsuarioId());
  }
}
