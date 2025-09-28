import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { signOutUser } from '../firebase/authService';
import OpeningScreen from './Components/OpeningScreen';
import SplashScreen from './Components/SplashScreen';

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const { user, userData, loading } = useAuth();

  const handleSplashFinish = () => {
    setIsLoading(false);
  };

  const handleLogout = async () => {
    try {
      await signOutUser();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Show loading while Firebase initializes
  if (loading) {
    return <View style={styles.whiteScreen} />;
  }

  // Show splash screen on first load
  if (isLoading) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  // WHITE SCREEN - User is logged in successfully
  if (user && userData) {
    return (
      <View style={styles.whiteScreen}>
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>
            Welcome to Ruta PH!
          </Text>
          <Text style={styles.userNameText}>
            {userData.firstName} {userData.lastName}
          </Text>
          <Text style={styles.userTypeText}>
            Account Type: {userData.userType === 'commuter' ? 'Commuter' : 'Driver'}
          </Text>
          {userData.userType === 'driver' && (
            <Text style={styles.statusText}>
              Status: {(userData as any).verified ? 'Verified' : 'Pending Verification'}
            </Text>
          )}
        </View>
        
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // User not logged in - show your beautiful opening screen
  return <OpeningScreen />;
}

const styles = StyleSheet.create({
  whiteScreen: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#1E1E1E',
  },
  userNameText: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333333',
  },
  userTypeText: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 10,
  },
  statusText: {
    fontSize: 14,
    color: '#999999',
    fontStyle: 'italic',
  },
  logoutButton: {
    backgroundColor: '#1E1E1E',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});