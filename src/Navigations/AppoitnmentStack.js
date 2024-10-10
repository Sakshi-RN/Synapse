import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import Appointment from '../Screens/Appointment';
import ViewDetails from '../Screens/ViewDetails';
import JoinSession from '../Screens/JoinSession';
import WaitingRoom from '../Screens/WaitingRoom';
import ResheduleRequest from '../Screens/ResheduleRequest';
import Feedback from '../Screens/Feedback';
import ThankyouForFeedback from '../Screens/ThankyouForFeedback';
import ViewAllAppointments from '../Screens/ViewAllAppointments';


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
        <AppointmentStackNav.Screen name="ResheduleRequest" component={ResheduleRequest} />
        <AppointmentStackNav.Screen name="Feedback" component={Feedback} />
        <AppointmentStackNav.Screen name="ThankyouForFeedback" component={ThankyouForFeedback} />
        <AppointmentStackNav.Screen name="ViewAllAppointments" component={ViewAllAppointments} />
    </AppointmentStackNav.Navigator>
);
}
export default AppointmentStack