
import React from 'react';
import { View, StyleSheet, Text, TextInput, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import Colors from '../../Themes/Colors';
import CustomHeader from '../../Components/CustomHeader';
import CustomButton from '../../Components/CustomButton';
import CustomCalender from '../../Components/CustomCalender';
import TimePicker from '../../Components/TimePicker';
import InputContainer from '../../Container/InputContainer';

const JoinSession = () => {
    return (
        <View style={styles.container}>
            <CustomHeader title={'Reschedule Request'} />
            <ScrollView style={styles.scrollViewContent}>
                <Text style={styles.name}>Available Date</Text>
                <CustomCalender />
                <Text style={styles.name}>Choose Time Slot</Text>
                <TimePicker />
                <InputContainer />
            </ScrollView>
            <View style={styles.row}>
                <CustomButton
                    buttonStyle={styles.Button}
                    textStyle={styles.btnText}
                    title={'Cancel'} />
                <CustomButton
                    buttonStyle={styles.joinButton}
                    textStyle={styles.joinText}
                    title={'Confirm'} />
            </View>
        </View>
    );
};

export default JoinSession;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        justifyContent: 'space-between',
    },
    scrollViewContent: { flex: 1 },
    Button: {
        backgroundColor: Colors.white,
        borderColor: Colors.blue,
        borderWidth: 1.5,
        paddingHorizontal: responsiveWidth(14),
    },
    joinButton: {
        paddingHorizontal: responsiveWidth(14),
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        bottom: responsiveHeight(13),
        paddingHorizontal: responsiveWidth(4),
    },
    contentPadding: {
        marginHorizontal: responsiveWidth(5),
        marginTop: responsiveHeight(4),
    },
    btnText: {
        color: Colors.black,
        fontWeight: '500',
    },
    joinText: {
        fontWeight: '500',
    },
    upcomingBtn: {
        backgroundColor: Colors.ORANGE,
    },
    upcomingText: {
        color: Colors.Dark_Orange,
    },
    name: {
        fontSize: responsiveFontSize(1.8),
        fontWeight: '700',
        color: Colors.blue,
        marginTop: responsiveHeight(3),
        marginLeft: responsiveWidth(3),
    },
    dateContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: responsiveWidth(16),
        height: responsiveHeight(10),
        borderRadius: 6,
        marginHorizontal: responsiveWidth(0.8),
        backgroundColor: Colors.lightgrey,
        marginTop: responsiveHeight(2),
    },
    selectedDateContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: responsiveWidth(16),
        height: responsiveHeight(10),
        borderRadius: 6,
        marginHorizontal: responsiveWidth(0.8),
        backgroundColor: Colors.blue,
        marginTop: responsiveHeight(2),
    },
    dateText: {
        color: Colors.darkgrey,
        fontSize: responsiveFontSize(2.5),
        fontWeight: '500',
    },
    selectedDateText: {
        fontSize: responsiveFontSize(2.5),
        fontWeight: '500',
        color: Colors.white,
    },
    dayText: {
        color: Colors.grey,
        fontSize: responsiveFontSize(1.7),
        fontWeight: '600',
    },
    selectedDayText: {
        color: Colors.white,
        fontSize: responsiveFontSize(1.7),
    },

});

