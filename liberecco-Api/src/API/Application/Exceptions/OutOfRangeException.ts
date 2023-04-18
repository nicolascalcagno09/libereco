import Exception from './Exception';

export default class OutOfRangeException extends Exception {

  constructor(message?: string) {
    super(message);
    this.personalized = true;
    this.httpStatus = 400;
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = OutOfRangeException.name;
    this.message = message;
  }

}
