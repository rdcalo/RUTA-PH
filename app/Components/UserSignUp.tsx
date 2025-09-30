// app/Components/UserSignUp.tsx
// This component handles COMMUTER sign up with Firebase

import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth, db } from '../../firebase/firebaseConfig';

const UserSignUp = () => {
  const router = useRouter();
  
  // These hold the form data
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // This function runs when user clicks "Sign Up"
  const handleSignUp = async () => {
    // 🔍 STEP 1: Check if all fields are filled
    if (!firstName || !lastName || !email || !phoneNumber || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    // 🔍 STEP 2: Check if passwords match
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    // 🔍 STEP 3: Check if password is strong enough (at least 6 characters)
    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    // 🔍 STEP 4: Check phone number format (should be Philippine format)
    const phoneRegex = /^(\+63|0)\d{10}$/;
    if (!phoneRegex.test(phoneNumber.replace(/\s/g, ''))) {
      Alert.alert('Error', 'Please enter a valid Philippine phone number');
      return;
    }

    // ⏳ Show loading spinner
    setLoading(true);

    try {
      // 🔥 STEP 5: Create user account in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 🔥 STEP 6: Save additional user info to Firestore Database
      await setDoc(doc(db, 'commuters', user.uid), {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim().toLowerCase(),
        phoneNumber: phoneNumber.trim(),
        role: 'commuter',
        createdAt: new Date().toISOString(),
        userId: user.uid
      });

      // ✅ Success! Show message and go to next screen
      Alert.alert('Success', 'Account created successfully!', [
        { text: 'OK', onPress: () => router.push('/login') }
      ]);

    } catch (error: any) {
      // ❌ Something went wrong! Show error message
      console.error('Sign up error:', error);
      
      // Show friendly error messages
      let errorMessage = 'An error occurred. Please try again.';
      
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'This email is already registered. Please use a different email or login.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Please enter a valid email address.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password is too weak. Please use a stronger password.';
      } else if (error.code === 'auth/network-request-failed') {
        errorMessage = 'Network error. Please check your internet connection.';
      }
      
      Alert.alert('Sign Up Failed', errorMessage);
    } finally {
      // ⏳ Hide loading spinner
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Sign up</Text>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity style={styles.activeTab}>
          <Text style={styles.activeTabText}>I'm a commuter</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.inactiveTab}
          onPress={() => router.push('/driver-signup')}
        >
          <Text style={styles.inactiveTabText}>I'm a driver</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Basic Information</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your first name"
        value={firstName}
        onChangeText={setFirstName}
        editable={!loading}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter your last name"
        value={lastName}
        onChangeText={setLastName}
        editable={!loading}
      />

      <TextInput
        style={styles.input}
        placeholder="example@gmail.com"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        editable={!loading}
      />

      <TextInput
        style={styles.input}
        placeholder="+63 XXX XXX XXXX"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        editable={!loading}
      />

      <TextInput
        style={styles.input}
        placeholder="Create password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        editable={!loading}
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        editable={!loading}
      />

      <TouchableOpacity 
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleSignUp}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonText}>Log in</Text>
        )}
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Have an account? </Text>
        <TouchableOpacity onPress={() => router.push('/login')}>
          <Text style={styles.loginLink}>Login Now!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  headerContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  activeTab: {
    flex: 1,
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 5,
    marginRight: 5,
  },
  inactiveTab: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 5,
    marginLeft: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  activeTabText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  inactiveTabText: {
    color: 'black',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonDisabled: {
    backgroundColor: '#666',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  footerText: {
    color: '#666',
  },
  loginLink: {
    color: 'black',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

export default UserSignUp;