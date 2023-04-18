import * as Joi from 'joi';
import {color, estado } from '../../../Application/Domain/Enums/ATLAS/soporte';

export class FotoCelulaAdapter {
  CANID? : number;
  color? : color;
  estado? : estado;
};

export const FotoCelulaAdapterSchema : FotoCelulaAdapter = Joi.object({
  CANID: Joi.number()
    .positive()
    .required(),
  color: Joi.number()
    .min(0)
    .max(3),
  estado: Joi.number()
    .min(0)
    .max(2)
    .required(),
});

export default FotoCelulaAdapter;