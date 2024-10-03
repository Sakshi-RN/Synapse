import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from '../Screens/SignIn';
import OtpVerify from '../Screens/OtpVerify';
import BTabNavigation from './BTabNavigation';
import VideoCall from '../Screens/VideoCall';


const Stack = createStackNavigator();

export default function AuthNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SignIn"
      >

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
        <Stack.Screen
          name="BTabNavigation"
          component={BTabNavigation}
          options={{
            headerShown: false,
          }}
        />
            <Stack.Screen
          name="VideoCall"
          component={VideoCall}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
