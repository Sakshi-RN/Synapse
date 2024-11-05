
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import Colors from '../../Themes/Colors';
import CustomHeader from '../../Components/CustomHeader';
import CustomButton from '../../Components/CustomButton';
import CommonStyle from '../../Components/CommonStyle';
import { ScrollView } from 'react-native-gesture-handler';
import { Signature } from '../../Assets/svg';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { fetchProfile } from '../../redux/Reducers/profileReducer'; 
import Loader from '../../Components/Loader';
import TreatmentSummaryText from '../../Container/TreatmentSummaryText'

const TreatmentSummary = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { data, fetchLoading, fetchError } = useSelector(state => state.profile);

    useFocusEffect(
        useCallback(() => {
            dispatch(fetchProfile());
        }, [dispatch])
    );

    if (fetchLoading) {
        return (
            <View style={styles.centeredContainer}>
                <Loader />
            </View>
        );
    }
    if (fetchError) {
        return (
            <View style={styles.centeredContainer}>
            <Text style={styles.errorText}>Failed to load data. Please try again later.</Text>
        </View>
        );
    }

    const profile = data && data[0];

    if (!profile) {
        return (
            <View style={styles.centeredContainer}>
            <Text style={styles.errorText}>No data available.</Text>
        </View>
        );
    }
    const xdata = [
        { id: '1', text: 'Based on this evaluation, this individual IS deemed appropriate for ketamine-assisted therapy treatment at this time.' },
        { id: '2', text: 'Based on this evaluation and the client\'s ACE score, it is recommended that this client receive the standard protocol.' },
        { id: '3', text: 'Checking this box is my request to have diagnosis-specific rating scales sent electronically by synapse to the patient automatically, at predetermined intervals.' },
        { id: '4', text: 'The critical role of these rating scales in their treatment was discussed with the client, and they were instructed to promptly fill out all rating scales sent to them throughout and after their treatment course. The client has been informed that the first set will be sent for completion before the first preparation therapy session.' },
        { id: '5', text: 'Client will schedule a preparation therapy session with this therapist.' },
        { id: '6', text: 'Client has been instructed to contact this therapist with any pressing concerns between therapy sessions.' },
        { id: '7', text: 'Document any additional recommendations, instructions, or concerns.' }
    ];


    const handleGoBack = () => {
        navigation.goBack();
    };
    function capitalizeFirstLetter(value) {
        if (typeof value !== 'string') return '';
        return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    }

  

