import DeleteProductoCommand from '../../Commands/Productos/DeleteProductoCommand';
import ProductoServices from '../../Services/Productos/ProductoServices';

export default class DeleteProductoHandler {
  private productoServices: ProductoServices;

  constructor() {
    this.productoServices = new ProductoServices();
  }

  public async  handle(command : DeleteProductoCommand) {
    return await this.productoServices.destroy(command.getId());
  }
}
