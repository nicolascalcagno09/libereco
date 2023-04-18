import Exception from './Exception';

export default class PreconditionRequiredException extends Exception {


  constructor(message?: string) {
    super(message);
    this.personalized = true;
    this.httpStatus = 428;
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = PreconditionRequiredException.name;
    this.message = message;
  }
}
