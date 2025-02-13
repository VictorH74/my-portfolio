import * as admin from 'firebase-admin';

import { credential } from 'firebase-admin';
import { initializeApp } from 'firebase-admin/app';

const serviceAccount = JSON.parse(
    process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string
);

if (!admin.apps.length) {
    initializeApp({
        credential: credential.cert(serviceAccount),
    });
}

export const adminSDK = admin;
