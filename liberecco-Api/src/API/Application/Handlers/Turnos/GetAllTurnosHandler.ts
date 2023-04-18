import GetAllTurnosCommand from '../../Commands/Turnos/GetAllTurnosCommand';
import TurnoServices from '../../Services/Turnos/TurnoServices';

export default class GetAllTurnosHandler {
  private turnoServices: TurnoServices;

  constructor() {
    this.turnoServices = new TurnoServices();
  }

  public async  handle(command : GetAllTurnosCommand) {
    // TODO: Implement bussines logic
    return await this.turnoServices.getAll();
  }
}
