import Exception from './Exception';

export default class UserRegistrationOutputExistException extends Exception {


  constructor(message?: string) {
    super(message);
    this.personalized = true;
    this.httpStatus = 431;
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = UserRegistrationOutputExistException.name;
    this.message = message;
  }
}
