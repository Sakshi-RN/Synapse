import React from 'react';
import {
    View, Text, StyleSheet, ImageBackground,
    TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Logo } from '../../Assets/svg';
import images from '../../Themes/Images';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Colors from '../../Themes/Colors';
import CustomTextInput from '../../Components/CustomTextInput';
import CustomButton from '../../Components/CustomButton';

const SignIn = () => {
    const navigation = useNavigation();

    const handleVerifyPress = () => {
        navigation.navigate('OtpVerify');
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.content}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView>
                    <ImageBackground source={images.bgImg} style={styles.container}>
                        <Logo width={160} />
                    </ImageBackground>
                        <View style={styles.formContainer}>
                            <Text style={styles.title}>Enter your Email Id</Text>
                            <Text style={styles.centerText}>
                                Please confirm your Email Id and Enter
                                the code sent to your Email Id.
                            </Text>
                            <CustomTextInput
                                placeholder="Enter your Email Id"
                                inputStyle={styles.centerStyle}
                            />
                            <CustomButton
                                title='Verify'
                                buttonStyle={styles.btnStyle}
                                onPress={handleVerifyPress}
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
        height:  Platform.OS === 'ios' ?responsiveHeight(50):responsiveHeight(54),
        alignItems: 'center',
        paddingTop:Platform.OS === 'ios' ? responsiveHeight(8):responsiveHeight(5),

    },

    formContainer: {
        flex: 1,
    },
    title: {
        marginTop: responsiveHeight(2),
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: responsiveFontSize(3),
        color: Colors.black
    },
    centerText: {
        marginTop: responsiveHeight(2),
        fontSize: responsiveFontSize(2),
        textAlign: 'center',
        marginHorizontal: responsiveWidth(7),
        color: Colors.grey
    },
    centerStyle: {
        marginTop: responsiveHeight(3),
        marginHorizontal: responsiveWidth(5)
    },
    btnStyle: {
        alignSelf: 'center',
        marginTop: responsiveHeight(5)
    }
});

export default SignIn;
