import { router } from 'expo-router';
import React, { useState } from 'react';
import {
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

export default function DriverSignUp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [vehicleDetails, setVehicleDetails] = useState('');
  const [plateNumber, setPlateNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignUp = () => {
    if (!firstName || !lastName || !email || !phoneNumber || !licenseNumber || !vehicleDetails || !plateNumber || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    // TODO: Implement driver signup logic
    console.log('Driver signup attempted');
  };

  const handleSwitchToCommuter = () => {
    router.push('/user-signup');
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
            style={styles.roleButton}
            onPress={handleSwitchToCommuter}
          >
            <Image 
              source={require('../../assets/images/RUTA PH Images/COMMUTER ICON.png')}
              style={styles.roleIcon}
              resizeMode="contain"
            />
            <Text style={styles.roleText}>I&apos;m a commuter</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.roleButton, styles.activeRoleButton]}
            onPress={() => {}} // Already on driver page
          >
            <Image 
              source={require('../../assets/images/RUTA PH Images/BUS ICON2.png')}
              style={styles.roleIcon}
              resizeMode="contain"
            />
            <Text style={[styles.roleText, styles.activeRoleText]}>I&apos;m a driver</Text>
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
            />
          </View>

          {/* License Number */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Driver&apos;s License</Text>
            <TextInput
              style={styles.textInput}
              value={licenseNumber}
              onChangeText={setLicenseNumber}
              placeholder="Enter license number"
              placeholderTextColor="#999999"
              autoCapitalize="characters"
            />
          </View>

          {/* Vehicle Details */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Vehicle Details</Text>
            <TextInput
              style={styles.textInput}
              value={vehicleDetails}
              onChangeText={setVehicleDetails}
              placeholder="e.g., Toyota Jeepney"
              placeholderTextColor="#999999"
              autoCapitalize="words"
            />
          </View>

          {/* Plate Number */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Plate Number</Text>
            <TextInput
              style={styles.textInput}
              value={plateNumber}
              onChangeText={setPlateNumber}
              placeholder="ABC-1234"
              placeholderTextColor="#999999"
              autoCapitalize="characters"
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
              />
              <TouchableOpacity 
                style={styles.eyeButton}
                onPress={togglePasswordVisibility}
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
              />
              <TouchableOpacity 
                style={styles.eyeButton}
                onPress={toggleConfirmPasswordVisibility}
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
          style={styles.signUpButton}
          onPress={handleSignUp}
          activeOpacity={0.8}
        >
          <Text style={styles.signUpButtonText}>Log in</Text>
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

        {/* Bottom indicator */}
        <View style={styles.bottomIndicator} />
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
    width: 80,
    height: 60,
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
  bottomIndicator: {
    width: 134,
    height: 5,
    backgroundColor: '#1E1E1E',
    borderRadius: 2.5,
    alignSelf: 'center',
  },
});