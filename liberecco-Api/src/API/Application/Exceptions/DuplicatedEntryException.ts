import Exception from './Exception';

export default class DuplicatedEntryException extends Exception {
  public name;
  public httpStatus;
  public code;
  constructor(message?: string, code?: any) {
    super(message);
    this.personalized = true;
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = DuplicatedEntryException.name;
    this.httpStatus = 409;
    this.code = code ? code : this.httpStatus;
    this.message = message;
  }

  toJSON() {
    return {
      code: this.code,
      errors: this.errors,
      message: this.message,
    }
  }
}
