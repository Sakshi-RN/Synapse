import React, { useState } from 'react';
import {
    View, Text, StyleSheet, ImageBackground,
    TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, ScrollView, Alert
} from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { Logo } from '../../Assets/svg';
import images from '../../Themes/Images';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Colors from '../../Themes/Colors';
import CustomTextInput from '../../Components/CustomTextInput';
import CustomButton from '../../Components/CustomButton';
import axios from 'axios';
import Loader from '../../Components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignIn = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const handleVerifyPress = async () => {
        if (!email.trim()) {
            setErrorMessage('Please enter email id');
            return;
        }

        setIsLoading(true);

        try {
            const apiKey = 'e1693d9245c57be86afc22ad06eda84c9cdb74dae6d56a8a7f71a93facb1f42b';
            const response = await axios.post(
                'https://eb1.taramind.com/client/login',
                { email },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-API-KEY': apiKey,
                    },
                }
            );

            setIsLoading(false);

            if (response.data.message === "Email exists") {
                const clientID = response.data.data.clientID;        

                if (clientID) {
                    await AsyncStorage.setItem('authclientID', clientID);
                    Alert.alert('Success', 'Logged in Successfully');
                    navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [{ name: 'BTabNavigation' }],
                        })
                    );
                } else {
                    setErrorMessage('Failed to retrieve clientID.');
                }
            } else {
                setErrorMessage('Email does not exist');
            }
        } catch (error) {
            setIsLoading(false);
            console.error(error);
            setErrorMessage('An error occurred. Please try again.');
        }
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
                            value={email}
                            onChangeText={(text) => {
                                setEmail(text);
                                setErrorMessage(''); 
                            }}
                            inputStyle={styles.centerStyle}
                        />
                        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
                        {isLoading && <Loader />}
                        <CustomButton
                            title={'Verify'}
                            buttonStyle={styles.btnStyle}
                            onPress={handleVerifyPress}
                            disabled={isLoading}
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
        height: Platform.OS === 'ios' ? responsiveHeight(50) : responsiveHeight(54),
        alignItems: 'center',
        paddingTop: Platform.OS === 'ios' ? responsiveHeight(8) : responsiveHeight(5),
    },
    formContainer: {
        flex: 1,
    },
    title: {
        marginTop: responsiveHeight(2),
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: responsiveFontSize(3),
        color: Colors.black,
    },
    centerText: {
        marginTop: responsiveHeight(1.5),
        fontSize: responsiveFontSize(2),
        textAlign: 'center',
        marginHorizontal: responsiveWidth(7),
        color: Colors.grey,
    },
    centerStyle: {
        marginHorizontal: responsiveWidth(5),
        bottom: responsiveHeight(1),
    },
    btnStyle: {
        alignSelf: 'center',
        marginTop: responsiveHeight(4),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: 'red',
        marginTop: responsiveHeight(1),
        marginLeft: responsiveWidth(6),
    },
});

export default SignIn;
