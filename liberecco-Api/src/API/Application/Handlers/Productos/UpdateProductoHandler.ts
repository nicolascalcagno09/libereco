import UpdateProductoCommand from '../../Commands/Productos/UpdateProductoCommand';
import ProductoServices from '../../Services/Productos/ProductoServices';
import Producto from '../../Domain/Entities/Producto';
import { UpdateProductoSchema } from '../../../Controllers/Schemas/ProductoSchema'
import Validator from '../../../Common/Validator';
import RequiredFieldException from '../../Exceptions/RequiredFieldException'
import Sabor from 'API/Application/Domain/Entities/Sabor';

export default class UpdateProductoHandler {
  private productoServices: ProductoServices;
  private validator : Validator;

  constructor() {
    this.productoServices = new ProductoServices();
    this.validator = new Validator();
  }


  private validate(command){
    const error = this.validator.validate(command, UpdateProductoSchema);

    if(error) {
      const details = this.validator.validationResult(error.details)
      throw new RequiredFieldException(this.validator.validationResult(error.details));
    }
  }

  public async  handle(command : UpdateProductoCommand) {
    this.validate(command);
    const producto = new Producto(command);
    let saboresIds = producto.sabores.map((x:any) => x.id);
    delete producto.sabores;
    return await this.productoServices.updateConSabores(producto,saboresIds);
  }
}
