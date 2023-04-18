import CreateTurnoCommand from '../../Commands/Turnos/CreateTurnoCommand';
import TurnoServices from '../../Services/Turnos/TurnoServices';
import Turno from '../../Domain/Entities/Turno';
import { StoreTurnoSchema } from '../../../Controllers/Schemas/TurnoSchema'
import RequiredFieldException from '../../Exceptions/RequiredFieldException';
import Validator from '../../../Common/Validator';

export default class CreateTurnoHandler {
  private turnoServices: TurnoServices;
  private validator : Validator;

  constructor() {
    this.turnoServices = new TurnoServices();
    this.validator = new Validator();
  }

  private validate(command){
    const error = this.validator.validate(command, StoreTurnoSchema);

    if(error) {
      const details = this.validator.validationResult(error.details)
      throw new RequiredFieldException(this.validator.validationResult(error.details));
    }
  }

  public async  handle(command : CreateTurnoCommand) {
    this.validate(command);
    const turno = new Turno(command);
    return await this.turnoServices.store(turno);
  }
}
