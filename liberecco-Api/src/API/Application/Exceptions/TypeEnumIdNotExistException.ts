import Exception from './Exception';

export default class TypeEnumIdNotExistException extends Exception {


  constructor(message?: string) {
    super(message);
    this.personalized = true;
    this.httpStatus = 433;
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = TypeEnumIdNotExistException.name;
    this.message = message;
  }
}
