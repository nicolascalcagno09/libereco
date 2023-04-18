import ProductoServices from '../../Services/Productos/ProductoServices';
import GetAllProductosActivosByOrdenPresentActivasByOrdenCommand from '../../Commands/Productos/GetAllProductosActivosByOrdenPresentActivasByOrdenCommand';

export default class GetAllProductosActivosByOrdenPresentActivasByOrdenHandler {
  private productoServices: ProductoServices;

  constructor() {
    this.productoServices = new ProductoServices();
  }

  public async  handle(command : GetAllProductosActivosByOrdenPresentActivasByOrdenCommand) {
    // TODO: Implement bussines logic
    return await this.productoServices.getAllActivosConOrdenConPresentacionesActivasConOrden();
  }
}
