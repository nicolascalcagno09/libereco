import UpdateCuponCommand from '../../Commands/Cupons/UpdateCuponCommand';
import CuponServices from '../../Services/Cupons/CuponServices';
import Cupon from '../../Domain/Entities/Cupon';
import { UpdateCuponSchema } from '../../../Controllers/Schemas/CuponSchema'
import Validator from '../../../Common/Validator';
import RequiredFieldException from '../../Exceptions/RequiredFieldException'

export default class UpdateCuponHandler {
  private cuponServices: CuponServices;
  private validator : Validator;

  constructor() {
    this.cuponServices = new CuponServices();
    this.validator = new Validator();
  }


  private validate(command){
    const error = this.validator.validate(command, UpdateCuponSchema);

    if(error) {
      const details = this.validator.validationResult(error.details)
      throw new RequiredFieldException(this.validator.validationResult(error.details));
    }
  }

  public async  handle(command : UpdateCuponCommand) {
    this.validate(command);
    const cupon = new Cupon(command);
    return await this.cuponServices.update(cupon);
  }
}
