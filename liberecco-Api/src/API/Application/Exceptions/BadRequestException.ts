import Exception from './Exception';

export default class BadRequestException extends Exception {


  constructor(message?: string) {
    super(message);
    this.personalized = true;
    this.httpStatus = 400;
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = BadRequestException.name;
    this.message = message;
  }
}
