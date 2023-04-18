import ProductoServices from '../../Services/Productos/ProductoServices';
import GetAllActivosProductosCommand from '../../Commands/Productos/GetAllActivosProductosCommand';

export default class GetAllActivosProductosHandler {
  private productoServices: ProductoServices;

  constructor() {
    this.productoServices = new ProductoServices();
  }

  public async  handle(command : GetAllActivosProductosCommand) {
    // TODO: Implement bussines logic
    return await this.productoServices.getAllActivos();
  }
}
