import GetSingleLogCommand from '../../Commands/Logs/GetSingleLogCommand';
import LogServices from '../../Services/Logs/LogServices';

export default class GetSingleLogHandler {
  private logServices: LogServices;

  constructor() {
    this.logServices = new LogServices();
  }

  public async  handle(command : GetSingleLogCommand) {
    return await this.logServices.getById(command.getId());
  }
}
