import React from 'react';
import {
    View, Text, StyleSheet, ImageBackground,
    TouchableOpacity, KeyboardAvoidingView, Platform,
    TouchableWithoutFeedback, Keyboard,ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BackIcon, Logo } from '../../Assets/svg';
import images from '../../Themes/Images';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Colors from '../../Themes/Colors';
import OTPInput from '../../Container/OTPInput';
import CustomButton from '../../Components/CustomButton';

const OTPVerification = () => {
    const navigation = useNavigation();


    const handleGoBack = () => {
        navigation.goBack();
    };

    const handleSubmit = () => {
        navigation.navigate('BTabNavigation');
    };

    return (
        <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.content}
      >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView style={styles.container}>
                    <ImageBackground source={images.bgImg} style={styles.imageBackground}>
                        <View style={styles.row}>
                            <TouchableOpacity onPress={handleGoBack}>
                                <BackIcon />
                            </TouchableOpacity>
                            <Logo width={160} />
                        </View>
                    </ImageBackground>
                    <View style={styles.formContainer}>
                        <Text style={styles.title}>Enter Code</Text>
                        <Text style={styles.centerText}>Please enter the code that sent to your Email Id.</Text>
                        <OTPInput length={6} />
                        <TouchableOpacity>
                            <Text style={styles.resendText}>Resend Code</Text>
                        </TouchableOpacity>
                        <CustomButton
                            title="Submit"
                            buttonStyle={styles.btnStyle}
                            onPress={handleSubmit}
                        />
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    content: { flex: 1, backgroundColor: Colors.white },
    container: {
        flex: 1,
    },
    imageBackground: {
        height:  Platform.OS === 'ios' ?responsiveHeight(50):responsiveHeight(54),
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop:Platform.OS === 'ios' ? responsiveHeight(8):responsiveHeight(5),
        paddingLeft: responsiveWidth(8),
        justifyContent: 'space-between',
        width: '70%',
    },
    formContainer: {
        flex: 1,

    },
    title: {
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: responsiveFontSize(3),
        color: Colors.black,
        marginTop: responsiveHeight(2),

    },
    centerText: {
        marginTop: responsiveHeight(2),
        alignSelf: 'center',
        fontSize: responsiveFontSize(2),
        textAlign: 'center',
        marginHorizontal: responsiveWidth(7),
        color: Colors.grey,
        marginBottom: responsiveHeight(3),


    },
    btnStyle: {
        alignSelf: 'center',
        marginTop: responsiveHeight(3),
    },
    resendText: {
        color: Colors.darkgrey,
        alignSelf: 'flex-end',
        marginRight: responsiveWidth(5),
        fontSize: responsiveFontSize(1.5),
        marginTop: responsiveHeight(1),
    },
});

export default OTPVerification;
