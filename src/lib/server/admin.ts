import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { FB_PRIVATE_KEY, FB_CLIENT_EMAIL, FB_PROJECT_ID } from '$env/static/private';
import pkg from 'firebase-admin';

interface FirebaseCredentials {
  projectId: string;
  privateKey: string;
  clientEmail: string;
}

try {
  const firebaseConfig: FirebaseCredentials = {
    projectId: FB_PROJECT_ID,
    privateKey: FB_PRIVATE_KEY.replace(/\\n/g, '\n'),
    clientEmail: FB_CLIENT_EMAIL,
  };
  pkg.initializeApp({
    credential: pkg.credential.cert(firebaseConfig),
  });
} catch (err: any) {
  if (!/already exists/u.test(err.message)) {
    console.error('Firebase admin initialization error', err.stack);
  }
}

export const adminDB = getFirestore();
export const adminAuth = getAuth();
