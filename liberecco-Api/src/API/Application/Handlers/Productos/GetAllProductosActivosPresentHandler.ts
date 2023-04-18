import ProductoServices from '../../Services/Productos/ProductoServices';
import GetAllProductosActivosPresentCommand from '../../Commands/Productos/GetAllProductosActivosPresentCommand';

export default class GetAllProductosActivosPresentHandler {
  private productoServices: ProductoServices;

  constructor() {
    this.productoServices = new ProductoServices();
  }

  public async  handle(command : GetAllProductosActivosPresentCommand) {
    // TODO: Implement bussines logic
    return await this.productoServices.getAllActivosConPresentaciones();
  }
}
