import SucursalServices from '../../Services/Sucursals/SucursalServices';
import GetSingleSucursalByUrlCommand from '../../Commands/Sucursals/GetSingleSucursalByUrlCommand';

export default class GetSingleSucursalByUrlHandler {
  private sucursalServices: SucursalServices;

  constructor() {
    this.sucursalServices = new SucursalServices();
  }

  public async handle(command : GetSingleSucursalByUrlCommand) {

    let sucursal = await this.sucursalServices.getByUrlamigable(command.getUrlamigable());
    if(sucursal.getPresentaciones().length){
      sucursal.presentaciones.map((x)=>{
        x['presentacionId'] = x.presentacion ? x.presentacion.getId() : null;
        return x;
      })
    }
    if(sucursal.getSabores().length){
      sucursal.sabores.map((x)=>{
        x['saborId'] = x.sabor ? x.sabor.getId() : null;
        return x;
      })
    }

    return sucursal;
  }
}
