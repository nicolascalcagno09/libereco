export default class EmptyResultAssociation extends Error {

  public httpStatus;
  public errors;
  public message;
  public code;
  public personalized: boolean = false;

  constructor(message) {
    super(message);
    this.httpStatus = 204;
  }

  public toJSON() {
    return {
      code: this.code ? this.code : this.httpStatus,
      errors: this.errors ? this.errors : this.name,
      message: this.message,
    };
  }
}
