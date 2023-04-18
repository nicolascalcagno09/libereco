import * as Joi from 'joi';
import {color, efecto } from '../../../Application/Domain/Enums/ATLAS/soporte';

export class ComandoAdapter {
  CANID : number;
  comando : string;
  argumentos? : efecto;
  
  constructor(canid :number = 0, comando : string = '', argumentos? ){
    this.CANID = canid ;
    this.comando = comando ? comando.charAt(0): '';
    this.argumentos = argumentos;
  }
};

export const ComandoAdapterSchema : ComandoAdapter = Joi.object({
  CANID: Joi.number()
    .required(),
  comando: Joi.string()
    .length(1)
    .required(),
  argumentos: Joi.string()
});

export default ComandoAdapter;