import * as Joi from 'joi';
import * as customErrorMessages from '../../Common/BaseErrorsSchema';

export const getResetPasswordLinkSchema = {
  email: Joi.string()
    .email()
    .required()
    .error((errors) => {
      return customErrorMessages.default(errors);
    }),
};

export const storeNewResetPasswordSchema = {
  token: Joi.string()
    .required()
    .error((errors) => {
      return customErrorMessages.default(errors);
    }),
  new_password: Joi.string()
    .required()
    .error((errors) => {
      return customErrorMessages.default(errors);
    }),
  old_password: Joi.string()
    .required()
    .error((errors) => {
      return customErrorMessages.default(errors);
    }),
};
