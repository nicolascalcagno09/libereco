import SeedersServices from '../../Services/Seeders/SeedersServices';
import GetAllSeedersCommand from '../../Commands/Seeders/GetAllSeedersCommand';

export default class GetAllSeedersHandler {
  private seedersServices: SeedersServices;

  constructor() {
    this.seedersServices = new SeedersServices();
  }

  public async  handle(command : GetAllSeedersCommand) {
    // TODO: Implement bussines logic
    return await this.seedersServices.getAll();
  }
}
