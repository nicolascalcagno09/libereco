import * as Joi from 'joi';
import {color, efecto } from '../../../Application/Domain/Enums/ATLAS/soporte';

export class ACKAdapter {
  CANID? : number;
  color? : color;
  efecto? : efecto;
  cantidad? : number;
};

export const ACKAdapterSchema : ACKAdapter = Joi.object({
  CANID: Joi.number()
    .positive()
    .required(),
  color: Joi.number()
    .min(0)
    .max(3)
    .required(),
  efecto: Joi.number()
    .min(0)
    .max(2)
    .required(),
  cantidad : Joi.number()
    .required()
    .positive()
});

export default ACKAdapter;