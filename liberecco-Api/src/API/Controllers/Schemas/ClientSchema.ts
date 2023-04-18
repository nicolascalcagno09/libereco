import * as Joi from 'joi';
import * as customErrorMessages from '../../Common/BaseErrorsSchema';

export const storeClientSchema = {
  name: Joi.string()
    .required()
    .error((errors) => {
      return customErrorMessages.default(errors);
    }),
  secret: Joi.string()
    .required()
    .error((errors) => {
      return customErrorMessages.default(errors);
    }),
};