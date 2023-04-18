import CreateProductoCommand from '../../Commands/Productos/CreateProductoCommand';
import ProductoServices from '../../Services/Productos/ProductoServices';
import Producto from '../../Domain/Entities/Producto';
import { StoreProductoSchema } from '../../../Controllers/Schemas/ProductoSchema'
import RequiredFieldException from '../../Exceptions/RequiredFieldException';
import Validator from '../../../Common/Validator';

export default class CreateProductoHandler {
  private productoServices: ProductoServices;
  private validator : Validator;

  constructor() {
    this.productoServices = new ProductoServices();
    this.validator = new Validator();
  }

  private validate(command){
    const error = this.validator.validate(command, StoreProductoSchema);

    if(error) {
      const details = this.validator.validationResult(error.details)
      throw new RequiredFieldException(this.validator.validationResult(error.details));
    }
  }

  public async  handle(command : CreateProductoCommand) {
    this.validate(command);
    const producto = new Producto(command);
    return await this.productoServices.store(producto);
  }
}
