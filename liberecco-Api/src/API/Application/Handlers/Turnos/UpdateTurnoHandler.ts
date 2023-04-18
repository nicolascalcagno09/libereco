import UpdateTurnoCommand from '../../Commands/Turnos/UpdateTurnoCommand';
import TurnoServices from '../../Services/Turnos/TurnoServices';
import Turno from '../../Domain/Entities/Turno';
import { UpdateTurnoSchema } from '../../../Controllers/Schemas/TurnoSchema'
import Validator from '../../../Common/Validator';
import RequiredFieldException from '../../Exceptions/RequiredFieldException'

export default class UpdateTurnoHandler {
  private turnoServices: TurnoServices;
  private validator : Validator;

  constructor() {
    this.turnoServices = new TurnoServices();
    this.validator = new Validator();
  }


  private validate(command){
    const error = this.validator.validate(command, UpdateTurnoSchema);

    if(error) {
      const details = this.validator.validationResult(error.details)
      throw new RequiredFieldException(this.validator.validationResult(error.details));
    }
  }

  public async  handle(command : UpdateTurnoCommand) {
    this.validate(command);
    const turno = new Turno(command);
    return await this.turnoServices.update(turno);
  }
}
