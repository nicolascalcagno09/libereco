import Validator from '../../../Common/Validator';
import { Command } from 'simple-command-bus';

export class GetSinglePromocion{

}

export default class GetAllBySucursalPromocionCommand extends Command {

  id : number;
  
  usuarioId: number;
  private validator: Validator;

  constructor(id : number, usuarioId) {
    super();
    this.id = id;
    this.usuarioId = usuarioId;
    
  }

  getId() {
    return this.id;
  }

  getUsuarioId() {
    return this.usuarioId;
  }
  
}
