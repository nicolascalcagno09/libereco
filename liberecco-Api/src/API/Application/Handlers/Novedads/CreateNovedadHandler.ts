import CreateNovedadCommand from '../../Commands/Novedads/CreateNovedadCommand';
import NovedadServices from '../../Services/Novedads/NovedadServices';
import Novedad from '../../Domain/Entities/Novedad';
import { StoreNovedadSchema } from '../../../Controllers/Schemas/NovedadSchema'
import RequiredFieldException from '../../Exceptions/RequiredFieldException';
import Validator from '../../../Common/Validator';
import { saveFileAndReturnUrlStorage } from '../../../Common/SaveFileAndReturnUrlStorage';
import { asyncForEach } from '../../../Common/AsyncForeach';
import SucursalServices from '../../Services/Sucursals/SucursalServices';

export default class CreateNovedadHandler {
  private novedadServices: NovedadServices;
  private validator : Validator;
  private sucursalServices: SucursalServices;

  constructor() {
    this.novedadServices = new NovedadServices();
    this.validator = new Validator();
    this.sucursalServices = new SucursalServices();
  }

  private validate(command){
    const error = this.validator.validate(command, StoreNovedadSchema);

    if(error) {
      const details = this.validator.validationResult(error.details)
      throw new RequiredFieldException(this.validator.validationResult(error.details));
    }
  }

  public async handle(command : CreateNovedadCommand) {
    this.validate(command);
    let body: any = command;
    
    let sucursalesIds = JSON.parse(body.sucursales);
    let sucursales = [];

    await asyncForEach(sucursalesIds, async a => {
      sucursales.push(await this.sucursalServices.getById(a));
    });

    const novedad = new Novedad(body);

    Object.keys(novedad).forEach(function (key) {
      if (typeof novedad[key] === "string" && (novedad[key].toLowerCase().trim() == 'true' || novedad[key].toLowerCase().trim() == 'false')) {
        novedad[key] = novedad[key].toLowerCase().trim() == 'true' ? true : false;
      }
    });

    novedad.setSucursales(sucursales);
    let newNovedad = await this.novedadServices.store(novedad);

    if (newNovedad) {
      if (body.fileImagenPath) {
        let urlImagenPath = await saveFileAndReturnUrlStorage(body.fileImagenPath, newNovedad, 'imagen');
        newNovedad.setImagenPath(urlImagenPath);
      }
      newNovedad = await this.novedadServices.store(newNovedad);
    }

    return newNovedad;
  }
}
