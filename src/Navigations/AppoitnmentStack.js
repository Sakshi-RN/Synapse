import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import Appointment from '../Screens/Appointment';
import ViewDetails from '../Screens/ViewDetails';
import JoinSession from '../Screens/JoinSession';
import WaitingRoom from '../Screens/WaitingRoom';

const AppointmentStackNav = createStackNavigator();

export const AppointmentStack = (props) => {
  return (
    <AppointmentStackNav.Navigator
        initialRouteName="Appointment"
        screenOptions={{
            headerShown: false,
        }}
    >
        <AppointmentStackNav.Screen name="Appointment" component={Appointment} />
        <AppointmentStackNav.Screen name="ViewDetails" component={ViewDetails} />
        <AppointmentStackNav.Screen name="JoinSession" component={JoinSession} />
        <AppointmentStackNav.Screen name="WaitingRoom" component={WaitingRoom} />
    </AppointmentStackNav.Navigator>
);
}
export default AppointmentStack