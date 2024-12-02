import { StatusBar, LogBox } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useFonts } from "expo-font";
import Colors from './src/Themes/Colors';
import AppNavigation from './src/Navigations/AppNavigaton';
import Splash from './src/Screens/Splash';
import { Provider } from 'react-redux';
import store from './src/redux/storeConfig';

export default function App() {
  LogBox.ignoreLogs([ 'Warning: ...' ]);
  LogBox.ignoreAllLogs();

  const [loading, setLoading] = useState(true);  
  const [fontsLoaded, fontError] = useFonts({
    "WorkSans-Regular": require("./src/Assets/fonts/WorkSans-Regular.ttf"),
    "Figtree-bold": require("./src/Assets/fonts/Figtree-Bold.ttf"),
    "Figtree-light": require("./src/Assets/fonts/Figtree-Light.ttf"),
    "Figtree-Medium": require("./src/Assets/fonts/Figtree-Medium.ttf"),
    "Figtree-Semibold": require("./src/Assets/fonts/Figtree-SemiBold.ttf"),
    "Figtree-RegularFigtree": require("./src/Assets/fonts/Figtree-Regular.ttf"),

  });

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);  
    }, 3000);
  }, []);

  if (loading || !fontsLoaded) return <Splash />;

  return (
    <Provider store={store}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.black} />
      <AppNavigation/>
    </Provider>
  );
}
