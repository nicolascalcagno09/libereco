import { Command } from 'simple-command-bus';
import * as _ from 'lodash';

export default class CreateSucursalProductosCommand extends Command {
  private presentaciones = [];
  private saboresEstados = [];
  private productosIds = [];
  private sucursal;
  constructor(body: Object) {
    super();
    _.assign(this, body);
  }

  getSucursal(){
    return this.sucursal;
  }

  getPresentaciones(){
    return this.presentaciones;
  }

  getSaboresEstados(){
    return this.saboresEstados;
  }

  getProductosIds() {
    return this.productosIds;
  }
}
