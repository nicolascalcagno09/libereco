import GetSingleTurnoCommand from '../../Commands/Turnos/GetSingleTurnoCommand';
import TurnoServices from '../../Services/Turnos/TurnoServices';

export default class GetSingleTurnoHandler {
  private turnoServices: TurnoServices;

  constructor() {
    this.turnoServices = new TurnoServices();
  }

  public async  handle(command : GetSingleTurnoCommand) {
    return await this.turnoServices.getById(command.getId());
  }
}
