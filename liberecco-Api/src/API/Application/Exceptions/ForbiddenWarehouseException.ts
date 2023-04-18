import Exception from './Exception';

export default class ForbiddenWarehouseException extends Exception {


  constructor(message?: string) {
    super(message);
    this.personalized = true;
    this.httpStatus = 403;
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = ForbiddenWarehouseException.name;
    this.message = message;
  }
}
