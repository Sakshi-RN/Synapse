import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import MyProfile from '../Screens/MyProfile';
import EditProfile from '../Screens/EditProfile';
import EditPreferences from '../Screens/EditPreferences';
import EditEmergencyContacts from '../Screens/EditEmergencyContacts';
import Preferences from '../Screens/Preferences';
import Emergencycontacts from '../Screens/Emergencycontacts';

const ProfileStackNav = createStackNavigator();

export const ProfileStack = (props) => {
    return (
        <ProfileStackNav.Navigator
            initialRouteName="Emergencycontacts"
            screenOptions={{
                headerShown: false,
            }}
        >
            <ProfileStackNav.Screen name="MyProfile" component={MyProfile} />
            <ProfileStackNav.Screen name="EditProfile" component={EditProfile} />
            <ProfileStackNav.Screen name="EditPreferences" component={EditPreferences} />
            <ProfileStackNav.Screen name="EditEmergencyContacts" component={EditEmergencyContacts} />
            <ProfileStackNav.Screen name="Preferences" component={Preferences} />
            <ProfileStackNav.Screen name="Emergencycontacts" component={Emergencycontacts} />
        </ProfileStackNav.Navigator>
    );
}
export default ProfileStack