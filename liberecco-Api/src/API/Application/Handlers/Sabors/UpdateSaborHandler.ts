import UpdateSaborCommand from '../../Commands/Sabors/UpdateSaborCommand';
import SaborServices from '../../Services/Sabors/SaborServices';
import Sabor from '../../Domain/Entities/Sabor';
import { UpdateSaborSchema } from '../../../Controllers/Schemas/SaborSchema'
import Validator from '../../../Common/Validator';
import RequiredFieldException from '../../Exceptions/RequiredFieldException'
import { saveFileAndReturnUrlStorage } from '../../../Common/SaveFileAndReturnUrlStorage';

export default class UpdateSaborHandler {
  private saborServices: SaborServices;
  private validator : Validator;

  constructor() {
    this.saborServices = new SaborServices();
    this.validator = new Validator();
  }


  private validate(command){
    const error = this.validator.validate(command, UpdateSaborSchema);

    if(error) {
      const details = this.validator.validationResult(error.details)
      throw new RequiredFieldException(this.validator.validationResult(error.details));
    }
  }

  public async  handle(command : UpdateSaborCommand) {
    this.validate(command);
    let body: any = command;
    let sabor = new Sabor(command) as any;
    let fileImagenPath = sabor.fileImagenPath;

    delete sabor.fileImagenPath;

    Object.keys(sabor).forEach(function (key) {
      if (typeof sabor[key] === "string" && (sabor[key].toLowerCase().trim() == 'true' || sabor[key].toLowerCase().trim() == 'false')) {
        sabor[key] = sabor[key].toLowerCase().trim() == 'true' ? true : false;
      }
    });

    if (fileImagenPath) {
      let urlImagenPath = await saveFileAndReturnUrlStorage(body.fileImagenPath, sabor, 'sabor');
      sabor.setImagenPath(urlImagenPath);
      
    }
    return await this.saborServices.update(sabor);
  }
}
