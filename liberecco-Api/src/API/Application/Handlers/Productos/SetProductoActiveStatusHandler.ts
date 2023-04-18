import Validator from '../../../Common/Validator';
import RequiredFieldException from '../../Exceptions/RequiredFieldException';
import ProductoServices from '../../Services/Productos/ProductoServices';
import Producto from '../../Domain/Entities/Producto';
import { SetProductoActiveStatusSchema } from '../../../Controllers/Schemas/ProductoSchema';
import SetProductoActiveStatusCommand from '../../Commands/Productos/SetProductoActiveStatusCommand';

export default class SetProductoActiveStatusHandler {
  private productoService: ProductoServices;
  private validator: Validator;

  constructor() {
    this.productoService = new ProductoServices();
    this.validator = new Validator();
  }


  private validate(command) {
    const error = this.validator.validate(command, SetProductoActiveStatusSchema);

    if (error) {
      const details = this.validator.validationResult(error.details)
      throw new RequiredFieldException(this.validator.validationResult(error.details));
    }
  }

  public async handle(command: SetProductoActiveStatusCommand) {
    this.validate(command);
    const producto = new Producto(command);
    return await this.productoService.updateActivoStatus(producto);
  }
}
