import DeleteLogCommand from '../../Commands/Logs/DeleteLogCommand';
import LogServices from '../../Services/Logs/LogServices';

export default class DeleteLogHandler {
  private logServices: LogServices;

  constructor() {
    this.logServices = new LogServices();
  }

  public async  handle(command : DeleteLogCommand) {
    return await this.logServices.destroy(command.getId());
  }
}
