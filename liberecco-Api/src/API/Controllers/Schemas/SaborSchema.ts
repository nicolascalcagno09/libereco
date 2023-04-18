import * as Joi from 'joi';
import * as customErrorMessages from '../../Common/BaseErrorsSchema';

export const StoreSaborSchema = {
  // sample: Joi.string()
  //   .min(3)
  //   .max(150)
  //   .required()
  //   .error((errors) => {
  //     return customErrorMessages.default(errors);
  //   }),
};


export const UpdateSaborSchema = {
  id: Joi.number()
    .min(0)
    .required()
    .error((errors) => {
      return customErrorMessages.default(errors);
    }),
};

export const UpsertSaborSchema = {
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


export const SetSabroActiveStatusSchema = {
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
