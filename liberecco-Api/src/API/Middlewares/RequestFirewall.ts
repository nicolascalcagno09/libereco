import crypto from 'crypto';
import * as _ from 'lodash';
import dotenv from 'dotenv';
import SameRequestInAShortPeriod from '../Application/Exceptions/SameRequestInAShortPeriod';
import express from 'express';

dotenv.config();

const timeBeetweenRequests = process.env['TIME_BETWEEN_REQUESTS_NS'];
const timeToLive = timeBeetweenRequests ?
  Number(timeBeetweenRequests) :
  1000000000;

function getRequestSignature(req) {
  const requestSource = `${req.ip}`
  const requestString = `${req.method} ${req.originalUrl}`;
  //console.log("aqui", `${req.method} ${req.originalUrl}`);
  const requestHeaderString = `${req.headers.host} ${req.headers['user-agent']} ${req.headers.authorization}`;
  const body = `${JSON.stringify(req.body)} ${JSON.stringify(req.params)}`;
  const requestIdentifier = `${requestSource} ${requestString} ${requestHeaderString} ${body}`;
  const hash = crypto.createHash('md5').update(requestIdentifier).digest('hex');
  //console.log(hash);
  return hash;
}

function clearBuffer(app) {
  if (!app.locals.buffer) app.locals.buffer = [];
  app.locals.buffer = app.locals.buffer.filter((buffer) => {
    const timeDiff = process.hrtime(buffer.createdAt);
    //console.log(timeDiff, timeDiff[0] * (10 ** 9) + timeDiff[1], [timeToLive / (10 ** 9), (timeToLive % 10 ** 9)]);
    return (timeDiff[0] * (10 ** 9) + timeDiff[1] <= timeToLive);
  });

  return app.locals.buffer;
}

function requestExists(reqSignature, buffer) {
  return buffer.find((reqIden) => reqIden.signature == reqSignature);
}



export default async function requestFirewall(req, res, next) {
  req.app.locals.buffer = clearBuffer(req.app);

  const createdAt = process.hrtime();
  const signature = getRequestSignature(req);

  const requestIdentifier = {
    createdAt,
    signature,
  }

  if (requestExists(signature, req.app.locals.buffer)) {
    return next(new SameRequestInAShortPeriod());
  }

  req.app.locals.buffer.push(requestIdentifier);
  next();
}



