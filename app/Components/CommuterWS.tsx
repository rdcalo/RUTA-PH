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

export default function CommuterWS() {
  const handleGetStarted = () => {
    // TODO: Navigate to commuter dashboard
    console.log('Navigate to commuter dashboard');
    router.push('/login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#E4E2DD" />
      
      <View style={styles.content}>
        {/* Top Spacer */}
        <View style={styles.topSpacer} />
        
        {/* Success Icon */}
        <View style={styles.iconContainer}>
          <Image 
            source={require('../../assets/images/RUTA PH Images/CHECK ICON.png')}
            style={styles.checkIcon}
            resizeMode="contain"
          />
        </View>
        
        {/* Welcome Message */}
        <View style={styles.messageContainer}>
          <Text style={styles.title}>You&apos;re all set!</Text>
          <Text style={styles.subtitle}>
            Enjoy peace of mind and comfort{'\n'}on every ride!
          </Text>
        </View>
        
        {/* Middle Spacer */}
        <View style={styles.middleSpacer} />
        
        {/* Get Started Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.getStartedButton}
            onPress={handleGetStarted}
            activeOpacity={0.8}
          >
            <Text style={styles.getStartedButtonText}>Get started</Text>
          </TouchableOpacity>
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
    paddingTop: 20,
    paddingBottom: 20,
  },
  topSpacer: {
    flex: 0.8,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  checkIcon: {
    width: 140,
    height: 140,
  },
  messageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1E1E1E',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 22,
    fontWeight: '400',
  },
  middleSpacer: {
    flex: 0,
  },
  buttonContainer: {
    marginBottom: 200,
    marginTop: 20,
  },
  getStartedButton: {
    backgroundColor: '#1E1E1E',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  getStartedButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});