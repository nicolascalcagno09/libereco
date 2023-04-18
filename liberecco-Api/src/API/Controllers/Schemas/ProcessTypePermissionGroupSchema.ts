import * as Joi from 'joi';
import * as customErrorMessages from '../../Common/BaseErrorsSchema';

export const StoreProcessTypePermissionGroupSchema = {
  processTypeId: Joi.number()
    .optional()
    .error((errors) => {
      return customErrorMessages.default(errors);
    }),
  permissionGroupId: Joi.number()
    .required()
    .error((errors) => {
      return customErrorMessages.default(errors);
    }),
};
