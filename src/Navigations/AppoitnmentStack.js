import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import Appointment from '../Screens/Appointment';


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
    </AppointmentStackNav.Navigator>
);
}
export default AppointmentStack