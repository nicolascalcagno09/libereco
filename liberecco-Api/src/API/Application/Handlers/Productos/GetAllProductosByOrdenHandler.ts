import ProductoServices from '../../Services/Productos/ProductoServices';
import GetAllProductosByOrdenCommand from '../../Commands/Productos/GetAllProductosByOrdenCommand';

export default class GetAllProductosByOrdenHandler {
  private productoServices: ProductoServices;

  constructor() {
    this.productoServices = new ProductoServices();
  }

  public async  handle(command : GetAllProductosByOrdenCommand) {
    // TODO: Implement bussines logic
    return await this.productoServices.getAllByOrden();
  }
}
