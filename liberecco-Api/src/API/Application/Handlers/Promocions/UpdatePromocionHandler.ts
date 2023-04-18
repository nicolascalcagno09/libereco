import UpdatePromocionCommand from '../../Commands/Promocions/UpdatePromocionCommand';
import PromocionServices from '../../Services/Promocions/PromocionServices';
import Promocion from '../../Domain/Entities/Promocion';
import { UpdatePromocionSchema } from '../../../Controllers/Schemas/PromocionSchema'
import Validator from '../../../Common/Validator';
import RequiredFieldException from '../../Exceptions/RequiredFieldException'
import { saveFileAndReturnUrlStorage } from '../../../Common/SaveFileAndReturnUrlStorage';
import { asyncForEach } from '../../../Common/AsyncForeach';
import SucursalServices from '../../Services/Sucursals/SucursalServices';

export default class UpdatePromocionHandler {
  private promocionServices: PromocionServices;
  private validator : Validator;
  private sucursalServices: SucursalServices;

  constructor() {
    this.promocionServices = new PromocionServices();
    this.validator = new Validator();
    this.sucursalServices = new SucursalServices();
  }


  private validate(command){
    const error = this.validator.validate(command, UpdatePromocionSchema);

    if(error) {
      const details = this.validator.validationResult(error.details)
      throw new RequiredFieldException(this.validator.validationResult(error.details));
    }
  }

  public async  handle(command : UpdatePromocionCommand) {
    this.validate(command);
    let body: any = command;
    let promocion = await this.promocionServices.getOneById(body.id);
    let fileImagenPath = body.fileImagenPath;

    delete promocion.imagen_path;
    delete promocion.sucursales;

    body.titulo ? promocion.setTitulo(body.titulo) : '';
    body.subtitulo ? promocion.setSubtitulo(body.subtitulo) : '';
    body.descripcion ? promocion.setDescripcion(body.descripcion) : '';
    body.desde ? promocion.setDesde(body.desde) : '';
    body.hasta ? promocion.setHasta(body.hasta) : '';
    body.equivalente ? promocion.setEquivalente(body.equivalente) : '';
    body.puntos ? promocion.setPuntos(body.puntos) : '';

    let sucursalesIds = JSON.parse(body.sucursales);
    let sucursales = [];

    await asyncForEach(sucursalesIds, async a => {
      sucursales.push(await this.sucursalServices.getById(a));
    });

    if (body.activo == 'true') {
      promocion.setActivo(true);
    }
    else {
      promocion.setActivo(false);
    }

    if (body.visibilidad == 'true') {
      promocion.setVisibilidad(true);
    }
    else {
      promocion.setVisibilidad(false);
    }

    promocion.setSucursales(sucursales);

    Object.keys(promocion).forEach(function (key) {
      if (typeof promocion[key] === "string" && (promocion[key].toLowerCase().trim() == 'true' || promocion[key].toLowerCase().trim() == 'false')) {
        promocion[key] = promocion[key].toLowerCase().trim() == 'true' ? true : false;
      }
    });

    if(body.diasDisponibles) {
      let parseDiasDisponibles = JSON.parse(body.diasDisponibles);
      promocion.dias_disponibles = parseDiasDisponibles;

      await this.promocionServices.removeDiasDisponibles(body.id);
    }

    if (body.cantidadCanjeSemanal) promocion.nro_canje_maximo_sem = body.cantidadCanjeSemanal;

    if (fileImagenPath) {
      let urlImagenPath = await saveFileAndReturnUrlStorage(body.fileImagenPath, promocion, 'imagen');
      promocion.setImagenPath(urlImagenPath);      
    }
    return await this.promocionServices.store(promocion);
  }
}
