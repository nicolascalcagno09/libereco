import CreateSucursalProductosCommand from '../../Commands/Sucursals/CreateSucursalProductosCommand';
import SucursalServices from '../../Services/Sucursals/SucursalServices';
import Sucursal from '../../Domain/Entities/Sucursal';
import { StoreSucursalSchema } from '../../../Controllers/Schemas/SucursalSchema'
import RequiredFieldException from '../../Exceptions/RequiredFieldException';
import Validator from '../../../Common/Validator';
import ProductoServices from '../../Services/Productos/ProductoServices';
import Producto from 'API/Application/Domain/Entities/Producto';

export default class CreateSucursalProductosHandler {
  private sucursalServices: SucursalServices;
  private validator : Validator;
  private productoServices: ProductoServices;

  constructor() {
    this.sucursalServices = new SucursalServices();
    this.productoServices = new ProductoServices();
    this.validator = new Validator();
  }

  private validate(command){
    const error = this.validator.validate(command, StoreSucursalSchema);

    if(error) {
      const details = this.validator.validationResult(error.details)
      throw new RequiredFieldException(this.validator.validationResult(error.details));
    }
  }

  public async  handle(command : CreateSucursalProductosCommand) {
    this.validate(command);
    let body:any = command;
    let sucursalId = command.getSucursal();
    let presentaciones = command.getPresentaciones();
    let saboresEstados = command.getSaboresEstados();
    let productosIds   = command.getProductosIds();

    const sucursal = await this.sucursalServices.getById(sucursalId);

    if (productosIds && productosIds.length > 0) {
      sucursal.setProductos(await this.productoServices.getByIds(productosIds));
    }
    if (productosIds.length == 0) {
      let productos: Producto[] = [];
      sucursal.setProductos(productos);
    }

    sucursal.setPresentaciones(presentaciones);
    sucursal.setSabores(saboresEstados);

    return await this.sucursalServices.storeProductos(sucursal);
    
  }
}
