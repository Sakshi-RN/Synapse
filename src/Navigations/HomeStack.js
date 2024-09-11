import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../Screens/Home';


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
    </HomeStackNav.Navigator>
);
}
export default HomeStack