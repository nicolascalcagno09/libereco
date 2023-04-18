import UpsertCuponCommand from '../../Commands/Cupons/UpsertCuponCommand';
import CuponServices from '../../Services/Cupons/CuponServices';
import Cupon from '../../Domain/Entities/Cupon';
import { UpsertCuponSchema } from '../../../Controllers/Schemas/CuponSchema'
import RequiredFieldException from '../../Exceptions/RequiredFieldException';
import Validator from '../../../Common/Validator';

export default class UpsertCuponHandler {
  private cuponServices: CuponServices;
  private validator : Validator;

  constructor() {
    this.cuponServices = new CuponServices();
    this.validator = new Validator();
  }

  private validate(command){
    const error = this.validator.validate(command, UpsertCuponSchema);
    if(error) {
      const details = this.validator.validationResult(error.details)
      throw new RequiredFieldException(this.validator.validationResult(error.details));
    }
  }

  public async  handle(command : UpsertCuponCommand) {
    this.validate(command);
    const cupon = new Cupon(command);
    const match = await this.cuponServices.findOne({where : { id : cupon.getId() } });
    if (match) cupon.setId(match.getId());
    return await this.cuponServices.store(cupon);
  }

}
