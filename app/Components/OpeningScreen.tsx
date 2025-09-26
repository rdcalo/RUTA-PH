import { router } from 'expo-router';
import React from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';


const { width, height } = Dimensions.get('window');

export default function OpeningScreen() {
  const handleImageUpload = () => {
    // TODO: Implement image upload functionality
    console.log('Image upload clicked');
  };

  const handleSignIn = () => {
    router.push('/login'); // Navigate to login screen
  };

  const handleCreateAccount = () => {
    router.push('/signuprole'); // Navigate to signup screen
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#E4E2DD" />
      
      <View style={styles.content}>
        {/* Image placeholder area */}
        <View style={styles.topSection}>

          <TouchableOpacity 
            style={styles.imageContainer}
            onPress={handleImageUpload}
            activeOpacity={1}
          >
            <Image source={require('../../assets/images/RUTA PH Images/MAIN LOGO.png')}
            style={styles.imagePlaceholder}
            resizeMode="contain"/>
          </TouchableOpacity>
          
          {/* Text content */}
          <View style={styles.textContainer}>
            <Text style={styles.mainTitle}>Where are you headed?</Text>
            <Text style={styles.subtitle}>
              Curious? See exactly where your{'\n'}e-Jeeps are cruising right now!
            </Text>
          </View>
        </View>
        
        {/* Button container */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.signInButton}
            onPress={handleSignIn}
            activeOpacity={0.8}
          >
            <Text style={styles.signInButtonText}>Sign In</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.createAccountButton}
            onPress={handleCreateAccount}
            activeOpacity={0.8}
          >
            <Text style={styles.createAccountButtonText}>Create account</Text>
          </TouchableOpacity>
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
    paddingTop: 60,
    paddingBottom: 20,
  },
  topSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  imageContainer: {
    marginBottom: 24,
  },
  imagePlaceholder: {
    width: 260,
    height: 200,
    justifyContent: 'center',
    resizeMode: 'contain',
  },
  placeholderText: {
    color: 'rgba(30, 30, 30, 0.5)',
    fontSize: 16,
    fontWeight: '500',
  },
  textContainer: {
    alignItems: 'center',
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1E1E1E',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 38,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 22,
    fontWeight: '400',
  },
  buttonContainer: {
    marginBottom: 40,
    gap: 16,
  },
  signInButton: {
    backgroundColor: '#1E1E1E',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  signInButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  createAccountButton: {
    backgroundColor: 'transparent',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1E1E1E',
  },
  createAccountButtonText: {
    color: '#1E1E1E',
    fontSize: 16,
    fontWeight: '600',
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