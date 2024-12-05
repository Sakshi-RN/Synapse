import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import { Circle, Bell, Logo, Device, ConsentForm, TreatmentSummary, AppointmentImg, SurveyHistory, TherapistIcn, PrescriberIcn, ConceirgeIcn } from '../../Assets/svg';
import images from '../../Themes/Images'
import styles from './styles';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { fetchProfile } from '../../redux/Reducers/profileReducer';
import Loader from '../../Components/Loader';
import UpcomingAppointmentCard from '../../Container/UpcomingAppointmentCard';


const HomeScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { data, fetchLoading } = useSelector(state => state.profile);


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

    const profile = data && data[0];






    const handleAppointment = () => {
        navigation.navigate('AppointmentStack');
    }

    const handlNotification = () => {
        navigation.navigate('Notification');
    }


    const handleSurveyHistory = () => {
        navigation.navigate('PHQ');
    }

    const handleTreatmentSummary = () => {
        navigation.navigate('TreatmentSummary');
    }
    const handleConsentForm = () => {
        navigation.navigate('ConsentForm');
    }
    const handleTherapistProfile = () => {
        navigation.navigate('PrescriberProfile', { providerID: profile?.therapist?.providerID, facilityId: profile?.therapist?.facilityId });
    };

    const handlePrescriberProfile = () => {
        navigation.navigate('PrescriberProfile', { providerID: profile?.prescriber?.providerID, facilityId: profile?.prescriber?.facilityId });
    };

    const renderHeader = () => {
        return (
            <View source={images.headerBgImg} style={styles.headerContainer}>
                <View style={styles.headerContent}>
                    <TouchableOpacity>
                        <Circle height={25} width={25} />
                    </TouchableOpacity>
                    <Logo height={100} width={120} />
                    <TouchableOpacity onPress={handlNotification}>
                        <Bell height={20} width={20} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.patientName}>Hello {profile?.firstName || ''} </Text>
            </View>
        );
    };

    const actionConatiner = () => {
        return (
            <View style={styles.actionView}>
                <View style={styles.actionStyle}>
                    <TouchableOpacity onPress={handleSurveyHistory}>
                        <SurveyHistory />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.appointmentStyle} onPress={handleAppointment}>
                        <AppointmentImg />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleTreatmentSummary}>
                        <TreatmentSummary />
                    </TouchableOpacity>
                </View>
                <View style={styles.consentRow}>
                    <TouchableOpacity onPress={handleConsentForm}>
                        <ConsentForm />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.devicebtnStyle}>
                        <Device />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    const flatlistView = () => {
        return (

            <View style={styles.careTeamRow}>
              {profile?.therapist === null ?<></>:
                <TouchableOpacity style={styles.careTeamBox} onPress={handleTherapistProfile}>
                    <TherapistIcn />
                    <Text style={styles.nameNewStyle}>THERAPIST</Text>
                    <Text style={styles.careTeamName}>{profile?.therapist?.providerName}</Text>
                    <Text style={[styles.careTeamRole]}>{profile?.therapist?.designation?.join(', ')}</Text>
                </TouchableOpacity>}
                {profile?.prescriber === null ?<></>:
                <TouchableOpacity style={styles.careTeamBox} onPress={handlePrescriberProfile}>
                    <PrescriberIcn />
                    <Text style={styles.nameNewStyle}>PRESCRIBER</Text>
                    <Text style={styles.careTeamName}>{profile?.prescriber?.providerName}</Text>
                    <Text style={[styles.careTeamRole]}>{profile?.prescriber?.designation?.join(', ')}</Text>
                </TouchableOpacity>}
                <View style={styles.conciregeView}>
                    <ConceirgeIcn />
                </View>

            </View>

        )
    }


    return (
        <View style={styles.container}>
            {renderHeader()}
            <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* <Text style={styles.reportsTitle}>Process</Text>
                {processContainer()} */}
                   <View style={styles.commonContainer}>
                    <UpcomingAppointmentCard/>
                   </View>
                <View style={styles.commonContainer}>
                    <Text style={styles.reportsTitle}>My Care Team</Text>
                    {flatlistView()}
                </View>
                <View style={styles.commonContainer}>
                    <Text style={styles.reportsTitle}>Other Action</Text>
                    {actionConatiner()}
                </View>
                </ScrollView>
                {/* <Text style={{  fontFamily: Fonts.RegularFigtree500 }}>regular</Text>
            <Text style={{  fontFamily: Fonts.Light400 }}>light</Text>
            <Text style={{  fontFamily: Fonts.Bold800 }}>bold</Text>
            <Text style={{  fontFamily: Fonts.Medium600 }}>medium</Text>
            <Text style={{  fontFamily: Fonts.Semibold700 }}>semibold</Text> */}
   
        </View>
    );
};



export default HomeScreen;
