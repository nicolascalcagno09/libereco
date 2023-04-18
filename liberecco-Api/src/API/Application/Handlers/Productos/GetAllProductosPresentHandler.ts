import GetAllProductosPresentCommand from '../../Commands/Productos/GetAllProductosPresentCommand';
import ProductoServices from '../../Services/Productos/ProductoServices';

export default class GetAllProductosPresentHandler {
  private productoServices: ProductoServices;

  constructor() {
    this.productoServices = new ProductoServices();
  }

  public async  handle(command : GetAllProductosPresentCommand) {
    // TODO: Implement bussines logic
    return await this.productoServices.getAllConPresentaciones();
  }
}
