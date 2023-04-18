import Exception from './Exception';

export default class ActionNotAllowedException extends Exception {


  constructor(message?: string) {
    super(message);
    this.personalized = true;
    this.httpStatus = 405;
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = ActionNotAllowedException.name;
    this.message = message;
  }
}
