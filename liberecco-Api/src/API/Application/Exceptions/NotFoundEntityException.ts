import Exception from './Exception';

export default class NotFoundEntityException extends Exception {


  constructor(message?: string) {
    super(message);
    this.personalized = true;
    this.httpStatus = 404;
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = NotFoundEntityException.name;
    this.message = message;
  }
}
