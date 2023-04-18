export function success(data, msg: string, status: number) {
  return {
    data,
    message: msg,
    code: status,
  };
}

export function successDeleted(msg: string, status: number) {
  return {
    message: msg,
    code: status,
  };
}
/**
* This fucntion is replaced by ErrorHandler
* @deprecated
*/
export function error(data, msg: string, status: number) {
  return {
    errors: data,
    message: msg,
    code: status,
  };
}
