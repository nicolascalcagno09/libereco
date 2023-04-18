import Exception from './Exception';

export default class NotFoundPermissionWarehouse extends Exception {
  public httpStatus;

  constructor(message?: string) {
    super(message);
    this.httpStatus = 401;
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = NotFoundPermissionWarehouse.name;
    this.message = message;
  }
}
