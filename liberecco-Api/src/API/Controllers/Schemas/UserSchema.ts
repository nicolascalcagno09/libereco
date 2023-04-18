import * as Joi from 'joi';
import * as customErrorMessages from '../../Common/BaseErrorsSchema';

export const StoreUserSchema = {
  nombre: Joi.string()
    .min(3)
    .max(150)
    .required()
    .error((errors) => {
      return customErrorMessages.default(errors);
    }),
  email: Joi.string()
    .required()
    .error((errors) => {
      return customErrorMessages.default(errors);
    }),
  password: Joi.string()
    .min(6)
    .required()
    .error((errors) => {
      return customErrorMessages.default(errors);
    }),
  address: Joi.string()
    .optional()
    .error((errors) => {
      return customErrorMessages.default(errors);
    }),
  phone: Joi.number()
    .optional()
    .error((errors) => {
      return customErrorMessages.default(errors);
    }),
  perfil: Joi.string()
    .required()
    .error((errors) => {
      return customErrorMessages.default(errors);
    }),
};

export const UpdateUserSchema = {
  email: Joi.string()
    .required()
    .error((errors) => {
      return customErrorMessages.default(errors);
    }),
  address: Joi.string()
    .optional()
    .error((errors) => {
      return customErrorMessages.default(errors);
    }),
  phone: Joi.number()
    .optional()
    .error((errors) => {
      return customErrorMessages.default(errors);
    }),
  perfil: Joi.string()
    .required()
    .error((errors) => {
      return customErrorMessages.default(errors);
    }),
};

export const getUserByIdSchema = {
  id: Joi.number()
    .integer()
    .min(1)
    .required()
    .error((errors) => {
      return customErrorMessages.default(errors);
    }),
};

export const AssignUsersProcessesSchema = {
  users: Joi.array().items(Joi.object().keys({
    id: Joi.number().integer().required(),
    processes: Joi.array().items(Joi.number().integer()),
  }))
    .required()
    .error((errors) => {
      return customErrorMessages.default(errors);
    }),
};

export const CheckUserIdSchema = {
  id: Joi.number()
    .positive()
    .integer()
    .required()
    .error((errors) => {
      return customErrorMessages.default(errors);
    }),
}
