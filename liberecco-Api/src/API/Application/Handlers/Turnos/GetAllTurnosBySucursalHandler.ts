import GetAllTurnosCommand from '../../Commands/Turnos/GetAllTurnosCommand';
import TurnoServices from '../../Services/Turnos/TurnoServices';
import GetAllTurnosBySucursalCommand from '../../Commands/Turnos/GetAllTurnosBySucursalCommand';

export default class GetAllTurnosBySucursalHandler {
  private turnoServices: TurnoServices;

  constructor() {
    this.turnoServices = new TurnoServices();
  }

  public async  handle(command : GetAllTurnosBySucursalCommand) {
    // TODO: Implement bussines logic
    return await this.turnoServices.getTurnosBySucursal(command.getId());
  }
}
