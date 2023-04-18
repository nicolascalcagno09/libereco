import Exception from './Exception';

export default class InvalidContainerCode extends Exception {

  constructor(message?: string) {
    super(message);
    this.personalized = true;
    this.httpStatus = 422;
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = InvalidContainerCode.name;
    this.code = 422;
    this.message = message;
  }
}
