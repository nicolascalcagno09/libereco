export default class Exception extends Error {

  public httpStatus;
  public errors;
  public message;
  public code;
  public personalized: boolean = false;

  constructor(message) {
    super(message);
    this.httpStatus = 400;
    this.message = message;
  }

  public setHttpStatus(statusCode){
    this.httpStatus = statusCode;
  }
  
  public getHttpStatus(){
    return this.httpStatus;
  }

  public toJSON() {
    return {
      code: this.code ? this.code : this.httpStatus,
      errors: this.errors ? this.errors : this.name,
      message: this.message,
    };
  }
}
