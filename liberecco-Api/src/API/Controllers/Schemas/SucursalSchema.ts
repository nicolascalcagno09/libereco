import * as Joi from 'joi';
import * as customErrorMessages from '../../Common/BaseErrorsSchema';

export const StoreSucursalSchema = {
  // sample: Joi.string()
  //   .min(3)
  //   .max(150)
  //   .required()
  //   .error((errors) => {
  //     return customErrorMessages.default(errors);
  //   }),
};


export const UpdateSucursalSchema = {
  id: Joi.number()
    .min(0)
    .required()
    .error((errors) => {
      return customErrorMessages.default(errors);
    }),
};

export const UpsertSucursalSchema = {
  id: Joi.number()
    .min(0)
    .required()
    .error((errors) => {
      return customErrorMessages.default(errors);
    }),
  reference: Joi.string()
    .min(0)
    .required()
    .error((errors) => {
      return customErrorMessages.default(errors);
    }),
};

export const SetSucursalActiveStatusSchema = {
  id: Joi.number()
    .min(0)
    .required()
    .error((errors) => {
      return customErrorMessages.default(errors);
    }),
  activo: Joi.boolean()
    .required()
    .error((errors) => {
      return customErrorMessages.default(errors);
    }),
};