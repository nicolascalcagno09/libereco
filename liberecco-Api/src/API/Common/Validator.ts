import * as Joi from 'joi';
import RequiredFieldException from '../Application/Exceptions/RequiredFieldException';

export default class Validator {
  public validate(data, schema) {
    const validationsOptions = { abortEarly: false, allowUnknown: true };

    const { error } = Joi.validate(
      data,
      schema,
      validationsOptions,
    );

    if(error) {
      const details = this.validationResult(error.details)
      details._object = error._object;
      throw new RequiredFieldException(details);
    }

    return error;
  }

  validationResult(errors) {
    const usefulErrors = {
      errors: {},
      message: 'InvalidArgumentException',
      code: 400,
      context: errors.context,
      _object: undefined,
    };

    errors.map((error) => {
      if (!usefulErrors.errors.hasOwnProperty(error.path.join('_'))) {
        usefulErrors.errors[error.path.join('_')] = {
          field: error.path.join('_'),
          type: error.type,
          message: error.message,
        };
      }
    });

    return usefulErrors;
  }
}
