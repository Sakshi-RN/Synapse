import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BTabNavigation from './BTabNavigation';
import SignIn from '../Screens/SignIn';
import OtpVerify from '../Screens/OtpVerify';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

export default function AppNavigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const clientID = await AsyncStorage.getItem('authclientID');
        console.log(clientID, '@GGYUUU');
        if (clientID) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Error checking login status:', error);
        setIsLoggedIn(false); // Default to false in case of an error
      } finally {
        setLoading(false); // Stop loading once we have checked the status
      }
    };

    checkLoginStatus();
  }, []);

  // Show a loading screen or splash screen if the app is still loading
  if (loading) {
    return null; // You can show a loading indicator here
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isLoggedIn ? "BTabNavigation" : "SignIn"}>
        <Stack.Screen
          name="BTabNavigation"
          component={BTabNavigation}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="OtpVerify"
          component={OtpVerify}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
