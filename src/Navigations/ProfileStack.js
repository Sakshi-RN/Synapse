import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import ProfileSettings from '../Screens/ProfileSettings';
import EditProfile from '../Screens/EditProfile';
import EditPreferences from '../Screens/EditPreferences';
import EditEmergencyContacts from '../Screens/EditEmergencyContacts';
import Preferences from '../Screens/Preferences';
import Emergencycontacts from '../Screens/Emergencycontacts';
import MyProfileScreen from '../Screens/MyProfileScreen';


const ProfileStackNav = createStackNavigator();

export const ProfileStack = (props) => {
    return (
        <ProfileStackNav.Navigator
            initialRouteName="ProfileSettings"
            screenOptions={{
                headerShown: false,
            }}
        >
            <ProfileStackNav.Screen name="ProfileSettings" component={ProfileSettings} />
            <ProfileStackNav.Screen name="EditProfile" component={EditProfile} />
            <ProfileStackNav.Screen name="EditPreferences" component={EditPreferences} />
            <ProfileStackNav.Screen name="EditEmergencyContacts" component={EditEmergencyContacts} />
            <ProfileStackNav.Screen name="Preferences" component={Preferences} />
            <ProfileStackNav.Screen name="Emergencycontacts" component={Emergencycontacts} />
            <ProfileStackNav.Screen name="MyProfileScreen" component={MyProfileScreen}/>
        </ProfileStackNav.Navigator>
    );
}
export default ProfileStack