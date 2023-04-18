import GetAllLogsCommand from '../../Commands/Logs/GetAllLogsCommand';
import LogServices from '../../Services/Logs/LogServices';

export default class GetAllLogsHandler {
  private logServices: LogServices;

  constructor() {
    this.logServices = new LogServices();
  }

  public async  handle(command : GetAllLogsCommand) {
    // TODO: Implement bussines logic
    return await this.logServices.getAll();
  }
}
