import { StatusBar } from 'react-native';
import React, { useEffect, useState } from 'react';

import Colors from './src/Themes/Colors';
import AuthNavigation from './src/Navigations/AuthNavigation';
import Splash from './src/Screens/Splash';
import AppNavigaton from './src/Navigations/AppNavigaton';

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  });

  if (loading) return <Splash />;

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={Colors.black} />
      <AuthNavigation />
      {/* <AppNavigaton /> */}
    </>
  );
}
