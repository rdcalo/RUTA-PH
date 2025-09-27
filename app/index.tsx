import React, { useState } from 'react';
import OpeningScreen from './Components/OpeningScreen';
import SplashScreen from './Components/SplashScreen';

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);

  const handleSplashFinish = () => {
    setIsLoading(false);
  };

  return isLoading ? (
    <SplashScreen onFinish={handleSplashFinish} />
  ) : (
    <OpeningScreen />
  );
}