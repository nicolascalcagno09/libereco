import CreatePromocionCommand from '../../Commands/Promocions/CreatePromocionCommand';
import PromocionServices from '../../Services/Promocions/PromocionServices';
import Promocion from '../../Domain/Entities/Promocion';
import { StorePromocionSchema } from '../../../Controllers/Schemas/PromocionSchema'
import RequiredFieldException from '../../Exceptions/RequiredFieldException';
import Validator from '../../../Common/Validator';
import { saveFileAndReturnUrlStorage } from '../../../Common/SaveFileAndReturnUrlStorage';
import { asyncForEach } from '../../../Common/AsyncForeach';
import SucursalServices from '../../Services/Sucursals/SucursalServices';

export default class CreatePromocionHandler {
  private promocionServices: PromocionServices;
  private sucursalServices: SucursalServices;
  private validator : Validator;

  constructor() {
    this.promocionServices = new PromocionServices();
    this.sucursalServices = new SucursalServices();
    this.validator = new Validator();
  }

  private validate(command){
    const error = this.validator.validate(command, StorePromocionSchema);

    if(error) {
      const details = this.validator.validationResult(error.details)
      throw new RequiredFieldException(this.validator.validationResult(error.details));
    }
  }

  public async handle(command : CreatePromocionCommand) {
    this.validate(command);
    let body: any = command;
    
    let sucursalesIds = JSON.parse(body.sucursales);
    let sucursales = [];

    await asyncForEach(sucursalesIds, async a => {
      sucursales.push(await this.sucursalServices.getById(a));
    });

    const promocion = new Promocion(body);

    Object.keys(promocion).forEach(function (key) {
      if (typeof promocion[key] === "string" && (promocion[key].toLowerCase().trim() == 'true' || promocion[key].toLowerCase().trim() == 'false')) {
        promocion[key] = promocion[key].toLowerCase().trim() == 'true' ? true : false;
      }
    });

    promocion.setSucursales(sucursales);

    if(body.diasDisponibles) {
      let parseDiasDisponibles = JSON.parse(body.diasDisponibles);
      promocion.dias_disponibles = parseDiasDisponibles;
    }

    if (body.cantidadCanjeSemanal) promocion.nro_canje_maximo_sem = body.cantidadCanjeSemanal;

    let newPromocion = await this.promocionServices.store(promocion);

    if (newPromocion) {
      if (body.fileImagenPath) {
        let urlImagenPath = await saveFileAndReturnUrlStorage(body.fileImagenPath, newPromocion, 'imagen');
        newPromocion.setImagenPath(urlImagenPath);
      }
      newPromocion = await this.promocionServices.store(newPromocion);
    }
    return newPromocion;
  }
}
