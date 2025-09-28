import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDEQrQc7VWKdNdtl1O8GH-XgCgYsdPRXjg",
  authDomain: "ruta-ph-13891.firebaseapp.com",
  databaseURL: "https://ruta-ph-13891-default-rtdb.firebaseio.com",
  projectId: "ruta-ph-13891",
  storageBucket: "ruta-ph-13891.appspot.com",
  messagingSenderId: "816971525037",
  appId: "1:816971525037:web:eb22aa84a870194155cf24",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth
export const auth = getAuth(app);

// Firestore
export const db = getFirestore(app);

export default app;
