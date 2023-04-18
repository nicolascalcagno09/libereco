import Log from '../Application/Domain/Entities/Log/Log'

function hrtime2number(hrtime){
  return hrtime[0] + hrtime[1] / 1e9;
}

const BYTES_SCALE_FACTOR = 1024;
const LOG_MAX_FIELD_LENGTH = 54000;
const DATA_TOO_LONG_FLAG = '=== Removed data: TOO LONG ===';

export async function startLogging(req){
  const log = new Log({
    request : req,
    startHrTime : process.hrtime(),
    token : req.token,
    client : req.token ? req.token.client : undefined,
    url: req.url,
    method : req.method,
    sendSizeKB : String(JSON.stringify(req.body)).length / BYTES_SCALE_FACTOR,
  });

  log.request.body = String(JSON.stringify(log.request.body)).length < LOG_MAX_FIELD_LENGTH ? log.request.body : (String(log.request.body).substr(0, LOG_MAX_FIELD_LENGTH - DATA_TOO_LONG_FLAG.length) + DATA_TOO_LONG_FLAG);

  return log.save();
}

export async function endLogging(log, res, data : string){
  log.elapsedTimeInS = hrtime2number(process.hrtime(log.startHrTime));
  log.response = res;
  const body = !data ? '' :
      (data.length < LOG_MAX_FIELD_LENGTH ? data : 
      (data.substr(0, LOG_MAX_FIELD_LENGTH - DATA_TOO_LONG_FLAG.length) + DATA_TOO_LONG_FLAG));
  
  log.response.body = body;
  log.receiveSizeKB = data? JSON.stringify(data).length / BYTES_SCALE_FACTOR: undefined;

  return log.save();
}

export async function createLog(req,res,data,startHrTime){
  const elapsedHrTime = process.hrtime(startHrTime);
  const elapsedTimeInMs = hrtime2number(elapsedHrTime);
  const LOG_MAX_FIELD_LENGTH = 65535;
  const DATA_TOO_LONG_FLAG = '=== Removed data: TOO LONG ===';

  const log = new Log({
    request : req,
    response : res,
    token : req.token,
    client : req.token ? req.token.client : undefined,
    elapsedTimeInS : elapsedTimeInMs,
    url: req.url,
    method : req.method,
    receiveSize: JSON.stringify(data).length,
    sendSize : JSON.stringify(req.body).length,
  });

  log.response.body = JSON.stringify(data).length < LOG_MAX_FIELD_LENGTH ? data : (data.substr(0, LOG_MAX_FIELD_LENGTH - DATA_TOO_LONG_FLAG.length) + DATA_TOO_LONG_FLAG);
  log.request.body = JSON.stringify(log.request.body).length < LOG_MAX_FIELD_LENGTH ? log.request.body : (data.substr(0, LOG_MAX_FIELD_LENGTH - DATA_TOO_LONG_FLAG.length) + DATA_TOO_LONG_FLAG);

  return log.save();
}

export async function logRequest(req, res, next) {
  const startHrTime = process.hrtime();

  var oldSend = res.send;

  res.send = function(data){
    createLog(req,res,data,startHrTime)
    .then((log) => {
      oldSend.apply(res, arguments);
    })
    .catch((err) => {
      oldSend.apply(res, arguments);
    });
  }
  next();
}
