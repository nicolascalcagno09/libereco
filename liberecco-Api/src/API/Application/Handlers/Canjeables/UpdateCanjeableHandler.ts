import UpdateCanjeableCommand from '../../Commands/Canjeables/UpdateCanjeableCommand';
import CanjeableServices from '../../Services/Canjeables/CanjeableServices';
import Canjeable from '../../Domain/Entities/Canjeable';
import { UpdateCanjeableSchema } from '../../../Controllers/Schemas/CanjeableSchema'
import Validator from '../../../Common/Validator';
import RequiredFieldException from '../../Exceptions/RequiredFieldException'
import { saveFileAndReturnUrlStorage } from '../../../Common/SaveFileAndReturnUrlStorage';
import { asyncForEach } from '../../../Common/AsyncForeach';
import SucursalServices from '../../Services/Sucursals/SucursalServices';

export default class UpdateCanjeableHandler {
  private canjeableServices: CanjeableServices;
  private validator : Validator;
  private sucursalServices: SucursalServices;

  constructor() {
    this.canjeableServices = new CanjeableServices();
    this.validator = new Validator();
    this.sucursalServices = new SucursalServices()
  }


  private validate(command){
    const error = this.validator.validate(command, UpdateCanjeableSchema);

    if(error) {
      const details = this.validator.validationResult(error.details)
      throw new RequiredFieldException(this.validator.validationResult(error.details));
    }
  }

  public async  handle(command : UpdateCanjeableCommand) {
    this.validate(command);
    let body: any = command;
    let canjeable = await this.canjeableServices.getOneById(body.id);
    let fileImagenPath = body.fileImagenPath;

    delete canjeable.imagen_path;
    delete canjeable.sucursales;

    body.titulo ? canjeable.setTitulo(body.titulo) : '';
    body.subtitulo ? canjeable.setSubtitulo(body.subtitulo) : '';
    body.descripcion ? canjeable.setDescripcion(body.descripcion) : '';
    body.desde ? canjeable.setDesde(body.desde) : '';
    body.hasta ? canjeable.setHasta(body.hasta) : '';
    body.puntos ? canjeable.setPuntos(body.puntos) : 0;

    let sucursalesIds = JSON.parse(body.sucursales);
    let sucursales = [];

    await asyncForEach(sucursalesIds, async a => {
      sucursales.push(await this.sucursalServices.getById(a));
    });

    if (body.activo == 'true') {
      canjeable.setActivo(true);
    }
    else {
      canjeable.setActivo(false);
    }

    if (body.visibilidad == 'true') {
      canjeable.setVisibilidad(true);
    }
    else {
      canjeable.setVisibilidad(false);
    }

    canjeable.setSucursales(sucursales);

    Object.keys(canjeable).forEach(function (key) {
      if (typeof canjeable[key] === "string" && (canjeable[key].toLowerCase().trim() == 'true' || canjeable[key].toLowerCase().trim() == 'false')) {
        canjeable[key] = canjeable[key].toLowerCase().trim() == 'true' ? true : false;
      }
    });

    if (fileImagenPath) {
      let urlImagenPath = await saveFileAndReturnUrlStorage(body.fileImagenPath, canjeable, 'imagen');
      canjeable.setImagenPath(urlImagenPath);
      
    }
    return await this.canjeableServices.store(canjeable);
  }
  
}
