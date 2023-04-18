import SeedersServices from '../../Services/Seeders/SeedersServices';
import GetSingleSeederCommand from '../../Commands/Seeders/GetSingleSeederCommand';

export default class GetSingleSeederHandler {
  private seedersServices: SeedersServices;

  constructor() {
    this.seedersServices = new SeedersServices();
  }

  public async  handle(command : GetSingleSeederCommand) {
    return await this.seedersServices.getById(command.getId());
  }
}
