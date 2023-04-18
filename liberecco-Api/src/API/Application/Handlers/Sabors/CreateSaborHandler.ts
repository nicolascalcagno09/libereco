import CreateSaborCommand from '../../Commands/Sabors/CreateSaborCommand';
import SaborServices from '../../Services/Sabors/SaborServices';
import Sabor from '../../Domain/Entities/Sabor';
import { StoreSaborSchema } from '../../../Controllers/Schemas/SaborSchema'
import RequiredFieldException from '../../Exceptions/RequiredFieldException';
import Validator from '../../../Common/Validator';
import { saveFileAndReturnUrlStorage } from '../../../Common/SaveFileAndReturnUrlStorage';

export default class CreateSaborHandler {
  private saborServices: SaborServices;
  private validator: Validator;

  constructor() {
    this.saborServices = new SaborServices();
    this.validator = new Validator();
  }

  private validate(command) {
    const error = this.validator.validate(command, StoreSaborSchema);

    if (error) {
      const details = this.validator.validationResult(error.details)
      throw new RequiredFieldException(this.validator.validationResult(error.details));
    }
  }

  public async handle(command: CreateSaborCommand) {
    this.validate(command);
    let body: any = command;

    const sabor = new Sabor(body);
    sabor.setTipoSabor(body.tipoSaborId);
    Object.keys(sabor).forEach(function (key) {
      if (typeof sabor[key] === "string" && (sabor[key].toLowerCase().trim() == 'true' || sabor[key].toLowerCase().trim() == 'false')) {
        sabor[key] = sabor[key].toLowerCase().trim() == 'true' ? true : false;
      }
    });
    let newSabor = await this.saborServices.store(sabor);
    if (newSabor) {
      
      if (body.fileImagenPath) {
        let urlImagenPath = await saveFileAndReturnUrlStorage(body.fileImagenPath, newSabor, 'imagen');
        newSabor.setImagenPath(urlImagenPath);
      }

      newSabor = await this.saborServices.store(newSabor);
    }
    return await this.saborServices.getById(newSabor.getId());

  }
}
