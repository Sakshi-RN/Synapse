import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import MyProfile from '../Screens/MyProfile';


const ProfileStackNav = createStackNavigator();

export const ProfileStack = (props) => {
  return (
    <ProfileStackNav.Navigator
        initialRouteName="MyProfile"
        screenOptions={{
            headerShown: false,
        }}
    >
        <ProfileStackNav.Screen name="MyProfile" component={MyProfile} />
    </ProfileStackNav.Navigator>
);
}
export default ProfileStack