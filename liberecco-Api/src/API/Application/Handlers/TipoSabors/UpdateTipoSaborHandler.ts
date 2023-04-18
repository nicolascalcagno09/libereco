import UpdateTipoSaborCommand from '../../Commands/TipoSabors/UpdateTipoSaborCommand';
import TipoSaborServices from '../../Services/TipoSabors/TipoSaborServices';
import TipoSabor from '../../Domain/Entities/TipoSabor';
import { UpdateTipoSaborSchema } from '../../../Controllers/Schemas/TipoSaborSchema'
import Validator from '../../../Common/Validator';
import RequiredFieldException from '../../Exceptions/RequiredFieldException'

export default class UpdateTipoSaborHandler {
  private tipoSaborServices: TipoSaborServices;
  private validator : Validator;

  constructor() {
    this.tipoSaborServices = new TipoSaborServices();
    this.validator = new Validator();
  }


  private validate(command){
    const error = this.validator.validate(command, UpdateTipoSaborSchema);

    if(error) {
      const details = this.validator.validationResult(error.details)
      throw new RequiredFieldException(this.validator.validationResult(error.details));
    }
  }

  public async  handle(command : UpdateTipoSaborCommand) {
    this.validate(command);
    const tipoSabor = new TipoSabor(command);
    return await this.tipoSaborServices.update(tipoSabor);
  }
}
