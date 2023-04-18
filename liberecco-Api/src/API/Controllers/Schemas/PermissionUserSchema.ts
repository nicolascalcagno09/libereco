import * as Joi from 'joi';
import * as customErrorMessages from '../../Common/BaseErrorsSchema';

export const UserIdPermissionsUserSchema = {
  userId: Joi.number()
    .required()
    .error((errors) => {
      return customErrorMessages.default(errors);
    }),
};

export const StorePermissionUserSchema = {
  userId: Joi.number()
    .required()
    .error((errors) => {
      return customErrorMessages.default(errors);
    }),
  permissionId: Joi.number()
    .required()
    .error((errors) => {
    return customErrorMessages.default(errors);
    }),
};

export const StorePermissionUserByProcessTypeSchema = {
  userId: Joi.number()
    .required()
    .error((errors) => {
      return customErrorMessages.default(errors);
    }),
  processTypeId: Joi.number()
    .required()
    .error((errors) => {
    return customErrorMessages.default(errors);
    }),
};

export const AssignAllPermissionsUserSchema = {
  user: Joi.object()
    .required()
    .error((errors) => {
    return customErrorMessages.default(errors);
    }),
};
