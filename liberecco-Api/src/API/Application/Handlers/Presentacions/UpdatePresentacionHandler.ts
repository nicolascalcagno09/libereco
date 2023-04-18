import UpdatePresentacionCommand from '../../Commands/Presentacions/UpdatePresentacionCommand';
import PresentacionServices from '../../Services/Presentacions/PresentacionServices';
import Presentacion from '../../Domain/Entities/Presentacion';
import { UpdatePresentacionSchema } from '../../../Controllers/Schemas/PresentacionSchema'
import Validator from '../../../Common/Validator';
import RequiredFieldException from '../../Exceptions/RequiredFieldException';
import { saveFileAndReturnUrlStorage } from '../../../Common/SaveFileAndReturnUrlStorage';

export default class UpdatePresentacionHandler {
  private presentacionServices: PresentacionServices;
  private validator : Validator;

  constructor() {
    this.presentacionServices = new PresentacionServices();
    this.validator = new Validator();
  }


  private validate(command){
    const error = this.validator.validate(command, UpdatePresentacionSchema);

    if(error) {
      const details = this.validator.validationResult(error.details)
      throw new RequiredFieldException(this.validator.validationResult(error.details));
    }
  }

  public async  handle(command : UpdatePresentacionCommand) {
    this.validate(command);
    let body: any = command;
    let presentacion = new Presentacion(command) as any;
    let fileImagenPath = presentacion.fileImagenPath;

    delete presentacion.fileImagenPath;

    Object.keys(presentacion).forEach(function (key) {
      if (typeof presentacion[key] === "string" && (presentacion[key].toLowerCase().trim() == 'true' || presentacion[key].toLowerCase().trim() == 'false')) {
        presentacion[key] = presentacion[key].toLowerCase().trim() == 'true' ? true : false;
      }
    });

    if (fileImagenPath) {
      let urlImagenPath = await saveFileAndReturnUrlStorage(body.fileImagenPath, presentacion, 'sabor');
      presentacion.setImagenPath(urlImagenPath);
      
    }

    return await this.presentacionServices.update(presentacion);
  }
}
