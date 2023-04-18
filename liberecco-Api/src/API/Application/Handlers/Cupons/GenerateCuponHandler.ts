import CuponServices from '../../Services/Cupons/CuponServices';
import Cupon from '../../Domain/Entities/Cupon';
import { StoreCuponSchema } from '../../../Controllers/Schemas/CuponSchema'
import RequiredFieldException from '../../Exceptions/RequiredFieldException';
import Validator from '../../../Common/Validator';
import { io } from '../../../../index';
import GenerateCuponCommand from '../../Commands/Cupons/GenerateCuponCommand';

export default class CreateCuponHandler {
  private cuponServices: CuponServices;
  private validator : Validator;

  constructor() {
    this.cuponServices = new CuponServices();
    this.validator = new Validator();
  }

  private validate(command){
    const error = this.validator.validate(command, StoreCuponSchema);

    if(error) {
      const details = this.validator.validationResult(error.details)
      throw new RequiredFieldException(this.validator.validationResult(error.details));
    }
  }

  public async  handle(command : GenerateCuponCommand) {
    this.validate(command);
    const cupon: any = new Cupon(command);
    let cuponnew:any= await this.cuponServices.generate(cupon);
    console.log(io);
    return cuponnew

  }
}
