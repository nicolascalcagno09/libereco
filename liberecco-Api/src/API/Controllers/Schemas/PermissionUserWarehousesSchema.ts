import * as Joi from 'joi';
import * as customErrorMessages from '../../Common/BaseErrorsSchema';

export const permissionUserWahousesSchema = {
  user: Joi.object()
    .required()
    .error((errors) => {
      return customErrorMessages.default(errors);
    }),
};

export const UserIdSchema = {
  userId: Joi.number()
    .positive()
    .integer()
    .required()
    .error((errors) => {
      return customErrorMessages.default(errors);
    }),
};

export const permissionAdminUserWahouseSchema = {
  user: Joi.object()
    .required()
    .error((errors) => {
      return customErrorMessages.default(errors);
    }),
  warehouse: Joi.object()
    .required()
    .error((errors) => {
      return customErrorMessages.default(errors);
    }),
};
