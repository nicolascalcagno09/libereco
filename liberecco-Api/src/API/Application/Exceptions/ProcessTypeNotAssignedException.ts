import Exception from './Exception';

export default class ProcessTypeNotAssigned extends Exception {
  public httpStatus;

  constructor(message?: string) {
    super(message);
    this.httpStatus = 400;
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = ProcessTypeNotAssigned.name;
    this.message = message;
  }
}
