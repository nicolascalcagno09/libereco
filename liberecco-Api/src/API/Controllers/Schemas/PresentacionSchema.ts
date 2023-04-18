import * as Joi from 'joi';
import * as customErrorMessages from '../../Common/BaseErrorsSchema';

export const StorePresentacionSchema = {
  // sample: Joi.string()
  //   .min(3)
  //   .max(150)
  //   .required()
  //   .error((errors) => {
  //     return customErrorMessages.default(errors);
  //   }),
};


export const UpdatePresentacionSchema = {
  id: Joi.number()
    .min(0)
    .required()
    .error((errors) => {
      return customErrorMessages.default(errors);
    }),
};

export const UpsertPresentacionSchema = {
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

export const SetPresentacionActiveStatusSchema = {
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
