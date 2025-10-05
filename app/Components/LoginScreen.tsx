import { router } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { auth, db } from '../../firebase/firebaseConfig';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    // Validate fields
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    setLoading(true);

    try {
      // Sign in with Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Check if user is a commuter or driver
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
          
          // Check if driver is approved
          if (!userData.isApproved) {
            await auth.signOut();
            Alert.alert(
              'Account Pending Approval',
              'Your driver account is waiting for approval. Please contact support.'
            );
            setLoading(false);
            return;
          }
        }
      }

      // If user not found in either collection
      if (!userRole) {
        await auth.signOut();
        Alert.alert(
          'Account Not Found',
          'Your account data is incomplete. Please contact support.'
        );
        setLoading(false);
        return;
      }

      // Login successful - navigate based on role
      if (userRole === 'commuter') {
        // TODO: Navigate to commuter dashboard
        //router.push('/commuter-home');
        console.log('Navigate to commuter home');
      } else {
        // TODO: Navigate to driver dashboard
        //router.push('/driver-home');
        console.log('Navigate to driver home');
      }

    } catch (error: any) {
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
      setLoading(false);
    }
  };

  const handleCreateAccount = () => {
    router.push('/signuprole');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#E4E2DD" />
      
      <View style={styles.content}>
        {/* Logo Area */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/images/RUTA PH Images/MAIN LOGO.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        
        {/* Login Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Log in</Text>
        </View>
        
        {/* Form Container */}
        <View style={styles.formContainer}>
          {/* Email Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email address</Text>
            <TextInput
              style={styles.textInput}
              value={email}
              onChangeText={setEmail}
              placeholder="helloworld@gmail.com"
              placeholderTextColor="#999999"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              editable={!loading}
            />
          </View>
          
          {/* Password Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                value={password}
                onChangeText={setPassword}
                placeholder="••••••••"
                placeholderTextColor="#999999"
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
                editable={!loading}
              />
              <TouchableOpacity 
                style={styles.eyeButton}
                onPress={togglePasswordVisibility}
                disabled={loading}
              >
                <Text style={styles.eyeIcon}>
                  {showPassword ? '🙈' : '👁️'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        
        {/* Login Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.loginButton, loading && styles.loginButtonDisabled]}
            onPress={handleLogin}
            activeOpacity={0.8}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.loginButtonText}>Log in</Text>
            )}
          </TouchableOpacity>
        </View>
        
        {/* Create Account Link */}
        <View style={styles.createAccountContainer}>
          <Text style={styles.createAccountText}>
            Don&apos;t have an account?{' '}
            <Text 
              style={styles.createAccountLink}
              onPress={handleCreateAccount}
            >
              Create one now!
            </Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E4E2DD',
  },
  content: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: 'space-between',
    paddingTop: 40,
    paddingBottom: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 200,
    height: 180,
  },
  titleContainer: {
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1E1E1E',
    marginBottom: 8,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1E1E1E',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: '#1E1E1E',
    borderWidth: 1,
    borderColor: 'rgba(30, 30, 30, 0.1)',
  },
  passwordContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: '#1E1E1E',
    borderWidth: 1,
    borderColor: 'rgba(30, 30, 30, 0.1)',
    paddingRight: 50,
  },
  eyeButton: {
    position: 'absolute',
    right: 16,
    padding: 4,
  },
  eyeIcon: {
    fontSize: 18,
  },
  buttonContainer: {
    marginBottom: 24,
  },
  loginButton: {
    backgroundColor: '#1E1E1E',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  loginButtonDisabled: {
    backgroundColor: '#666666',
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  createAccountContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  createAccountText: {
    fontSize: 16,
    color: '#666666',
  },
  createAccountLink: {
    color: '#1E1E1E',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});