export default class ExceededNumberException extends Error {
  httpStatus = 400;

  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = ExceededNumberException.name;
    this.message = message;
  }
}
