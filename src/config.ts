const admin = require('firebase-admin');

const firebaseConfig = {
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY,
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
};

admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
});

export const db = admin.firestore();
export const bucket = admin.storage().bucket();
