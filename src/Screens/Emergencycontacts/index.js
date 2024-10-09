
import React, { useCallback } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Colors from '../../Themes/Colors';
import CustomHeader from '../../Components/CustomHeader';
import CustomButton from '../../Components/CustomButton';
import CommonStyle from '../../Components/CommonStyle';
import commonStyles from '../../Components/CommonStyle';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { fetchProfile } from '../../redux/Reducers/profileReducer';
import Loader from '../../Components/Loader';

const Emergencycontacts = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { data, fetchLoading } = useSelector(state => state.profile);
    useFocusEffect(
        useCallback(() => {
            dispatch(fetchProfile());
        }, [dispatch])
    );
    if (fetchLoading) {
        return (
            <View style={styles.centeredContainer}>
                <Loader />
            </View>
        );
    }
    const profile = data && data[0];

    const handleEditEmergencyContacts = () => {
        navigation.navigate('EditEmergencyContacts');
    };
    const handleGoBack = () => {
        navigation.goBack();
    };
    return (
        <View style={styles.container}>
            <CustomHeader title={'Emergency Contacts'} />
            <View style={styles.content}>
                <View style={CommonStyle.container}>
                    <View style={commonStyles.containerView}>
                        <Text style={CommonStyle.nameTitleText}>First Name</Text>
                        <Text style={commonStyles.bodyText}>{profile?.emergencyContactFirstName}</Text>
                    </View>
                    <View style={commonStyles.containerView}>
                        <Text style={CommonStyle.nameTitleText}>Last Name</Text>
                        <Text style={commonStyles.bodyText}>{profile?.emergencyContactLastName}</Text>
                    </View>
                    <View style={commonStyles.containerView}>
                        <Text style={CommonStyle.nameTitleText}>Phone Number</Text>
                        <Text style={commonStyles.bodyText}>{profile?.emergencyContactPhone}</Text>
                    </View>
                    <View style={commonStyles.bottomView}>
                        <Text style={CommonStyle.titleText}>What is your relation with that person?</Text>
                        <Text style={commonStyles.bodyText}>{profile?.emergencyContactRelation}</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <CustomButton
                        buttonStyle={styles.Button}
                        textStyle={styles.btnText}
                        title={'Back'}
                        onPress={handleGoBack}
                         />
                    <CustomButton
                        buttonStyle={styles.joinButton}
                        textStyle={styles.joinText}
                        title={'Edit Info'} 
                        onPress={handleEditEmergencyContacts}/>
                </View>
            </View>
        </View>


    );
};

export default Emergencycontacts;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    content: {
        flex: 1,
        paddingHorizontal: responsiveWidth(5),
        paddingTop: responsiveHeight(3)
    },

    Button: {
        backgroundColor: Colors.light_skyblue,
        paddingHorizontal: responsiveWidth(15),
    },
    joinButton: {
        paddingHorizontal: responsiveWidth(15),
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: responsiveHeight(3)

    },

    btnText: {
        color: Colors.blue,
        fontWeight: '500',
    },
    joinText: {
        fontWeight: '500',
    },
    centeredContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

