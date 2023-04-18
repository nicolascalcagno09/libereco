import * as Joi from 'joi';
import * as customErrorMessages from '../../Common/BaseErrorsSchema';

export const MODEL_REFERENCE_LENGTH = 6;


export const StoreModelSchema = {
  reference: Joi.string()
    .length(6)
    .regex(/^\d{6}$/)
    .required()
    .error((errors) => {
      const custom = customErrorMessages.default(errors, { pattern: '000000' });
      return custom;
    }),
  color: Joi.object().keys({
    id: Joi.number()
      .integer()
      .positive()
      .required()
      .error((errors) => {
        const custom = customErrorMessages.default(errors);
        return custom;
      }),
  }),
  domainSize: Joi.object().keys({
    id: Joi.number()
      .integer()
      .positive()
      .required()
      .error((errors) => {
        const custom = customErrorMessages.default(errors, { pattern: '000000' });
        return custom;
      }),
  })
    .optional()
    .error((errors) => {
      const custom = customErrorMessages.default(errors);
      return custom;
    }),
};


export const UpdateModelSchema = {
  id: Joi.number()
    .min(0)
    .optional()
    .error((errors) => {
      return customErrorMessages.default(errors);
    }),
  reference: Joi.string()
    .length(6)
    .regex(/^\d{6}$/)
    .optional()
    .error((errors) => {
      const custom = customErrorMessages.default(errors, { pattern: '000000' });
      return custom;
    }),
  color: Joi.object().keys({
    id: Joi.number()
      .integer()
      .positive()
      .required()
      .error((errors) => {
        const custom = customErrorMessages.default(errors);
        return custom;
      }),
  }),
  domainSize: Joi.object().keys({
    id: Joi.number()
      .integer()
      .positive()
      .required()
      .error((errors) => {
        const custom = customErrorMessages.default(errors, { pattern: '000000' });
        return custom;
      }),
  })
    .optional()
    .error((errors) => {
      const custom = customErrorMessages.default(errors);
      return custom;
    }),
};
