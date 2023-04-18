export default class InvalidCurrentPasswordException extends Error {
    httpStatus = 401;
  
    constructor(message?: string) {
      super(message);
      Object.setPrototypeOf(this, new.target.prototype);
      this.name = InvalidCurrentPasswordException.name;
      this.message = message;
    }
  }