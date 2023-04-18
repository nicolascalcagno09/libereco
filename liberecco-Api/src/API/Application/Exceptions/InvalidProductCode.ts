import Exception from './Exception';

export default class InvalidProductCode extends Exception {

  constructor(message?: string) {
    super(message);
    this.personalized = true;
    this.httpStatus = 422;
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = InvalidProductCode.name;
    this.message = message;
  }
}
