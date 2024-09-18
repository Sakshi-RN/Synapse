
import React from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import Colors from '../../Themes/Colors';
import CustomHeader from '../../Components/CustomHeader';
import CustomButton from '../../Components/CustomButton';
import InputContainer from '../../Components/InputContainer';
import { useNavigation } from '@react-navigation/native';

const EditProfile = () => {

    const navigation = useNavigation()
    const handleMyProfileScreen = () => {
        navigation.navigate('MyProfileScreen');
      }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <CustomHeader title={'Edit Profile'} />
                    <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                        <View style={styles.profileContainer}>
                            <Text style={styles.profileName}>NK</Text>
                        </View>
                        <InputContainer
                            placeholder={' Full Name'}
                            title={'Name'}
                            titleColor={styles.nametitleStyle}
                        />
                        <InputContainer
                            placeholder={'Email Address'}
                            title={'Email Address'}
                            titleColor={styles.emailTitle}
                        />
                        <InputContainer
                            placeholder={'Phone Number'}
                            title={'Phone Number'}
                            titleColor={styles.phoneTitle}
                        />
                        <InputContainer
                            placeholder={'Male'}
                            title={'Gender'}
                            titleColor={styles.genderStyle}
                            iconName={"chevron-down"}
                        />
                        <InputContainer
                            placeholder={'MM/DD/YYYY'}
                            title={'Date Of Birthday'}
                            titleColor={styles.dobStyle}
                            iconName="calendar"
                        />
                        <InputContainer
                            placeholder={'Weight (in pounds)'}
                            title={'Weight (in pounds)'}
                            titleColor={styles.weightStyle}
                            iconName={"chevron-down"}
                        />
                        <Text style={styles.name}>Address</Text>
                        <InputContainer
                            placeholder={'Street Address'}
                            title={'Street Address'}
                            titleColor={styles.streetsStyle}
                        />
                        <InputContainer
                            placeholder={'Address 2'}
                            title={'Address 2'}
                            titleColor={styles.addressStyle}
                        />
                        <InputContainer
                            placeholder={'City'}
                            title={'City'}
                            titleColor={styles.cityStyle}
                        />
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <InputContainer
                                placeholder={'State'}
                                title={'State'}
                                titleColor={styles.stateStyle}
                                inputStyle={styles.stateWidth}
                                iconName={"chevron-down"}
                            />
                            <InputContainer
                                placeholder={'Zip Code'}
                                title={'Zip Code'}
                                titleColor={styles.zipCodeStyle}
                                inputStyle={styles.widthStyle}
                            />
                        </View>
                    </ScrollView>
                    <View style={styles.row}>
                        <CustomButton
                            buttonStyle={styles.Button}
                            textStyle={styles.btnText}
                            title={'Cancel'} 
                            onPress={handleMyProfileScreen}/>
                        <CustomButton
                            buttonStyle={styles.joinButton}
                            textStyle={styles.joinText}
                            title={'Save'}
                            onPress={handleMyProfileScreen} />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>

    );
};

export default EditProfile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        paddingBottom: Platform.OS === 'ios' ? responsiveHeight(14) : responsiveHeight(7)
    },
    content: {
        paddingHorizontal: responsiveWidth(5),
    },

    Button: {
        backgroundColor: Colors.light_skyblue,
        paddingHorizontal: responsiveWidth(16),
    },
    joinButton: {
        paddingHorizontal: responsiveWidth(16),
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: responsiveWidth(5),
        marginTop:responsiveHeight(2)

    },

    btnText: {
        color: Colors.blue,
        fontWeight: '500',
    },
    joinText: {
        fontWeight: '500',
    },

    name: {
        fontSize: responsiveFontSize(1.6),
        fontWeight: 'bold',
        color: Colors.black,
        marginTop: responsiveHeight(1),
    },

    titleStyle: {
        fontSize: responsiveFontSize(1.6),
        color: Colors.black
    },
    profileContainer: {
        backgroundColor: Colors.blue,
        width: 60,
        height: 60,
        borderRadius: 30,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: responsiveHeight(3)
    },
    profileName: {
        color: Colors.white,
        fontWeight: '400',
        fontSize: responsiveFontSize(2.5)
    },

    nametitleStyle: {
        width: responsiveWidth(14),
    },
    emailTitle: {
        width: responsiveWidth(26.5),
    },
    phoneTitle: {
        width: responsiveWidth(27),
    },
    genderStyle: {
        width: responsiveWidth(16),
    },

    dobStyle: {
        width: responsiveWidth(30),
    },
    weightStyle: {
        width: responsiveWidth(33),
    },
    streetsStyle: {
        width: responsiveWidth(27),
    },

    addressStyle: {
        width: responsiveWidth(20),
    },
    cityStyle: {
        width: responsiveWidth(10.5),
    },
    stateStyle: {
        width: responsiveWidth(12.5),
    },
    zipCodeStyle: {
        width: responsiveWidth(18),
    },
    widthStyle: {
        width: responsiveWidth(45),
    },
    stateWidth: {
        width: responsiveWidth(42)
    }
});

