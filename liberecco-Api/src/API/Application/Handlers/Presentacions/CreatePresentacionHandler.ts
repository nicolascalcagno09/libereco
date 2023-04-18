import CreatePresentacionCommand from '../../Commands/Presentacions/CreatePresentacionCommand';
import PresentacionServices from '../../Services/Presentacions/PresentacionServices';
import Presentacion from '../../Domain/Entities/Presentacion';
import { StorePresentacionSchema } from '../../../Controllers/Schemas/PresentacionSchema'
import RequiredFieldException from '../../Exceptions/RequiredFieldException';
import Validator from '../../../Common/Validator';
import { saveFileAndReturnUrlStorage } from '../../../Common/SaveFileAndReturnUrlStorage';

export default class CreatePresentacionHandler {
  private presentacionServices: PresentacionServices;
  private validator : Validator;

  constructor() {
    this.presentacionServices = new PresentacionServices();
    this.validator = new Validator();
  }

  private validate(command){
    const error = this.validator.validate(command, StorePresentacionSchema);

    if(error) {
      const details = this.validator.validationResult(error.details)
      throw new RequiredFieldException(this.validator.validationResult(error.details));
    }
  }

  public async handle(command : CreatePresentacionCommand) {
    this.validate(command);
    let body: any = command;

    const presentacion = new Presentacion(body);
    presentacion.setProducto(body.productoId);

    Object.keys(presentacion).forEach(function (key) {
      if (typeof presentacion[key] === "string" && (presentacion[key].toLowerCase().trim() == 'true' || presentacion[key].toLowerCase().trim() == 'false')) {
        presentacion[key] = presentacion[key].toLowerCase().trim() == 'true' ? true : false;
      }
    });
    let newPresentacion = await this.presentacionServices.store(presentacion);
    if (newPresentacion) {
      
      if (body.fileImagenPath) {
        let urlImagenPath = await saveFileAndReturnUrlStorage(body.fileImagenPath, newPresentacion, 'imagen');
        newPresentacion.setImagenPath(urlImagenPath);
      }

      newPresentacion = await this.presentacionServices.store(newPresentacion);
    };
    return await this.presentacionServices.getById(newPresentacion.getId());
  }
}
