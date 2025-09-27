import React, { useEffect } from 'react';
import {
    Animated,
    Image,
    StatusBar,
    StyleSheet,
    View
} from 'react-native';

import { SafeAreaView } from "react-native-safe-area-context";

interface SplashScreenProps {
  onFinish?: () => void;
}

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.8);

  useEffect(() => {
    // Start animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      })
    ]).start();

    // Call onFinish after 3 seconds if provided
    if (onFinish) {
      const timer = setTimeout(() => {
        onFinish();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [onFinish]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#E4E2DD" />
      
      <View style={styles.content}>
        <Animated.View
          style={[
            styles.logoContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }]
            }
          ]}
        >
          <Image 
            source={require('../../assets/images/RUTA PH Images/MAIN LOGO.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </Animated.View>
        
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingBottom: 20,
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 150,
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