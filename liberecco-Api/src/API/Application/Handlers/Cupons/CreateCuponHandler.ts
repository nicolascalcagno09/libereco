import CreateCuponCommand from '../../Commands/Cupons/CreateCuponCommand';
import CuponServices from '../../Services/Cupons/CuponServices';
import Cupon from '../../Domain/Entities/Cupon';
import { StoreCuponSchema } from '../../../Controllers/Schemas/CuponSchema'
import RequiredFieldException from '../../Exceptions/RequiredFieldException';
import Validator from '../../../Common/Validator';
import { io } from '../../../../index';

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

  public async  handle(command : CreateCuponCommand) {
    this.validate(command);
    const cupon: any = new Cupon(command);
    let cuponnew:any= await this.cuponServices.store(cupon);
    console.log(io);
    try {
      io.to(cupon.usuario).emit("qrScanEvent", "Cupon registrado");

    } catch (error) {
      console.log(error);
    }
    return cuponnew

  }
}
