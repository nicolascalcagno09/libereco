import * as Joi from 'joi';
import {color, efecto } from '../../../Application/Domain/Enums/ATLAS/soporte';

export class DisplayAdapter {
  CANID? : number;
  color? : color;
  efecto? : efecto;
  ascii? : boolean = false;
  valor? : number| string  = 0x00;
};

export const DisplayAdapterSchema : DisplayAdapter = Joi.object({
  CANID: Joi.number()
    .required(),
  color: [Joi.number()
    .min(0)
    .max(4)
    .required(),
    Joi.number()
    .min(1000)
    .max(1000)
    .required(),
  ],
  efecto: Joi.number()
    .min(0)
    .max(3)
    .required(),
  ascii: Joi.boolean()
    .required(),
  valor: [Joi.number()
    .required()
    .min(0),
    Joi.string()
    .required()
    .length(1)
  ]
});

export default DisplayAdapter;