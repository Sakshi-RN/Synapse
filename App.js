import { StatusBar } from 'react-native';
import React, { useEffect, useState } from 'react';

import Colors from './src/Themes/Colors';
import AuthNavigation from './src/Navigations/AuthNavigation';
import Splash from './src/Screens/Splash';
import AppNavigaton from './src/Navigations/AppNavigaton';
import { Provider } from 'react-redux';

import store from './src/redux/storeConfig';  

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  });

  if (loading) return <Splash />;

  return (
    <Provider store={store}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.black} />
       <AuthNavigation />
      </Provider>
  );
}
