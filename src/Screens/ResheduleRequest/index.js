
import React from 'react';
import { View, StyleSheet, Text, ScrollView, } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import Colors from '../../Themes/Colors';
import CustomHeader from '../../Components/CustomHeader';
import CustomButton from '../../Components/CustomButton';
import CustomCalender from '../../Components/CustomCalender';
import TimePicker from '../../Components/TimePicker';
import InputContainer from '../../Components/InputContainer';

const JoinSession = () => {
    return (
                <View style={styles.container}>
                    <CustomHeader title={'Reschedule Request'} />
                    <ScrollView>
                        <Text style={styles.name}>Available Date</Text>
                        <CustomCalender />
                        <Text style={styles.name}>Choose Time Slot</Text>
                        <TimePicker />
                        <View style={styles.content}>
                        <InputContainer
                            placeholder={'Write your reason here'}
                            title={'Write your reason'}
                            titleColor={styles.titleStyle}
                            showAsterisk={false}
                        />
                        </View>
                      
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
    },

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
        position: 'absolute',

    },

    btnText: {
        color: Colors.black,
        fontWeight: '500',
    },
    joinText: {
        fontWeight: '500',
    },

    name: {
        fontSize: responsiveFontSize(1.8),
        fontWeight: '700',
        color: Colors.blue,
        marginTop: responsiveHeight(3),
        marginLeft: responsiveWidth(3),
    },
  
    titleStyle: {
        fontSize: responsiveFontSize(1.6),
        color: Colors.black
    },
    content:{
        paddingHorizontal:responsiveWidth(3)
            },

});

