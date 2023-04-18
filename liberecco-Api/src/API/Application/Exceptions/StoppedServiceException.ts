import Exception from './Exception';

export default class StoppedServiceException extends Exception {


  constructor(message?: string) {
    super(message);
    this.personalized = true;
    this.httpStatus = 405;
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = StoppedServiceException.name;
    this.message = message;
  }
}
