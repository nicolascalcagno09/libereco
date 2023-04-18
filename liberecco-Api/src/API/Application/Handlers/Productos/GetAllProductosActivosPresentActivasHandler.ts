import ProductoServices from '../../Services/Productos/ProductoServices';
import GetAllProductosActivosPresentActivasCommand from '../../Commands/Productos/GetAllProductosActivosPresentActivasCommand';

export default class GetAllProductosActivosPresentActivasHandler {
  private productoServices: ProductoServices;

  constructor() {
    this.productoServices = new ProductoServices();
  }

  public async  handle(command : GetAllProductosActivosPresentActivasCommand) {
    // TODO: Implement bussines logic
    return await this.productoServices.getAllActivosConPresentacionesActivas();
  }
}