function parseDate(dobString) {
    const parts = dobString.split('/');
    return new Date(`${parts[2]}-${parts[0]}-${parts[1]}`); 
}

    function calculateAge(birthDateString) {
        if (!birthDateString) {
            return 'N/A'; 
        }
    
        const birthDate = parseDate(birthDateString);
        if (isNaN(birthDate.getTime())) {
            return 'Invalid Date'; 
        }
    
        const currentDate = new Date();
        let age = currentDate.getFullYear() - birthDate.getFullYear();
        const monthDifference = currentDate.getMonth() - birthDate.getMonth();
    
        if (
            monthDifference < 0 ||
            (monthDifference === 0 && currentDate.getDate() < birthDate.getDate())
        ) {
            age--;
        }
    
        return age;
    }
    
    const age = calculateAge(profile.dob);

    const renderHealthDetails = () => {
        return (
            <View style={styles.containerBox}>
                <View style={styles.containerView}>
                    <Text style={CommonStyle.nameTitleText}>Client Name</Text>
                    <Text style={styles.bodyText}>{`${profile.firstName} ${profile.lastName}`}</Text>
                </View>
                <View style={styles.line} />
                <View style={styles.containerView}>
                    <Text style={CommonStyle.nameTitleText}>Gender</Text>
                    <Text style={styles.bodyText}>{capitalizeFirstLetter(profile?.gender)}</Text>
                </View>
                <View style={styles.line} />
                <View style={styles.containerView}>
                    <Text style={CommonStyle.nameTitleText}>Date Of Birth</Text>
                    <Text style={styles.bodyText}>{profile.dob}</Text>
                </View>
                <View style={styles.line} />
                <View style={styles.containerView}>
                    <Text style={CommonStyle.nameTitleText}>Age</Text>
                    <Text style={styles.bodyText}>{age} Years</Text>
                </View>
                <View style={styles.line} />
                <View style={styles.containerView}>
                    <Text style={CommonStyle.nameTitleText}>Weight (in pounds)</Text>
                    <Text style={styles.bodyText}>{profile.clientCurrentWeight} lbs</Text>
                </View>
                <View style={styles.line} />
                <View style={styles.containerView}>
                    <Text style={CommonStyle.nameTitleText}>Height</Text>
                    <Text style={styles.bodyText}>{profile.clientCurrentHeight}</Text>

                </View>
                <View style={styles.line} />
                <View style={styles.containerView}>
                    <Text style={CommonStyle.nameTitleText}>Insurance</Text>
                    <Text style={styles.bodyText}>{profile.insurance}</Text>

                </View>
                <View style={styles.line} />
                <View style={styles.containerView}>
                    <Text style={CommonStyle.nameTitleText}>Coverage Start Date</Text>
                    <Text style={styles.bodyText}>{profile.coverageBeginDate}</Text>

                </View>
                <View style={styles.line} />
                <View style={styles.containerView}>
                    <Text style={CommonStyle.nameTitleText}>Coverage End Date</Text>
                    <Text style={styles.bodyText}>{profile.coverageEndDate}</Text>
                </View>
                <View style={styles.line} />
                <View style={styles.containerView}>
                    <Text style={CommonStyle.nameTitleText}>Therapist</Text>
                    <Text style={styles.bodyText}>{profile?.therapist?.providerName}</Text>
                </View>
                <View style={styles.line} />
                <View style={styles.containerView}>
                    <Text style={CommonStyle.nameTitleText}>Prescriber</Text>
                    <Text style={styles.bodyText}>{profile?.prescriber?.providerName}</Text>
                </View>
                <View style={styles.line} />
                <View style={styles.containerView}>
                    <Text style={CommonStyle.nameTitleText}>Protocol</Text>
                    <Text style={styles.bodyText}>{profile.protocol}</Text>
                </View>
            </View>
        )
    }
    


    return (
        <View style={styles.container}>
            <CustomHeader title={'Treatment Summary'} />
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {renderHealthDetails()}
         <TreatmentSummaryText/>
         <Text style={styles.nameText}>{profile?.therapist?.providerName}</Text>
            </ScrollView>
            <CustomButton
                buttonStyle={styles.joinButton}
                title={'Back'}
                onPress={handleGoBack}
            />
        </View>
    );
};

export default TreatmentSummary;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        paddingBottom: responsiveHeight(14)
    },
    content: {
        flex: 1,
        paddingHorizontal: responsiveWidth(5),
        paddingTop: responsiveHeight(3),

    },


    joinButton: {
        paddingHorizontal: responsiveWidth(8),
        alignSelf: 'center'
    },


    containerBox: {
        elevation: 5,
        shadowColor: Colors.black,
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        borderColor: Colors.light_skyblue,
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: Colors.white,

    },
    containerView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: responsiveWidth(3),
        paddingVertical: responsiveHeight(0.5),


    },
    nameTitleText: {
        fontSize: responsiveFontSize(1.8),
        fontWeight: '400',
        color: Colors.black,

    },
    bodyText: {
        fontSize: responsiveFontSize(1.6),
        color: Colors.blue,
        fontWeight: 'bold',

    },
    line: {
        backgroundColor: Colors.light_skyblue,
        height: 1,

    },

    nameText: {
        fontSize: responsiveFontSize(1.8),
        fontWeight: '600',
        color: Colors.black,
        top: responsiveHeight(-11),
        marginTop:responsiveHeight(1.5)

    },

    errorText: {
        color: Colors.red,
        fontSize: responsiveFontSize(2),
    },
    centeredContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },



});

