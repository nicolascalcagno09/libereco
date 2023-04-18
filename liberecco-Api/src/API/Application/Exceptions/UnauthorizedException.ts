import Exception from './Exception';

export default class UnauthorizedException extends Exception {


  constructor(message?: string) {
    super(message);
    this.personalized = true;
    this.httpStatus = 401;
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = UnauthorizedException.name;
  }
}
