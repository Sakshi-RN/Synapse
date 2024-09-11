import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import CareTeam from '../Screens/CareTeam';


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
    </CareTeamStackNav.Navigator>
);
}
export default CareTeamStack