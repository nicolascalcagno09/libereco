import * as Joi from 'joi';
import * as customErrorMessages from '../../Common/BaseErrorsSchema';




export const ReferenceSchema = {
  reference: Joi.number()
    .positive()
    .integer()
    .allow(0)
    .required()
    .error((errors) => {
      return customErrorMessages.default(errors);
    }),
};
