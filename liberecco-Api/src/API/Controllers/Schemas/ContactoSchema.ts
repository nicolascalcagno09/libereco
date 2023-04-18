import * as Joi from 'joi';
import * as customErrorMessages from '../../Common/BaseErrorsSchema';

export const StoreContactoSchema = {
  // sample: Joi.string()
  //   .min(3)
  //   .max(150)
  //   .required()
  //   .error((errors) => {
  //     return customErrorMessages.default(errors);
  //   }),
};


export const UpdateContactoSchema = {
  id: Joi.number()
    .min(0)
    .required()
    .error((errors) => {
      return customErrorMessages.default(errors);
    }),
};

export const UpsertContactoSchema = {
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

export const SetContactoLeidaStatusSchema = {
  id: Joi.number()
    .min(0)
    .required()
    .error((errors) => {
      return customErrorMessages.default(errors);
    }),
  leida: Joi.boolean()
    .required()
    .error((errors) => {
      return customErrorMessages.default(errors);
    }),
};

export const SetContactoDestacadoStatusSchema = {
  id: Joi.number()
    .min(0)
    .required()
    .error((errors) => {
      return customErrorMessages.default(errors);
    }),
  destacado: Joi.boolean()
    .required()
    .error((errors) => {
      return customErrorMessages.default(errors);
    }),
};