import Exception from './Exception';

export default class InvalidReferenceException extends Exception {
  httpStatus = 400;

  constructor(message?: string, pattern? ) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = InvalidReferenceException.name;
    this.message = message;
  }
}
