
import React, { useCallback } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Colors from '../../Themes/Colors';
import CustomHeader from '../../Components/CustomHeader';
import CustomButton from '../../Components/CustomButton';
import { Fonts } from '../../Themes/fonts';
import commonStyles from '../../Components/CommonStyle';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { fetchProfile } from '../../redux/Reducers/profileReducer';
import Loader from '../../Components/Loader';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

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
                <View style={commonStyles.container}>
                    <View style={commonStyles.containerView}>
                        <Text style={styles.nameTitleText}>First Name</Text>
                        <Text style={styles.bodyText}>{profile?.emergencyContactFirstName}</Text>
                    </View>
                    <View style={commonStyles.containerView}>
                        <Text style={styles.nameTitleText}>Last Name</Text>
                        <Text style={styles.bodyText}>{profile?.emergencyContactLastName}</Text>
                    </View>
                    <View style={commonStyles.containerView}>
                        <Text style={styles.nameTitleText}>Phone Number</Text>
                        <Text style={styles.bodyText}>{profile?.emergencyContactPhone}</Text>
                    </View>
                    <View style={commonStyles.bottomView}>
                    <Text style={styles.nameTitleText}>What is your relation with that person?</Text>
                    <Text style={styles.bodyText}>{profile?.emergencyContactRelation}</Text>
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
        fontFamily: Fonts.Medium600,
    },
    joinText: {
        fontFamily: Fonts.Semibold700,
    },
    centeredContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
 
      nameTitleText: {
        fontSize: responsiveFontSize(1.8),
        fontFamily: Fonts.Medium600,
        color:Colors.black,
        marginVertical:responsiveHeight(1.3),
        width:responsiveWidth(50)
    
      },
      bodyText: {
        fontSize: responsiveFontSize(1.5),
        color:Colors.blue,
        fontFamily: Fonts.Bold800,
        marginVertical:responsiveHeight(1.5),
    
      },
});

