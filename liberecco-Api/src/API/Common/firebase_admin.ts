import dotenv from 'dotenv';
import admin, { ServiceAccount } from 'firebase-admin'
import serviceAccount from '../Config/storage';

import * as functions from 'firebase-functions';

dotenv.config();

admin.initializeApp({
  credential: admin.credential.cert(<ServiceAccount>serviceAccount),
  databaseURL: process.env.DATABASE_URL
});

export const auth = admin.auth();

const db = admin.database();
export const adminFirestore = admin.firestore();

// export const webApi=functions.https.onRequest(main)

export async function verifyToken(
  request: functions.Request): Promise<any> {
  try {
    const token: string | undefined = await getToken(request);

    if (!token) {
      return false;
    }

    const payload: admin.auth.DecodedIdToken =
      await admin.auth().verifyIdToken(token);
    return {payload,token};
  } catch (err) {
    return false;
  }
}
async function getToken(request: functions.Request):
  Promise<string | undefined> {
  if (!request.headers.authorization) {
    return undefined;
  }

  const token: string =
    request.headers.authorization.replace(/^Bearer\s/, '');

  return token;
}

