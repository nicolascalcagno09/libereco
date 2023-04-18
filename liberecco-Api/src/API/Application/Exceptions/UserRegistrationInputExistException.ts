import Exception from './Exception';

export default class UserRegistrationInputExistException extends Exception {


  constructor(message?: string) {
    super(message);
    this.personalized = true;
    this.httpStatus = 430;
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = UserRegistrationInputExistException.name;
    this.message = message;
  }
}
