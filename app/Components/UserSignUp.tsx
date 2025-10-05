import { router } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { auth, db } from '../../firebase/firebaseConfig';

export default function UserSignUp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    // Validate all fields
    if (!firstName || !lastName || !email || !phoneNumber || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    
    // Check password match
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    // Check password length
    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    // Check phone number format
    const phoneRegex = /^(\+63|0)\d{10}$/;
    if (!phoneRegex.test(phoneNumber.replace(/\s/g, ''))) {
      Alert.alert('Error', 'Please enter a valid Philippine phone number');
      return;
    }

    setLoading(true);

    try {
      // Create commuter account in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save commuter info to Firestore Database
      await setDoc(doc(db, 'commuters', user.uid), {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim().toLowerCase(),
        phoneNumber: phoneNumber.trim(),
        role: 'commuter',
        createdAt: new Date().toISOString(),
        userId: user.uid
      });

      // Success! Navigate to welcome screen
      router.push('/commuterwelcome');
      
    } catch (error: any) {
      console.error('Commuter sign up error:', error);
      
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
      setLoading(false);
    }
  };

  const handleSwitchToDriver = () => {
    router.push('/driver-signup');
  };

  const handleLogin = () => {
    router.push('/login');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#E4E2DD" />
      
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image 
            source={require('../../assets/images/RUTA PH Images/RUTA BUS ICON.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Title */}
        <Text style={styles.title}>Sign up</Text>

        {/* Role Toggle */}
        <View style={styles.roleToggleContainer}>
          <TouchableOpacity 
            style={[styles.roleButton, styles.activeRoleButton]}
            disabled={loading}
          >
            <Image 
              source={require('../../assets/images/RUTA PH Images/COMMUTER ICON2.png')}
              style={styles.roleIcon}
              resizeMode="contain"
            />
            <Text style={[styles.roleText, styles.activeRoleText]}>I&apos;m a commuter</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.roleButton}
            onPress={handleSwitchToDriver}
            disabled={loading}
          >
            <Image 
              source={require('../../assets/images/RUTA PH Images/BUS ICON.png')}
              style={styles.roleIcon}
              resizeMode="contain"
            />
            <Text style={styles.roleText}>I&apos;m a driver</Text>
          </TouchableOpacity>
        </View>

        {/* Form Fields */}
        <View style={styles.formContainer}>
          <Text style={styles.sectionTitle}>Basic Information</Text>
          
          {/* First Name */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>First Name</Text>
            <TextInput
              style={styles.textInput}
              value={firstName}
              onChangeText={setFirstName}
              placeholder="Enter your first name"
              placeholderTextColor="#999999"
              autoCapitalize="words"
              editable={!loading}
            />
          </View>

          {/* Last Name */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Last Name</Text>
            <TextInput
              style={styles.textInput}
              value={lastName}
              onChangeText={setLastName}
              placeholder="Enter your last name"
              placeholderTextColor="#999999"
              autoCapitalize="words"
              editable={!loading}
            />
          </View>

          {/* Email */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.textInput}
              value={email}
              onChangeText={setEmail}
              placeholder="example@gmail.com"
              placeholderTextColor="#999999"
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!loading}
            />
          </View>

          {/* Phone Number */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Phone Number</Text>
            <TextInput
              style={styles.textInput}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              placeholder="+63 9XX XXX XXXX"
              placeholderTextColor="#999999"
              keyboardType="phone-pad"
              editable={!loading}
            />
          </View>

          {/* Password */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Create password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                value={password}
                onChangeText={setPassword}
                placeholder="••••••••"
                placeholderTextColor="#999999"
                secureTextEntry={!showPassword}
                autoCapitalize="none"
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

          {/* Confirm Password */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Confirm password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="••••••••"
                placeholderTextColor="#999999"
                secureTextEntry={!showConfirmPassword}
                autoCapitalize="none"
                editable={!loading}
              />
              <TouchableOpacity 
                style={styles.eyeButton}
                onPress={toggleConfirmPasswordVisibility}
                disabled={loading}
              >
                <Text style={styles.eyeIcon}>
                  {showConfirmPassword ? '🙈' : '👁️'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Sign Up Button */}
        <TouchableOpacity 
          style={[styles.signUpButton, loading && styles.signUpButtonDisabled]}
          onPress={handleSignUp}
          activeOpacity={0.8}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.signUpButtonText}>Sign up</Text>
          )}
        </TouchableOpacity>

        {/* Login Link */}
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>
            Have an account?{' '}
            <Text 
              style={styles.loginLink}
              onPress={handleLogin}
            >
              Login Now!
            </Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E4E2DD',
  },
  scrollContent: {
    paddingHorizontal: 32,
    paddingTop: 40,
    paddingBottom: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 150,
    height: 120,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1E1E1E',
    marginBottom: 20,
  },
  roleToggleContainer: {
    flexDirection: 'row',
    marginBottom: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 8,
    padding: 4,
  },
  roleButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  activeRoleButton: {
    backgroundColor: '#1E1E1E',
  },
  roleIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  roleText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
  },
  activeRoleText: {
    color: '#FFFFFF',
  },
  formContainer: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E1E1E',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
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
  signUpButton: {
    backgroundColor: '#1E1E1E',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 24,
  },
  signUpButtonDisabled: {
    backgroundColor: '#666666',
  },
  signUpButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  loginContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  loginText: {
    fontSize: 16,
    color: '#666666',
  },
  loginLink: {
    color: '#1E1E1E',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});