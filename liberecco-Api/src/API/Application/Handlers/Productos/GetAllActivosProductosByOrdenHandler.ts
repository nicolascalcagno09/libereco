import ProductoServices from '../../Services/Productos/ProductoServices';
import GetAllActivosProductosByOrdenCommand from '../../Commands/Productos/GetAllActivosProductosByOrdenCommand';

export default class GetAllActivosProductosByOrdenHandler {
  private productoServices: ProductoServices;

  constructor() {
    this.productoServices = new ProductoServices();
  }

  public async  handle(command : GetAllActivosProductosByOrdenCommand) {
    // TODO: Implement bussines logic
    return await this.productoServices.getAllActivosByOrden();
  }
}
