// firebase/authService.ts
import {
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  signInWithEmailAndPassword,
  User,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "./config";

// --------------------
// Types
// --------------------
export interface DriverData {
  uid?: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  driversLicense: string;
  vehicleDetails: string;
  plateNumber: string;
  role: "driver";
  verified?: boolean;
  [key: string]: any;
}

export interface CommuterData {
  uid?: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  role: "commuter";
  [key: string]: any;
}

// --------------------
// Sign Up Driver
// --------------------
export const signUpDriver = async (data: DriverData & { password: string }): Promise<User> => {
  const { email, password, ...extraData } = data;
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  await setDoc(doc(db, "drivers", user.uid), {
    uid: user.uid,
    email: user.email,
    role: "driver",
    verified: false,
    ...extraData,
  });

  return user;
};

// --------------------
// Sign Up Commuter
// --------------------
export const signUpCommuter = async (data: CommuterData & { password: string }): Promise<User> => {
  const { email, password, ...extraData } = data;
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  await setDoc(doc(db, "commuters", user.uid), {
    uid: user.uid,
    email: user.email,
    role: "commuter",
    ...extraData,
  });

  return user;
};

// --------------------
// Sign In
// --------------------
export const signIn = async (email: string, password: string): Promise<User> => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

// --------------------
// Sign Out
// --------------------
export const signOutUser = async (): Promise<void> => {
  await firebaseSignOut(auth);
};

// --------------------
// Get User Data
// --------------------
export const getUserData = async (
  uid: string,
  role?: "driver" | "commuter"
): Promise<DriverData | CommuterData | null> => {
  if (role) {
    const ref = doc(db, role === "driver" ? "drivers" : "commuters", uid);
    const snap = await getDoc(ref);
    return snap.exists() ? (snap.data() as DriverData | CommuterData) : null;
  }

  const driverSnap = await getDoc(doc(db, "drivers", uid));
  if (driverSnap.exists()) return driverSnap.data() as DriverData;

  const commuterSnap = await getDoc(doc(db, "commuters", uid));
  if (commuterSnap.exists()) return commuterSnap.data() as CommuterData;

  return null;
};
