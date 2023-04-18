import Exception from './Exception';

export default class SameRequestInAShortPeriod extends Exception {
  public name;
  public httpStatus = 403;
  public code;
  constructor(request? : any , code?: any) {
    super(request);
    this.personalized = true;
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = SameRequestInAShortPeriod.name;
    this.code = code ? code : this.httpStatus;
  }
}
