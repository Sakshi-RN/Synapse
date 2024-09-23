import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import Colors from '../../Themes/Colors';
import CustomHeader from '../../Components/CustomHeader';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { CheckboxIcon } from '../../Assets/svg';

const ConsentForm = () => {
    const navigation = useNavigation();
    
    // States for backend-controlled checkboxes
    const [therapistInformedConsent, setTherapistInformedConsent] = useState(false);
    const [therapistTelehealthConsent, setTherapistTelehealthConsent] = useState(false);
    const [prescriberInformedConsent, setPrescriberInformedConsent] = useState(false);

    // Fetch consent data from backend
    useEffect(() => {
        // Simulating an API call to fetch consent statuses
        const fetchConsentStatus = async () => {
            // Example backend call result
            const response = {
                therapistInformedConsent: true,
                therapistTelehealthConsent: false,
                prescriberInformedConsent: true,
            };

            // Set the consent statuses from the backend
            setTherapistInformedConsent(response.therapistInformedConsent);
            setTherapistTelehealthConsent(response.therapistTelehealthConsent);
            setPrescriberInformedConsent(response.prescriberInformedConsent);
        };

        fetchConsentStatus();
    }, []);

    const CustomCheckBox = ({ checked }) => (
        <>
            {checked ? (
                <CheckboxIcon/>
            ) : (
                <Icon name="square-o" size={23} color={Colors.blue} />
            )}
        </>
    );

    return (
        <View style={styles.container}>
            <CustomHeader title={'Consent Form'} />
            <View style={styles.content}>
                <Text style={styles.bodyText}>Therapist Consent</Text>
                <View style={styles.containerBox}>
                    <TouchableOpacity style={styles.containerView}>
                        <Text style={styles.nameTitleText}>Informed Consent</Text>
                        <CustomCheckBox checked={therapistInformedConsent} />
                    </TouchableOpacity>
                    <View style={styles.line} />
                    <TouchableOpacity style={styles.containerView}>
                        <Text style={styles.nameTitleText}>Telehealth Consent</Text>
                        <CustomCheckBox checked={therapistTelehealthConsent} />
                    </TouchableOpacity>
                </View>

                <Text style={styles.bodyText}>Prescriber Consent</Text>
                <View style={styles.containerBox}>
                    <TouchableOpacity style={styles.containerView}>
                        <Text style={styles.nameTitleText}>Informed Consent</Text>
                        <CustomCheckBox checked={prescriberInformedConsent} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default ConsentForm;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        paddingBottom: responsiveHeight(14),
    },
    content: {
        flex: 1,
        paddingHorizontal: responsiveWidth(6),
        paddingTop: responsiveHeight(2),

    },
    containerBox: {
        elevation: 5,
        shadowColor: Colors.black,
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        borderColor: Colors.light_skyblue,
        borderWidth: 1,
        borderRadius:4,
        backgroundColor: Colors.white,
        marginTop: responsiveHeight(1),
    },
    containerView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: responsiveWidth(4),
        paddingVertical: responsiveHeight(1.3),
    },
    nameTitleText: {
        fontSize: responsiveFontSize(1.6),
        fontWeight: '500',
        color: Colors.black,
    },
    bodyText: {
        fontSize: responsiveFontSize(1.6),
        color: Colors.blue,
        fontWeight: 'bold',
        marginTop: responsiveHeight(2),
    },
    line: {
        backgroundColor: Colors.light_skyblue,
        height: 1,
    },
  
});
