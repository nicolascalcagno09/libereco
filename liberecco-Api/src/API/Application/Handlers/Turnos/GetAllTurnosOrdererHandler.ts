import TurnoServices from '../../Services/Turnos/TurnoServices';
import GetAllTurnosOrdererCommand from '../../Commands/Turnos/GetAllTurnosOrdererCommand';

export default class GetAllTurnosOrdererHandler {
  private turnoServices: TurnoServices;

  constructor() {
    this.turnoServices = new TurnoServices();
  }

  public async  handle(command : GetAllTurnosOrdererCommand) {
    // TODO: Implement bussines logic
    return await this.turnoServices.getAllOrderedByDiaAndTipo(command.getId());
  }
}
