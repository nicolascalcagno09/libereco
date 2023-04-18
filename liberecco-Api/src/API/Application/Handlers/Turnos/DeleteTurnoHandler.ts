import DeleteTurnoCommand from '../../Commands/Turnos/DeleteTurnoCommand';
import TurnoServices from '../../Services/Turnos/TurnoServices';

export default class DeleteTurnoHandler {
  private turnoServices: TurnoServices;

  constructor() {
    this.turnoServices = new TurnoServices();
  }

  public async  handle(command : DeleteTurnoCommand) {
    return await this.turnoServices.destroy(command.getId());
  }
}
