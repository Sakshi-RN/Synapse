
import React from 'react';
import { View, StyleSheet, } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Colors from '../../Themes/Colors';
import CustomHeader from '../../Components/CustomHeader';
import CustomButton from '../../Components/CustomButton';
import CommonInput from '../../Components/CommonInput';
import { useNavigation } from '@react-navigation/native';

const EditEmergencyContacts = () => {
    const navigation = useNavigation();

    const handleEmergencycontacts = () => {
        navigation.navigate('Emergencycontacts');
    };
    const handleGoBack = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <CustomHeader title={'Edit Emergency contacts'} />
            <View style={styles.content}>
                <CommonInput
                    placeholder={'First Name'}
                    title={'Emergency Contact First Name'}
                />
                <CommonInput
                    placeholder={'Last Name'}
                    title={'Emergency Contact Last Name'}
                />
                <CommonInput
                    placeholder={'Phone Number'}
                    title={'Emergency Contact Phone Number'}

                />
                <CommonInput
                    placeholder={'Select Relation'}
                    title={'What is your Emergency contact relation to you?'}
                    iconName={"chevron-down"}
                />
                <View style={styles.row}>
                    <CustomButton
                        buttonStyle={styles.Button}
                        textStyle={styles.btnText}
                        title={'Cancel'}
                        onPress={handleGoBack} />
                    <CustomButton
                        buttonStyle={styles.joinButton}
                        textStyle={styles.joinText}
                        title={'Save'}
                        onPress={handleEmergencycontacts} />
                </View>
            </View>
        </View>


    );
};

export default EditEmergencyContacts;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    content: {
        flex: 1,
        paddingHorizontal: responsiveWidth(5),
    },

    Button: {
        backgroundColor: Colors.light_skyblue,
        paddingHorizontal: responsiveWidth(15),
    },
    joinButton: {
        paddingHorizontal: responsiveWidth(17),
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
    }
});

