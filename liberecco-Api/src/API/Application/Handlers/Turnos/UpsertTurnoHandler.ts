import UpsertTurnoCommand from '../../Commands/Turnos/UpsertTurnoCommand';
import TurnoServices from '../../Services/Turnos/TurnoServices';
import Turno from '../../Domain/Entities/Turno';
import { UpsertTurnoSchema } from '../../../Controllers/Schemas/TurnoSchema'
import RequiredFieldException from '../../Exceptions/RequiredFieldException';
import Validator from '../../../Common/Validator';

export default class UpsertTurnoHandler {
  private turnoServices: TurnoServices;
  private validator : Validator;

  constructor() {
    this.turnoServices = new TurnoServices();
    this.validator = new Validator();
  }

  private validate(command){
    const error = this.validator.validate(command, UpsertTurnoSchema);
    if(error) {
      const details = this.validator.validationResult(error.details)
      throw new RequiredFieldException(this.validator.validationResult(error.details));
    }
  }

  public async  handle(command : UpsertTurnoCommand) {
    this.validate(command);
    const turno = new Turno(command);
    const match = await this.turnoServices.findOne({where : { id : turno.getId() } });
    if (match) turno.setId(match.getId());
    return await this.turnoServices.store(turno);
  }

}
