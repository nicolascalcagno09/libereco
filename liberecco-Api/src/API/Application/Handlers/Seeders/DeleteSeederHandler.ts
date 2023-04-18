import SeedersServices from '../../Services/Seeders/SeedersServices';
import DeleteSeederCommand from '../../Commands/Seeders/DeleteSeederCommand';

export default class DeleteSeederHandler {
  private seedersServices: SeedersServices;

  constructor() {
    this.seedersServices = new SeedersServices();
  }

  public async  handle(command : DeleteSeederCommand) {
    return await this.seedersServices.destroy(command.getId());
  }
}
