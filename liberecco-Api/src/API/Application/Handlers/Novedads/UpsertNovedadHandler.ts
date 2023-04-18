import UpsertNovedadCommand from '../../Commands/Novedads/UpsertNovedadCommand';
import NovedadServices from '../../Services/Novedads/NovedadServices';
import Novedad from '../../Domain/Entities/Novedad';
import { UpsertNovedadSchema } from '../../../Controllers/Schemas/NovedadSchema'
import RequiredFieldException from '../../Exceptions/RequiredFieldException';
import Validator from '../../../Common/Validator';

export default class UpsertNovedadHandler {
  private novedadServices: NovedadServices;
  private validator : Validator;

  constructor() {
    this.novedadServices = new NovedadServices();
    this.validator = new Validator();
  }

  private validate(command){
    const error = this.validator.validate(command, UpsertNovedadSchema);
    if(error) {
      const details = this.validator.validationResult(error.details)
      throw new RequiredFieldException(this.validator.validationResult(error.details));
    }
  }

  public async  handle(command : UpsertNovedadCommand) {
    this.validate(command);
    const novedad = new Novedad(command);
    const match = await this.novedadServices.findOne({where : { id : novedad.getId() } });
    if (match) novedad.setId(match.getId());
    return await this.novedadServices.store(novedad);
  }

}
