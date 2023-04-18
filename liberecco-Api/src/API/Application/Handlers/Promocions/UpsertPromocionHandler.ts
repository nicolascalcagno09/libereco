import UpsertPromocionCommand from '../../Commands/Promocions/UpsertPromocionCommand';
import PromocionServices from '../../Services/Promocions/PromocionServices';
import Promocion from '../../Domain/Entities/Promocion';
import { UpsertPromocionSchema } from '../../../Controllers/Schemas/PromocionSchema'
import RequiredFieldException from '../../Exceptions/RequiredFieldException';
import Validator from '../../../Common/Validator';

export default class UpsertPromocionHandler {
  private promocionServices: PromocionServices;
  private validator : Validator;

  constructor() {
    this.promocionServices = new PromocionServices();
    this.validator = new Validator();
  }

  private validate(command){
    const error = this.validator.validate(command, UpsertPromocionSchema);
    if(error) {
      const details = this.validator.validationResult(error.details)
      throw new RequiredFieldException(this.validator.validationResult(error.details));
    }
  }

  public async  handle(command : UpsertPromocionCommand) {
    this.validate(command);
    const promocion = new Promocion(command);
    const match = await this.promocionServices.findOne({where : { id : promocion.getId() } });
    if (match) promocion.setId(match.getId());
    return await this.promocionServices.store(promocion);
  }

}
