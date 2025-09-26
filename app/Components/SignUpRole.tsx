import { router } from 'expo-router';
import React from 'react';
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default function SignUpRole() {
  const handleCommuterSelect = () => {
    // TODO: Navigate to commuter registration flow
    console.log('Commuter selected');
     router.push('/user-signup');
  };

  const handleDriverSelect = () => {
    // TODO: Navigate to driver registration flow
    console.log('Driver selected');
    router.push('/driver-signup');
  };

  const handleLoginNow = () => {
    router.push('/login');
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
        
        {/* Question Text */}
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>
            Are you here to ride{'\n'}or drive?
          </Text>
        </View>
        
        {/* Role Selection Cards */}
        <View style={styles.roleContainer}>
          {/* Commuter Option */}
          <TouchableOpacity 
            style={styles.roleCard}
            onPress={handleCommuterSelect}
            activeOpacity={0.7}
          >
            <Image 
              source={require('../../assets/images/RUTA PH Images/COMMUTER ICON.png')}
              style={styles.roleIcon}
              resizeMode="contain"
            />
            <Text style={styles.roleText}>I&apos;m a commuter</Text>
          </TouchableOpacity>
          
          {/* Driver Option */}
          <TouchableOpacity 
            style={styles.roleCard}
            onPress={handleDriverSelect}
            activeOpacity={0.7}
          >
            <Image 
              source={require('../../assets/images/RUTA PH Images/BUS ICON.png')}
              style={styles.roleIcon}
              resizeMode="contain"
            />
            <Text style={styles.roleText}>I&apos;m a driver</Text>
          </TouchableOpacity>
        </View>
        
        {/* Login Link */}
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>
            Have an account?{' '}
            <Text 
              style={styles.loginLink}
              onPress={handleLoginNow}
            >
              Login Now!
            </Text>
          </Text>
        </View>
        
        {/* Bottom indicator */}
        <View style={styles.bottomIndicator} />
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
    width: 260,
    height: 180,
  },
  questionContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  questionText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1E1E1E',
    textAlign: 'center',
    lineHeight: 34,
  },
  roleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 80,
    paddingHorizontal: 20,
  },
  roleCard: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    minWidth: 140,
    minHeight: 140,
  },
  roleIcon: {
    width: 60,
    height: 60,
    marginBottom: 16,
  },
  roleText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E1E1E',
    textAlign: 'center',
  },
  loginContainer: {
    alignItems: 'center',
    marginBottom: 40,
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
    marginBottom: 8,
  },
});