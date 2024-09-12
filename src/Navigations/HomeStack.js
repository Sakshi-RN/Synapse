import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../Screens/Home';
import Notification from '../Screens/Notification';

const HomeStackNav = createStackNavigator();

export const HomeStack = (props) => {
  return (
    <HomeStackNav.Navigator
        initialRouteName="Home"
        screenOptions={{
            headerShown: false,
        }}
    >
        <HomeStackNav.Screen name="Home" component={Home} />
        <HomeStackNav.Screen name="Notification" component={Notification} />
    </HomeStackNav.Navigator>
);
}
export default HomeStack