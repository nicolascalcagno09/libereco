import DeleteCuponCommand from '../../Commands/Cupons/DeleteCuponCommand';
import CuponServices from '../../Services/Cupons/CuponServices';

export default class DeleteCuponHandler {
  private cuponServices: CuponServices;

  constructor() {
    this.cuponServices = new CuponServices();
  }

  public async  handle(command : DeleteCuponCommand) {
    return await this.cuponServices.destroy(command.getId(), command.getUserId());
  }
}
