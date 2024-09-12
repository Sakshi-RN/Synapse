import React, { useState } from 'react';
import { View, StyleSheet, Platform, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, ScrollView } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Colors from '../../Themes/Colors';
import CustomHeader from '../../Components/CustomHeader';
import CustomButton from '../../Components/CustomButton';
import CustomTextInput from '../../Components/CustomTextInput';


const ReasonforChange = () => {

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <>
                    <CustomHeader title={'Reason for Change'} />
                    <ScrollView style={styles.scrollConatiner}>
                        <CustomTextInput
                            inputStyle={styles.input}
                            title={'The Provider you selected'}
                            placeholder={'Samuel Rush'}

                        />
                        <CustomTextInput
                            inputStyle={styles.input}
                            title={'Write the reason why you want to change your current provider'}
                            placeholder={'Write your reason here'}
                        />
                    </ScrollView>
                    <View style={styles.cancelbtnRow}>
                        <CustomButton
                            buttonStyle={styles.Button}
                            textStyle={styles.ButtonText}
                            title={'Cancel'} />
                        <CustomButton
                            title={'Save'} />
                    </View>

                </>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

export default ReasonforChange;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: responsiveHeight(14),
        backgroundColor: Colors.white
    },


    Button: {
        backgroundColor: Colors.skyblue,
    },
    ButtonText: {
        color: Colors.blue
    },

    cancelbtnRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '85%',
        position: 'absolute',
        bottom: responsiveHeight(15), 
        alignSelf: 'center',
    },

    scrollConatiner: {
        marginHorizontal: responsiveWidth(5)
    },
    input: {
        borderWidth: 1.1,
        borderColor: Colors.darkgrey,
        borderRadius: 4,
        marginTop: responsiveHeight(1),
        backgroundColor: Colors.white
    }

});
