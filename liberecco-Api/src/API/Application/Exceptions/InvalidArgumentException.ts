export default class InvalidArgumentException extends Error {
  httpStatus = 400;

  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = InvalidArgumentException.name;
    this.message = message;
  }
}
