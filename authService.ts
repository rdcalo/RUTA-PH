// authService.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    UserCredential
} from 'firebase/auth';
import {
    collection,
    doc,
    DocumentData,
    getDocs,
    query,
    QuerySnapshot,
    setDoc,
    where
} from 'firebase/firestore';
import { auth, db } from './firebaseConfig';

// User types
export type UserType = 'driver' | 'commuter';

export interface UserData {
  uid: string;
  email: string;
  username: string;
  fullName?: string;
  userType: UserType;
  phoneNumber?: string;
  // Add any other fields you need
}

/**
 * Register a new user (Driver or Commuter)
 */
export const registerUser = async (
  email: string,
  password: string,
  username: string,
  userType: UserType,
  additionalData?: any
): Promise<{ success: boolean; error?: string }> => {
  try {
    // Check if username already exists
    const usernameExists = await checkUsernameExists(username, userType);
    if (usernameExists) {
      return { success: false, error: 'Username already exists' };
    }

    // Create user in Firebase Auth
    const userCredential: UserCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;

    // Prepare user data
    const userData: UserData = {
      uid: user.uid,
      email: email,
      username: username,
      userType: userType,
      ...additionalData
    };

    // Save user data to Firestore
    const collectionName = userType === 'driver' ? 'drivers' : 'commuters';
    await setDoc(doc(db, collectionName, user.uid), userData);

    // Store user data locally
    await AsyncStorage.setItem('userToken', user.uid);
    await AsyncStorage.setItem('userType', userType);
    await AsyncStorage.setItem('userData', JSON.stringify(userData));

    return { success: true };
  } catch (error: any) {
    console.error('Registration error:', error);
    let errorMessage = 'An error occurred during registration';

    if (error.code === 'auth/email-already-in-use') {
      errorMessage = 'This email is already registered';
    } else if (error.code === 'auth/weak-password') {
      errorMessage = 'Password should be at least 6 characters';
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = 'Invalid email format';
    }

    return { success: false, error: errorMessage };
  }
};

/**
 * Login user (Driver or Commuter)
 */
export const loginUser = async (
  username: string,
  password: string,
  userType: UserType
): Promise<{ success: boolean; error?: string; userData?: UserData }> => {
  try {
    // Find user by username in Firestore
    const collectionName = userType === 'driver' ? 'drivers' : 'commuters';
    const usersRef = collection(db, collectionName);
    const q = query(usersRef, where('username', '==', username));
    const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);

    if (querySnapshot.empty) {
      return { success: false, error: "Username or password doesn't exist" };
    }

    // Get user data
    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data() as UserData;

    // Sign in with Firebase Auth using email
    const userCredential: UserCredential = await signInWithEmailAndPassword(
      auth,
      userData.email,
      password
    );

    // Store user data locally
    await AsyncStorage.setItem('userToken', userCredential.user.uid);
    await AsyncStorage.setItem('userType', userType);
    await AsyncStorage.setItem('userData', JSON.stringify(userData));

    return { success: true, userData };
  } catch (error: any) {
    console.error('Login error:', error);
    let errorMessage = "Username or password doesn't exist";

    if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
      errorMessage = "Username or password doesn't exist";
    } else if (error.code === 'auth/too-many-requests') {
      errorMessage = 'Too many failed attempts. Please try again later';
    }

    return { success: false, error: errorMessage };
  }
};

/**
 * Logout user
 */
export const logoutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('userType');
    await AsyncStorage.removeItem('userData');
  } catch (error) {
    console.error('Logout error:', error);
  }
};

/**
 * Check if username exists
 */
export const checkUsernameExists = async (
  username: string,
  userType: UserType
): Promise<boolean> => {
  try {
    const collectionName = userType === 'driver' ? 'drivers' : 'commuters';
    const usersRef = collection(db, collectionName);
    const q = query(usersRef, where('username', '==', username));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  } catch (error) {
    console.error('Error checking username:', error);
    return false;
  }
};

/**
 * Get current user data from AsyncStorage
 */
export const getCurrentUser = async (): Promise<UserData | null> => {
  try {
    const userDataString = await AsyncStorage.getItem('userData');
    if (userDataString) {
      return JSON.parse(userDataString);
    }
    return null;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};