import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import Colors from '../../Themes/Colors';
import CustomHeader from '../../Components/CustomHeader';
import CustomButton from '../../Components/CustomButton';
import InputContainer from '../../Components/InputContainer';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { CheckboxIcon } from '../../Assets/svg';
import Icon from 'react-native-vector-icons/FontAwesome';


const ConsentForTelehealth = () => {

    const navigation = useNavigation();
    const [isChecked, setIsChecked] = useState(false);

    const handleGoBack = () => {
        navigation.goBack();
    };

    const handleCheckboxPress = () => {
        setIsChecked(!isChecked);
    };

    const renderContent = () => {
        return (
            <View style={styles.consentTextContainer}>
                <Text style={styles.consentTitle}>Consent For Telehealth Services</Text>
                <Text style={styles.consentText}>
                    Teletherapy is a form of psychological service provided via internet technology, which can include consultation,
                    treatment, transfer of medical data, emails, telephone conversations and/or education using interactive audio,
                    video, or data communications. Teletherapy has the same purpose or intention as psychotherapy or psychological
                    treatment sessions that are conducted in person. However, due to the
                    nature of the technology used, I understand that teletherapy may be experienced somewhat differently than face-to-face
                    treatment sessions. I understand that it is in my therapist’s sole discretion whether Teletherapy is appropriate.
                    Times Teletherapy may be appropriate include during times of illness or inclement weather for continuity of care.
                </Text>
                <Text style={styles.consentText}>
                    If both therapist and client agree to engage in Teletherapy as a treatment modality, I agree to the following:
                </Text>

                <Text style={styles.consentText}>
                    I understand that teletherapy involves the communication of my medical/mental health information, both orally
                    and/or visually. I agree to utilize a secure and HIPAA compliant means for communication to ensure confidentiality
                    and the protection of private information. I understand I need to be a resident of Colorado.
                </Text>

                <Text style={styles.consentText}>
                    I understand that there are risks and consequences of participating in teletherapy, including, but not limited to,
                    the possibility that the transmission of my information could be disrupted or distorted by technical failures.
                    The transmission of my information could be interrupted by unauthorized persons.
                </Text>
            </View>
        )
    }
    const renderCheckbox = () => {
        return (
            <View style={styles.checkboxContainer}>
                <TouchableOpacity style={styles.checkbox} onPress={handleCheckboxPress}>
                    {isChecked && <CheckboxIcon />}
                    {!isChecked && <Icon name="square-o" size={23} color={Colors.blue} />}
                </TouchableOpacity>
                <Text style={styles.checkboxLabel}>
                    I agree that I have read and understand the telehealth disclosure and consent form.
                </Text>
            </View>

        )
    }
    const renderInput = () => {
        return (
            <>
                <InputContainer
                    placeholder={'Full Name'}
                    title={'Client Full Name'}
                    titleColor={styles.nametitleStyle}
                />
                <InputContainer
                    placeholder={'MM/DD/YYYY'}
                    title={'Client Date Of Birthday'}
                    titleColor={styles.dobStyle}
                    iconName="calendar"
                />
            </>
        )
    }



    return (

        <View style={styles.container}>
            <CustomHeader title={'Consent Form'} />
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {renderInput()}
                {renderContent()}
                {renderCheckbox()}
                <Text style={styles.signatureText}>Signature</Text>
                <Text style={styles.dateText}>04/11/2024 12:10PM</Text>
                <CustomButton
                    buttonStyle={styles.submitButton}
                    title={'Submit'}
                    onPress={handleGoBack}
                />

            </ScrollView>
        </View>

    );
};

export default ConsentForTelehealth;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        paddingBottom: responsiveHeight(14)
    },
    content: {
        paddingHorizontal: responsiveWidth(5),
        marginTop: responsiveHeight(2)
    },
    nametitleStyle: {
        width: responsiveWidth(28),
    },
    dobStyle: {
        width: responsiveWidth(38),
    },
    consentTextContainer: {
        marginVertical: responsiveHeight(2),
    },
    consentTitle: {
        fontSize: responsiveFontSize(2),
        fontWeight: '600',
        color: Colors.blue,
        marginBottom: responsiveHeight(1),
    },
    consentText: {
        fontSize: responsiveFontSize(1.6),
        color: Colors.black,
        lineHeight: responsiveHeight(2),
        fontWeight: '500',
    },
    checkboxContainer: {
        flexDirection: 'row',

    },
    checkbox: {
        marginRight: responsiveWidth(2),
    },
    checkboxLabel: {
        fontSize: responsiveFontSize(1.6),
        color: Colors.black,
        fontWeight: '500',
    },

    signatureText: {
        fontSize: responsiveFontSize(1.7),
        fontWeight: 'bold',
        color: Colors.black,
        marginTop: responsiveHeight(6)
    },
    dateText: {
        fontSize: responsiveFontSize(1.6),
        color: Colors.black,
        marginTop: responsiveHeight(0.5),
        fontWeight: '500',

    },
    submitButton: {
        paddingHorizontal: responsiveWidth(6),
        alignSelf: 'center',
        marginTop: responsiveHeight(3),
    },
});
