import Exception from './Exception';

export default class RequiredFieldException extends Exception {

  public errors;
  public message;
  public code;
  public context;
  private _object;

  constructor(message: { errors, message, code, context?, _object?}) {
    super(message.message);
    this.personalized = true;
    this.errors = message.errors ? message.errors : undefined;
    this.message = message.errors ? message.errors : message;
    this.code = message.code ? message.code : undefined;
    this.context = message.context ? message.context : undefined;
    this._object = message._object ? message._object : undefined;
    //
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = RequiredFieldException.name;
    this.message = message;
  }
}
