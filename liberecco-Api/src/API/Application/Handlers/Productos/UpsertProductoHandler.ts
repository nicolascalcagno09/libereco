import UpsertProductoCommand from '../../Commands/Productos/UpsertProductoCommand';
import ProductoServices from '../../Services/Productos/ProductoServices';
import Producto from '../../Domain/Entities/Producto';
import { UpsertProductoSchema } from '../../../Controllers/Schemas/ProductoSchema'
import RequiredFieldException from '../../Exceptions/RequiredFieldException';
import Validator from '../../../Common/Validator';

export default class UpsertProductoHandler {
  private productoServices: ProductoServices;
  private validator : Validator;

  constructor() {
    this.productoServices = new ProductoServices();
    this.validator = new Validator();
  }

  private validate(command){
    const error = this.validator.validate(command, UpsertProductoSchema);
    if(error) {
      const details = this.validator.validationResult(error.details)
      throw new RequiredFieldException(this.validator.validationResult(error.details));
    }
  }

  public async  handle(command : UpsertProductoCommand) {
    this.validate(command);
    const producto = new Producto(command);
    const match = await this.productoServices.findOne({where : { id : producto.getId() } });
    if (match) producto.setId(match.getId());
    return await this.productoServices.store(producto);
  }

}
