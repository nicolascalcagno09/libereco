import GetAllProductosCommand from '../../Commands/Productos/GetAllProductosCommand';
import ProductoServices from '../../Services/Productos/ProductoServices';

export default class GetAllProductosHandler {
  private productoServices: ProductoServices;

  constructor() {
    this.productoServices = new ProductoServices();
  }

  public async  handle(command : GetAllProductosCommand) {
    // TODO: Implement bussines logic
    return await this.productoServices.getAll();
  }
}
