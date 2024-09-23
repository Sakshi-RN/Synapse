import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../Screens/Home';
import Notification from '../Screens/Notification';
import SurveyHistory from '../Screens/SurveyHistory';
import PHQ from '../Screens/PHQ';
import InTake from '../Screens/InTake';
import Survey from '../Screens/Survey';
import SurveyQuestionare from '../Screens/SurveyQuestionare';
import SurveyLastQuestionare from '../Screens/SurveyLastQuestionare';
import PHQDetails from '../Screens/PHQDetails';
import Diagonistic from '../Screens/Diagonistic';
import ACE from '../Screens/ACE';
import TreatmentSummary from '../Screens/TreatmentSummary';
import ConsentForm from '../Screens/ConsentForm';
import ConsentForTelehealth from '../Screens/ConsentForTelehealth';

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
        <HomeStackNav.Screen name="SurveyQuestionare" component={SurveyQuestionare} />  
        <HomeStackNav.Screen name="SurveyLastQuestionare" component={SurveyLastQuestionare} />  
        <HomeStackNav.Screen name="PHQDetails" component={PHQDetails} /> 
         <HomeStackNav.Screen name="Diagonistic" component={Diagonistic} />  
        <HomeStackNav.Screen name="ACE" component={ACE} />  
        <HomeStackNav.Screen name="TreatmentSummary" component={TreatmentSummary} /> 
        <HomeStackNav.Screen name="ConsentForm" component={ConsentForm} />
        <HomeStackNav.Screen name="ConsentForTelehealth" component={ConsentForTelehealth} /> 
    </HomeStackNav.Navigator>
);
}
export default HomeStack