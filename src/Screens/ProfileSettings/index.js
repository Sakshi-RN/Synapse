
import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Platform, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../../Themes/Colors';
import CustomHeader from '../../Components/CustomHeader';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';
import { fetchProfile } from '../../redux/Reducers/profileReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Fonts } from '../../Themes/fonts';

const ProfileSettings = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { data, fetchLoading, fetchError } = useSelector(state => state.profile);
    const [loading, setLoading] = useState(false);


    useFocusEffect(
        useCallback(() => {
            dispatch(fetchProfile());
        }, [dispatch])
    );


    const handleLogout = async () => {
        Alert.alert(
            "Logout",
            "Are you sure you want to logout?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Yes",
                    onPress: async () => {
                        setLoading(true);
                        try {
                            await AsyncStorage.removeItem('authclientID');

                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'SignIn' }],
                            });
                        } catch (error) {
                            console.error("Error clearing AsyncStorage:", error);
                            Alert.alert("Error", "An error occurred while logging out. Please try again.");
                        } finally {
                            setLoading(false);
                        }
                    },
                },
            ]
        );
    };


    const handlePreferences = () => {
        navigation.navigate('Preferences');
    };

    const handleEmergencycontacts = () => {
        navigation.navigate('Emergencycontacts');
    };

    const handleMyProfileScreen = () => {
        navigation.navigate('EditProfile');
    };


    const profile = data && data[0];

    return (
        <View style={styles.container}>
            <CustomHeader title={'Profile & Settings'} />
            <TouchableOpacity onPress={handleMyProfileScreen} style={styles.profileSection}>
                <View style={styles.avatarBox}>
                    <Text style={styles.avatarText}>
                        {`${profile?.firstName?.[0]?.toUpperCase() ?? ''}${profile?.lastName?.[0]?.toUpperCase() ?? ''}`}
                    </Text>
                </View>
                <View style={styles.profileInfo}>
                    <Text style={styles.profileName}>{`${profile?.firstName || ''} ${profile?.lastName || ''}`}</Text>
                    <Text style={styles.profileName}>{profile?.phone || ''}</Text>
                </View>
                <Icon name="chevron-right" size={20} color={Colors.black} />
            </TouchableOpacity>
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <Text style={styles.sectionTitle}>Preferences</Text>
                <View style={styles.section}>
                    <TouchableOpacity onPress={handlePreferences} style={styles.row}>
                        <Text style={styles.rowText}>Preferences</Text>
                        <Icon name="chevron-right" size={20} color={Colors.black} />
                    </TouchableOpacity>
                    <View style={styles.line} />
                    <TouchableOpacity onPress={handleEmergencycontacts} style={styles.row}>
                        <Text style={styles.rowText}>Emergency Contacts</Text>
                        <Icon name="chevron-right" size={20} color={Colors.black} />
                    </TouchableOpacity>
                </View>

                <Text style={styles.sectionTitle}>Support</Text>
                <View style={styles.section}>
                    <TouchableOpacity style={styles.row}>
                        <Text style={styles.rowText}>Privacy Policy</Text>
                        <Icon name="external-link" size={20} color={Colors.black} />
                    </TouchableOpacity>
                    <View style={styles.line} />
                    <TouchableOpacity style={styles.row}>
                        <Text style={styles.rowText}>Terms Of Use</Text>
                        <Icon name="external-link" size={20} color={Colors.black} />
                    </TouchableOpacity>
                    <View style={styles.line} />
                    <TouchableOpacity style={styles.row}>
                        <Text style={styles.rowText}>FAQ</Text>
                        <Icon name="external-link" size={20} color={Colors.black} />
                    </TouchableOpacity>
                    <View style={styles.line} />
                    <TouchableOpacity onPress={handleLogout} style={styles.row}>
                        <Icon name="sign-out" size={20} color={Colors.red} />
                        <Text style={[styles.rowText, { color: Colors.red }]}>Logout</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.versionText}>© 2024 TARA Mind. v0.19.0.</Text>
            </ScrollView>
        </View>
    );
};

export default ProfileSettings;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.bg_Color,
        paddingBottom: responsiveHeight(13),
    },
    content: {
        paddingHorizontal: responsiveWidth(5),
    },
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: responsiveWidth(5),
        backgroundColor: Colors.white,
        paddingVertical: responsiveHeight(1.5),
        borderRadius: 10,
        shadowColor: Platform.OS === 'ios' ? Colors.OFFWHITE : Colors.black,
        shadowOffset: { width: 3, height: 5 },
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 5,
        marginHorizontal: responsiveWidth(5),
        marginTop: responsiveHeight(4),
    },
    avatarBox: {
        width: responsiveHeight(8),
        height: responsiveHeight(8),
        borderRadius: responsiveHeight(4),
        backgroundColor: Colors.blue,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        fontSize: responsiveFontSize(2.5),
        color: Colors.white,
        fontFamily: Fonts.Medium600
    },
    profileInfo: {
        width: responsiveWidth(52),
        marginHorizontal: responsiveWidth(4),
    },
    profileName: {
        fontSize: responsiveFontSize(2),
    fontFamily: Fonts.Bold800,
        color: Colors.blue,
    },
    section: {
        paddingHorizontal: responsiveWidth(5),
        elevation: 5,
        shadowColor: Platform.OS === 'ios' ? Colors.OFFWHITE : Colors.black,
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 1,
        shadowRadius: 2,
        borderColor: Colors.light_skyblue,
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: Colors.white,
        marginTop: responsiveHeight(1),
    },
    sectionTitle: {
        fontSize: responsiveFontSize(2),
      fontFamily: Fonts.Bold800,
        color: Colors.black,
        marginTop: responsiveHeight(2),
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: responsiveHeight(2),
    },
    rowText: {
        fontSize: responsiveFontSize(2),
        color: Colors.black,
        flex: 1,
        paddingLeft: responsiveWidth(3),
        fontFamily: Fonts.Medium600,
    },
    line: {
        width: '100%',
        height: 1,
        backgroundColor: Colors.grey_light,
    },
    versionText: {
        textAlign: 'center',
        color: Colors.grey,
        fontSize: responsiveFontSize(1.5),
        marginTop: responsiveHeight(2),
    },
});