import CuponServices from '../../Services/Cupons/CuponServices';
import Cupon from '../../Domain/Entities/Cupon';
import { StoreCuponSchema } from '../../../Controllers/Schemas/CuponSchema'
import RequiredFieldException from '../../Exceptions/RequiredFieldException';
import Validator from '../../../Common/Validator';
import { io } from '../../../../index';
import GenerateCuponCommand from '../../Commands/Cupons/GenerateCuponCommand';
import UserAppServices from "../../Services/UserApps/UserAppServices";
import ActionNotAllowedException from '../../Exceptions/ActionNotAllowedException';
import CanjeableServices from '../../Services/Canjeables/CanjeableServices';


export default class ScanCuponHandler {
  private cuponServices: CuponServices;
  private userAppServices: UserAppServices
  private validator: Validator;
  private canjeableServices: CanjeableServices;

  constructor() {
    this.cuponServices = new CuponServices();
    this.validator = new Validator();
    this.userAppServices = new UserAppServices();
    this.canjeableServices = new CanjeableServices();
  }

  private validate(command) {
    const error = this.validator.validate(command, StoreCuponSchema);

    if (error) {
      const details = this.validator.validationResult(error.details)
      throw new RequiredFieldException(this.validator.validationResult(error.details));
    }
  }

  public async handle(command: GenerateCuponCommand) {

    let data = command as any;
    try {
      let usuarioApp = await this.userAppServices.getById(data.usuarioApp);

      if (data.canjeable) {

        this.validate(data);
        const cupon: any = new Cupon(data);

        let canjeable = await this.canjeableServices.getById(data.canjeable);


        // Restar puntos
        await this.userAppServices.validateSubstractPoints(usuarioApp, canjeable?.puntos);

        let cuponnew: Cupon = await this.cuponServices.scannedCanjeable(cupon);

        // Restar puntos
        await this.userAppServices.substractPoints(usuarioApp, canjeable?.puntos);
       
        try {
          io.to(cupon.usuarioApp).emit("qrScanEvent", "CUPON ESCANEADO CORRECTAMENTE");

        } catch (error) {
          console.log(error);
        }

        return { cupon: cuponnew.canjeable, usuario: cuponnew.usuarioApp }

      } else if (data.promocion) {

        this.validate(data);
        const cupon: any = new Cupon(data);

        let cuponnew: any = await this.cuponServices.scannedPromocion(cupon);

        // Sumar puntos
        await this.userAppServices.addPoints(cuponnew.usuarioApp, cuponnew?.promocion?.puntos);

        try {
          io.to(cupon.usuarioApp).emit("qrScanEvent", "CUPON ESCANEADO CORRECTAMENTE");

        } catch (error) {
          console.log(error);
        }

        return { cupon: cuponnew.promocion, usuario: cuponnew.usuarioApp }
      } else {
        throw new ActionNotAllowedException('You must send a promotion or a redeemable');
      }


    } catch (error) {
      throw error;
    }

  }
}
