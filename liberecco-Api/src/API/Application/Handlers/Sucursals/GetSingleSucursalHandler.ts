import GetSingleSucursalCommand from '../../Commands/Sucursals/GetSingleSucursalCommand';
import SucursalServices from '../../Services/Sucursals/SucursalServices';

export default class GetSingleSucursalHandler {
  private sucursalServices: SucursalServices;

  constructor() {
    this.sucursalServices = new SucursalServices();
  }

  public async  handle(command : GetSingleSucursalCommand) {

    let sucursal = await this.sucursalServices.getById(command.getId());
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
