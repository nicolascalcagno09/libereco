
const axios = require('axios').default;
import * as _ from 'lodash';
import { asyncForEach } from './AsyncForeach';

export async function generatePushNotification(tokens: string | string[], notiPayload: INotification) {
  const serverKey = process.env.FCM_SERVER_KEY || 'AAAAc-T_bDc:APA91bE52hTC0xbmb9vzBQi-6PxmSRoOik4ig_E7R6FBpvHu9mQwWaXl3BuK4UMcSl0a5C3Rqj0MDghtNatV0OBUS43_HAbbVNQ0VjebXyY7iUkPSSZkPwaToNMjxs4mkYNHWCJ8iw33'

  let payload: INotificationPayload = {
    "notification": {
      "title": notiPayload.title,
      "body": notiPayload.body,
      "subtitle": notiPayload.subtitle
    }
  };

  if (!Array.isArray(tokens)) {
    tokens = [tokens];
  }

  let chunkTokens = _.chunk(tokens, 1);

  await asyncForEach(chunkTokens, async tokens => {
    try {
      payload['registration_ids'] = tokens;

      await axios({
        url: 'https://fcm.googleapis.com/fcm/send',
        method: 'POST',
        timeout: 8000,
        data: payload,
        headers: {
          "Host": "fcm.googleapis.com",
          "Authorization": `key=${serverKey}`,
          "Content-Type": "application/json"
        }
      }).then(function (res) {
        console.dir(res); // we are good here, the res has the JSON data
        return res;
      }).catch(function (err) {
        console.error(err);
      })
    }
    catch (err) {
      console.error(err);
    }
  });

}

export interface INotification {
  title: string;
  body: string;
  subtitle: string;
}

export interface INotificationPayload {
  to?: string;
  registration_ids?: string;
  collapse_key?: string;
  notification: INotification;
  data?: Object;
}