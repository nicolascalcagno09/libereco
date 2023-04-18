import UpsertSucursalCommand from '../../Commands/Sucursals/UpsertSucursalCommand';
import SucursalServices from '../../Services/Sucursals/SucursalServices';
import Sucursal from '../../Domain/Entities/Sucursal';
import { UpsertSucursalSchema } from '../../../Controllers/Schemas/SucursalSchema'
import RequiredFieldException from '../../Exceptions/RequiredFieldException';
import Validator from '../../../Common/Validator';

export default class UpsertSucursalHandler {
  private sucursalServices: SucursalServices;
  private validator : Validator;

  constructor() {
    this.sucursalServices = new SucursalServices();
    this.validator = new Validator();
  }

  private validate(command){
    const error = this.validator.validate(command, UpsertSucursalSchema);
    if(error) {
      const details = this.validator.validationResult(error.details)
      throw new RequiredFieldException(this.validator.validationResult(error.details));
    }
  }

  public async  handle(command : UpsertSucursalCommand) {
    this.validate(command);
    const sucursal = new Sucursal(command);
    const match = await this.sucursalServices.findOne({where : { id : sucursal.getId() } });
    if (match) sucursal.setId(match.getId());
    return await this.sucursalServices.store(sucursal);
  }

}
