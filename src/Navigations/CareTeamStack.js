import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import CareTeam from '../Screens/CareTeam';
import ReasonforChange from '../Screens/ReasonforChange';


const CareTeamStackNav = createStackNavigator();

export const CareTeamStack = (props) => {
  return (
    <CareTeamStackNav.Navigator
        initialRouteName="CareTeam"
        screenOptions={{
            headerShown: false,
        }}
    >
        <CareTeamStackNav.Screen name="CareTeam" component={CareTeam} />
        <CareTeamStackNav.Screen name="ReasonforChange" component={ReasonforChange} />
    </CareTeamStackNav.Navigator>
);
}
export default CareTeamStack