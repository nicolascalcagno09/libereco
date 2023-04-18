import UpdateNovedadCommand from '../../Commands/Novedads/UpdateNovedadCommand';
import NovedadServices from '../../Services/Novedads/NovedadServices';
import { UpdateNovedadSchema } from '../../../Controllers/Schemas/NovedadSchema'
import Validator from '../../../Common/Validator';
import RequiredFieldException from '../../Exceptions/RequiredFieldException'
import { saveFileAndReturnUrlStorage } from '../../../Common/SaveFileAndReturnUrlStorage';
import { asyncForEach } from '../../../Common/AsyncForeach';
import SucursalServices from '../../Services/Sucursals/SucursalServices';

export default class UpdateNovedadHandler {
  private novedadServices: NovedadServices;
  private validator : Validator;
  private sucursalServices: SucursalServices;
  
  constructor() {
    this.novedadServices = new NovedadServices();
    this.validator = new Validator();
    this.sucursalServices = new SucursalServices();
  }


  private validate(command){
    const error = this.validator.validate(command, UpdateNovedadSchema);

    if(error) {
      const details = this.validator.validationResult(error.details)
      throw new RequiredFieldException(this.validator.validationResult(error.details));
    }
  }

  public async  handle(command : UpdateNovedadCommand) {
    this.validate(command);
    let body: any = command;
    let novedad = await this.novedadServices.getOneById(body.id);
    let fileImagenPath = body.fileImagenPath;

    delete novedad.imagen_path;
    delete novedad.sucursales;

    body.titulo ? novedad.setTitulo(body.titulo) : '';
    body.subtitulo ? novedad.setSubtitulo(body.subtitulo) : '';
    body.descripcion ? novedad.setDescripcion(body.descripcion) : '';
    body.desde ? novedad.setDesde(body.desde) : '';
    body.hasta ? novedad.setHasta(body.hasta) : '';

    let sucursalesIds = JSON.parse(body.sucursales);
    let sucursales = [];

    await asyncForEach(sucursalesIds, async a => {
      sucursales.push(await this.sucursalServices.getById(a));
    });

    if (body.activo == 'true') {
      novedad.setActivo(true);
    }
    else {
      novedad.setActivo(false);
    }

    if (body.visibilidad == 'true') {
      novedad.setVisibilidad(true);
    }
    else {
      novedad.setVisibilidad(false);
    }

    novedad.setSucursales(sucursales);

    Object.keys(novedad).forEach(function (key) {
      if (typeof novedad[key] === "string" && (novedad[key].toLowerCase().trim() == 'true' || novedad[key].toLowerCase().trim() == 'false')) {
        novedad[key] = novedad[key].toLowerCase().trim() == 'true' ? true : false;
      }
    });

    if (fileImagenPath) {
      let urlImagenPath = await saveFileAndReturnUrlStorage(body.fileImagenPath, novedad, 'imagen');
      novedad.setImagenPath(urlImagenPath);
      
    }
    return await this.novedadServices.store(novedad);
  }
}
