import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// import SignUp from '../Screens/SignUp';
import SignIn from '../Screens/SignIn';
import OtpVerify from '../Screens/OtpVerify';


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
     
      </Stack.Navigator>
    </NavigationContainer>
  );
}
