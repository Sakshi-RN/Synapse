import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../Screens/Home';
import Notification from '../Screens/Notification';
import SurveyHistory from '../Screens/SurveyHistory';
import PHQ from '../Screens/PHQ';
import InTake from '../Screens/InTake';
import Survey from '../Screens/Survey';


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
        <HomeStackNav.Screen name="SurveyHistory" component={SurveyHistory} />
        <HomeStackNav.Screen name="PHQ" component={PHQ} />  
        <HomeStackNav.Screen name="InTake" component={InTake} />  
        <HomeStackNav.Screen name="Survey" component={Survey} />   
    </HomeStackNav.Navigator>
);
}
export default HomeStack