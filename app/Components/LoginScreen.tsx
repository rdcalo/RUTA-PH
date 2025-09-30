// app/Components/LoginScreen.tsx
// This component handles login with Firebase and error handling

import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth, db } from '../../firebase/firebaseConfig';

const LoginScreen = () => {
  const router = useRouter();
  
  // These hold the login form data
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // This function runs when user clicks "Sign In"
  const handleLogin = async () => {
    // 🔍 STEP 1: Check if fields are filled
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    // 🔍 STEP 2: Check if email format is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    // ⏳ Show loading spinner
    setLoading(true);

    try {
      // 🔥 STEP 3: Try to sign in with Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 🔥 STEP 4: Check if user is a commuter or driver
      let userRole = null;
      let userData = null;

      // Check in commuters collection
      const commuterDoc = await getDoc(doc(db, 'commuters', user.uid));
      if (commuterDoc.exists()) {
        userRole = 'commuter';
        userData = commuterDoc.data();
      } else {
        // Check in drivers collection
        const driverDoc = await getDoc(doc(db, 'drivers', user.uid));
        if (driverDoc.exists()) {
          userRole = 'driver';
          userData = driverDoc.data();
          
          // 🔍 STEP 5: Check if driver is approved
          if (!userData.isApproved) {
            // Sign out the driver
            await auth.signOut();
            Alert.alert(
              'Account Pending Approval',
              'Your driver account is waiting for approval. Please contact support.',
              [{ text: 'OK' }]
            );
            setLoading(false);
            return;
          }
        }
      }

      // 🔍 STEP 6: If user not found in either collection
      if (!userRole) {
        await auth.signOut();
        Alert.alert(
          'Account Not Found',
          'Your account data is incomplete. Please contact support.',
          [{ text: 'OK' }]
        );
        setLoading(false);
        return;
      }

      // ✅ STEP 7: Login successful!
      Alert.alert(
        'Welcome!',
        `Welcome back, ${userData.firstName}!`,
        [
          {
            text: 'OK',
            onPress: () => {
              // Navigate based on user role
              if (userRole === 'commuter') {
                // TODO: Navigate to commuter home screen
                // router.push('/commuter-home');
                console.log('Navigate to commuter home');
              } else {
                // TODO: Navigate to driver home screen
                // router.push('/driver-home');
                console.log('Navigate to driver home');
              }
            }
          }
        ]
      );

    } catch (error: any) {
      // ❌ Something went wrong! Show friendly error messages
      console.error('Login error:', error);
      
      let errorTitle = 'Login Failed';
      let errorMessage = 'An error occurred. Please try again.';
      
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        errorTitle = 'Wrong Email or Password';
        errorMessage = 'The email or password you entered is incorrect. Please try again.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Please enter a valid email address.';
      } else if (error.code === 'auth/user-disabled') {
        errorTitle = 'Account Disabled';
        errorMessage = 'This account has been disabled. Please contact support.';
      } else if (error.code === 'auth/too-many-requests') {
        errorTitle = 'Too Many Attempts';
        errorMessage = 'Too many failed login attempts. Please try again later or reset your password.';
      } else if (error.code === 'auth/network-request-failed') {
        errorTitle = 'No Internet Connection';
        errorMessage = 'Please check your internet connection and try again.';
      }
      
      Alert.alert(errorTitle, errorMessage);
    } finally {
      // ⏳ Hide loading spinner
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>RUTA</Text>
        </View>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.title}>Sign In</Text>
        <Text style={styles.subtitle}>Hi! Welcome back, you've been missed</Text>

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="example@gmail.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          editable={!loading}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          editable={!loading}
        />

        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>Sign In</Text>
          )}
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/signuprole')}>
            <Text style={styles.signUpLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  logoContainer: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 40,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  formContainer: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 30,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  forgotPassword: {
    color: '#666',
    textAlign: 'right',
    marginBottom: 20,
    textDecorationLine: 'underline',
  },
  button: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: '#666',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  footerText: {
    color: '#666',
  },
  signUpLink: {
    color: 'black',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;