// firebase/firebaseConfig.ts
// This file connects your app to Firebase

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// 🔥 STEP 1: Replace this with YOUR config from Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyBfcWzulouby2Ax6bgB0xtQstwiJhb6pqI",
  authDomain: "finalruta-ph.firebaseapp.com",
  projectId: "finalruta-ph",
  storageBucket: "finalruta-ph.firebasestorage.app",
  messagingSenderId: "1064199542381",
  appId: "1:1064199542381:web:489140245aeb1e1d8d9164"
};


// 🔥 STEP 2: This starts Firebase
const app = initializeApp(firebaseConfig);

// 🔥 STEP 3: These let us use Firebase features
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;