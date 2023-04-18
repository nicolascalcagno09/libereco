import GetSingleProductoCommand from '../../Commands/Productos/GetSingleProductoCommand';
import ProductoServices from '../../Services/Productos/ProductoServices';

export default class GetSingleProductoHandler {
  private productoServices: ProductoServices;

  constructor() {
    this.productoServices = new ProductoServices();
  }

  public async  handle(command : GetSingleProductoCommand) {
    return await this.productoServices.getById(command.getId());
  }
}
