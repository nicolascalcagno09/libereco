import CreateSucursalCommand from '../../Commands/Sucursals/CreateSucursalCommand';
import SucursalServices from '../../Services/Sucursals/SucursalServices';
import Sucursal from '../../Domain/Entities/Sucursal';
import { StoreSucursalSchema } from '../../../Controllers/Schemas/SucursalSchema'
import RequiredFieldException from '../../Exceptions/RequiredFieldException';
import Validator from '../../../Common/Validator';
import Horario from '../../Domain/Entities/Horario';
import Delivery from '../../Domain/Entities/Delivery';
import { saveFileAndReturnUrlStorage } from '../../../Common/SaveFileAndReturnUrlStorage';
import ProductoServices from '../../Services/Productos/ProductoServices';

export default class CreateSucursalHandler {
  private sucursalServices: SucursalServices;
  private productoServices: ProductoServices;
  private validator : Validator;

  constructor() {
    this.sucursalServices = new SucursalServices();
    this.validator = new Validator();
  }

  private validate(command){
    const error = this.validator.validate(command, StoreSucursalSchema);

    if(error) {
      const details = this.validator.validationResult(error.details)
      throw new RequiredFieldException(this.validator.validationResult(error.details));
    }
  }

  public async  handle(command : CreateSucursalCommand) {
    this.validate(command);
    let body:any = command;
    const sucursal = new Sucursal(body);

    let horario = new Horario();
    let delivery = new Delivery();

    horario.apertura = body.horarioApertura;
    horario.cierre = body.horarioCierre;
    horario.informacion = body.horarioInformacion;

    delivery.costo = body.deliveryCosto;
    delivery.horario = body.deliveryHorario;
    delivery.telefono = body.deliveryTelefono;
    delivery.celular = body.deliveryCelular;

    sucursal.setHorario(horario);
    sucursal.setDelivery(delivery);

    Object.keys(sucursal).forEach(function (key) {
      if (typeof sucursal[key] === "string" && (sucursal[key].toLowerCase().trim() == 'true' || sucursal[key].toLowerCase().trim() == 'false')) {
        sucursal[key] = sucursal[key].toLowerCase().trim() == 'true' ? true : false;
      }
    });
    
    let newSucursal = await this.sucursalServices.store(sucursal);
    if (newSucursal) {
      if (body.fileImagenPath) {
        let urlImagenPath = await saveFileAndReturnUrlStorage(body.fileImagenPath, newSucursal, 'imagen');
        let urlImagenResponsivePath = await saveFileAndReturnUrlStorage(body.fileImagenResponsivePath, newSucursal, 'imagen_responsive');
        newSucursal.setImagenPath(urlImagenPath);
        newSucursal.setImagenResponsivePath(urlImagenResponsivePath);
      }
      newSucursal = await this.sucursalServices.store(newSucursal);
    }

    return newSucursal;
  }
}
