import Exception from './Exception';

export default class NotWarehouseAssociatedException extends Exception {

  constructor(message?: string) {
    super(message);
    this.personalized = true;
    this.httpStatus = 404;
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = NotWarehouseAssociatedException.name;
    this.message = message;
  }
}
