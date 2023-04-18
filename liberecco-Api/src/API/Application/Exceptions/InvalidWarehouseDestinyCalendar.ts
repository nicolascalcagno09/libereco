import Exception from './Exception';

export default class InvalidWarehouseDestinyCalendar extends Exception {

  constructor(message?: string) {
    super(message);
    this.personalized = true;
    this.httpStatus = 422;
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = InvalidWarehouseDestinyCalendar.name;
    this.message = message;
  }
}
