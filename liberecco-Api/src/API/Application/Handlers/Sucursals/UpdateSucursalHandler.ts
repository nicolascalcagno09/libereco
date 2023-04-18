import UpdateSucursalCommand from '../../Commands/Sucursals/UpdateSucursalCommand';
import SucursalServices from '../../Services/Sucursals/SucursalServices';
import Sucursal from '../../Domain/Entities/Sucursal';
import { UpdateSucursalSchema } from '../../../Controllers/Schemas/SucursalSchema'
import Validator from '../../../Common/Validator';
import RequiredFieldException from '../../Exceptions/RequiredFieldException'
import Horario from '../../Domain/Entities/Horario';
import Delivery from '../../Domain/Entities/Delivery';
import { saveFileAndReturnUrlStorage } from '../../../Common/SaveFileAndReturnUrlStorage';

export default class UpdateSucursalHandler {
  private sucursalServices: SucursalServices;
  private validator: Validator;

  constructor() {
    this.sucursalServices = new SucursalServices();
    this.validator = new Validator();
  }


  private validate(command) {
    const error = this.validator.validate(command, UpdateSucursalSchema);

    if (error) {
      const details = this.validator.validationResult(error.details)
      throw new RequiredFieldException(this.validator.validationResult(error.details));
    }
  }

  public async handle(command: UpdateSucursalCommand) {
    this.validate(command);
    let body: any = command;
    let sucursal = new Sucursal(command) as any;
    let fileImagenPath = sucursal.fileImagenPath;
    let fileImagenResponsivePath = sucursal.fileImagenResponsivePath;
    delete sucursal.fileImagenPath;
    delete sucursal.fileImagenResponsivePath;

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

    delete sucursal.horarioApertura;
    delete sucursal.horarioCierre;
    delete sucursal.horarioInformacion;

    delete sucursal.deliveryCosto;
    delete sucursal.deliveryHorario;
    delete sucursal.deliveryTelefono;
    delete sucursal.deliveryCelular;

    Object.keys(sucursal).forEach(function (key) {
      if (typeof sucursal[key] === "string" && (sucursal[key].toLowerCase().trim() == 'true' || sucursal[key].toLowerCase().trim() == 'false')) {
        sucursal[key] = sucursal[key].toLowerCase().trim() == 'true' ? true : false;
      }
    });

    if (fileImagenPath) {
      let urlImagenPath = await saveFileAndReturnUrlStorage(body.fileImagenPath, sucursal, 'sucursal');
      sucursal.setImagenPath(urlImagenPath);
      
    }

    if (fileImagenResponsivePath) {
      let urlImagenResponsivePath = await saveFileAndReturnUrlStorage(body.fileImagenResponsivePath, sucursal, 'responsive_sucursal');
      sucursal.setImagenResponsivePath(urlImagenResponsivePath);
      
    }
    return await this.sucursalServices.update(sucursal);

  }
}

    