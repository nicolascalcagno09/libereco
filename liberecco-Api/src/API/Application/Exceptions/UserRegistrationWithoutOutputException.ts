import Exception from './Exception';

export default class UserRegistrationWithoutOutputException extends Exception {


  constructor(message?: string) {
    super(message);
    this.personalized = true;
    this.httpStatus = 429;
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = UserRegistrationWithoutOutputException.name;
    this.message = message;
  }
}
