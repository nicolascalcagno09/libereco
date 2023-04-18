/**
 * Custom Response JSON for all Results Application
 * @param data
 * @param message
 * @param code
 */
export default function jsonResult(data, message: string, code: number) {
  return {
    data,
    message,
    code,
  };
}