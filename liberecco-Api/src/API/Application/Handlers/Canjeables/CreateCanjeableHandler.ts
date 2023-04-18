import CreateCanjeableCommand from '../../Commands/Canjeables/CreateCanjeableCommand';
import CanjeableServices from '../../Services/Canjeables/CanjeableServices';
import Canjeable from '../../Domain/Entities/Canjeable';
import { StoreCanjeableSchema } from '../../../Controllers/Schemas/CanjeableSchema'
import RequiredFieldException from '../../Exceptions/RequiredFieldException';
import Validator from '../../../Common/Validator';
import { saveFileAndReturnUrlStorage } from '../../../Common/SaveFileAndReturnUrlStorage';
import { asyncForEach } from '../../../Common/AsyncForeach';
import SucursalServices from '../../Services/Sucursals/SucursalServices';

export default class CreateCanjeableHandler {
  private canjeableServices: CanjeableServices;
  private validator : Validator;
  private sucursalServices: SucursalServices;

  constructor() {
    this.canjeableServices = new CanjeableServices();
    this.sucursalServices = new SucursalServices()
    this.validator = new Validator();
  }

  private validate(command){
    const error = this.validator.validate(command, StoreCanjeableSchema);

    if(error) {
      const details = this.validator.validationResult(error.details)
      throw new RequiredFieldException(this.validator.validationResult(error.details));
    }
  }

  public async handle(command : CreateCanjeableCommand) {
    this.validate(command);
    let body: any = command;
    
    let sucursalesIds = JSON.parse(body.sucursales);
    let sucursales = [];

    await asyncForEach(sucursalesIds, async a => {
      sucursales.push(await this.sucursalServices.getById(a));
    });

    const canjeable = new Canjeable(body);

    Object.keys(canjeable).forEach(function (key) {
      if (typeof canjeable[key] === "string" && (canjeable[key].toLowerCase().trim() == 'true' || canjeable[key].toLowerCase().trim() == 'false')) {
        canjeable[key] = canjeable[key].toLowerCase().trim() == 'true' ? true : false;
      }
    });

    canjeable.setSucursales(sucursales);
    let newCanjeable = await this.canjeableServices.store(canjeable);

    if (newCanjeable) {
      if (body.fileImagenPath) {
        let urlImagenPath = await saveFileAndReturnUrlStorage(body.fileImagenPath, newCanjeable, 'imagen');
        newCanjeable.setImagenPath(urlImagenPath);
      }
      newCanjeable = await this.canjeableServices.store(newCanjeable);
    }
    return newCanjeable;
  }
}
