const ER_DUP_ENTRY = 1062;
const ER_NO_REFERENCED_ROW_2 = 1452;
const os = require("os");

import { sendSlack } from '../Common/SendSlack';
import DuplicatedEntryException from '../Application/Exceptions/DuplicatedEntryException';
import Responses from '../Common/Responses';
import { logObjectToString } from '../Common/Utils';

export default async function errorHandler(err, req, res, next) {
  let error = err;
  console.log(req);
  if (err) {

    const parseIp = req.headers['x-forwarded-for']?.split(',').shift() || req.socket?.remoteAddress;

    let errorLog =
      "Details: \n" +
      `HOST ==> ${os.hostname()}\n` +
      `Remote_IP ==> ${parseIp}\n`+
      `Endpoint ==> ${truncate(req.url, 200)}\n` +
      `Req_Method ==> ${req.method}\n` +
      `Req_Qs ==> ${JSON.stringify(req.query) || ""}\n` +
      `Req_Body ==> ${JSON.stringify(req.body) || ""}\n` +
      `Response_Code ==> ${err.httpStatus ? err.httpStatus : 400}\n` +
      `Response_Status ==> "ERROR"\n` +
      `Error_Message ==> ${logObjectToString(err)}\n`+
      `Internal_Error_stack ==> ${logObjectToString(err.stack)}\n`;

    if(req.user){
      errorLog = errorLog+`User_Id ==> ${req.user.id}\n`+
      `User_Name ==> ${req.user.nombre}\n`
    }


    sendSlack("Libereco Alert", errorLog, "/services/T9FN6A9CJ/B03EAC89GKY/AALB0SNSsUn3AaI5oh66c7fX")
    return await Responses(err, res);
  } else {
    return next();
  }


}


function truncate(str, n) {
  if (!str || typeof str !== "string") {
    return undefined;
  }

  return (str.length > n) ? str.substr(0, n - 1) + "..." : str;
}