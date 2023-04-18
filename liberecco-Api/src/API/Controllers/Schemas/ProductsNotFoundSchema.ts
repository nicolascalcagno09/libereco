import * as Joi from 'joi';
import * as customErrorMessages from '../../Common/BaseErrorsSchema';

export const StoreProductsNotFoundSchema = {
  // sample: Joi.string()
  //   .min(3)
  //   .max(150)
  //   .required()
  //   .error((errors) => {
  //     return customErrorMessages.default(errors);
  //   }),
};


export const UpdateProductsNotFoundSchema = {
  id: Joi.number()
    .min(0)
    .required()
    .error((errors) => {
      return customErrorMessages.default(errors);
    }),
};
