import React from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeIcon, AppointmentIcon, CareTeamIcon, MyProfileIcon,LightAppointment,LightCareTeam,LightHome,LightMyProfile, } from '../Assets/svg';
import HomeStack from './HomeStack';
import AppointmentStack from './AppointmentStack';
import CareTeamStack from '../Navigations/CareTeamStack'
import ProfileStack from '../Navigations/ProfileStack';
import Colors from '../Themes/Colors';
import { responsiveHeight } from 'react-native-responsive-dimensions';

const Tab = createBottomTabNavigator();

export default function BTabNavigation() {
  const navigation = useNavigation();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          ...styles.tabBarStyle,
        },
        tabBarLabelStyle: { display: 'none' }, 
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? <HomeIcon />: <LightHome /> 

        }}
      />
      <Tab.Screen
        name="Appointment"
        component={AppointmentStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? <AppointmentIcon />: <LightAppointment /> 

        }}
      />
      <Tab.Screen
        name="CareTeam"
        component={CareTeamStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? <CareTeamIcon />: <LightCareTeam /> 

        }}
      />
      <Tab.Screen
        name="MyProfile"
        component={ProfileStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? <MyProfileIcon />: <LightMyProfile /> 

        }}

      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: Colors.white,
    paddingVertical: responsiveHeight(3),
    shadowColor: Colors.black,
    shadowOffset: {
      width: 3,
      height: 4,
    },
    shadowOpacity: 4,
    shadowRadius: 5,
    elevation: 5,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: responsiveHeight(10),
    borderWidth: 1,
    borderColor: Colors.grey
  },
});
