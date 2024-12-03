import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { Circle, Bell, Logo, MeetIcon, Location, Device, ConsentForm, TreatmentSummary, AppointmentImg, SurveyHistory, TherapistIcn, PrescriberIcn, ConceirgeIcn } from '../../Assets/svg';
import images from '../../Themes/Images'
import styles from './styles';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { fetchProfile } from '../../redux/Reducers/profileReducer';
import Loader from '../../Components/Loader';



const HomeScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { data, fetchLoading } = useSelector(state => state.profile);

    const phases = [
        { label: 'Intake', active: true },
        { label: 'Preparation', active: true },
        { label: 'Treatment 1', active: false },
        { label: 'Integration 1', active: false },
        { label: 'Treatment 2', active: false },
        { label: 'Integration 2', active: false },
        { label: 'Treatment 3', active: false },
        { label: 'Integration 3', active: false },
    ];

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

    function formatAppointmentDate(dateString) {
        if (!dateString) return '';

        const [month, day, year] = dateString.split('/');
        if (!month || !day || !year) return '';

        const date = new Date(`${year}-${month}-${day}`);
        if (isNaN(date.getTime())) {
            return '';
        }

        const options = { month: 'short' };
        const formattedMonth = new Intl.DateTimeFormat('en-US', options).format(date);
        const dayNumber = date.getDate();
        const suffix = dayNumber % 10 === 1 && dayNumber !== 11 ? 'st' :
            dayNumber % 10 === 2 && dayNumber !== 12 ? 'nd' :
                dayNumber % 10 === 3 && dayNumber !== 13 ? 'rd' : 'th';

        return `${formattedMonth} ${dayNumber}${suffix}`;
    }


    function formatAppointmentTime(timeString) {
        if (!timeString) return 'N/A';

        const [hours, minutes] = timeString.split(':');
        if (!hours || !minutes) return 'N/A';

        const date = new Date();
        date.setHours(parseInt(hours, 10));
        date.setMinutes(parseInt(minutes, 10));

        if (isNaN(date.getTime())) {
            return 'N/A';
        }


        let time = date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
        time = time.replace('AM', 'am').replace('PM', 'pm');
        return time;
    }

    function formatDateTime(dateTimeString) {
        if (!dateTimeString) return 'N/A';
        const [datePart, timePart] = dateTimeString.split(' ');
        const [month, day, year] = datePart.split('/');
        const formattedDate = new Date(`${year}-${month}-${day}T${timePart}:00`);
        const options = { year: 'numeric', month: 'numeric', day: 'numeric', };
        return new Intl.DateTimeFormat('en-US', options).format(formattedDate);
    }


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
            <ImageBackground source={images.headerBgImg} style={styles.headerContainer}>
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
                {profile?.nextAppointment?.appointmentDate ?
                    <View style={styles.slide}>
                        <View>
                            <Text style={styles.slideText}>
                                <Text>{profile?.nextAppointment?.appointmentType} ({profile?.nextAppointment?.visitType})</Text></Text>
                            <Text style={styles.slideText}>{profile?.therapist?.providerName}</Text>
                            <Text style={styles.therapistRoleText}>{profile?.therapist?.designation?.join(', ')}</Text>
                        </View>
                        <View style={styles.line} />
                        <View style={styles.blueContainer}>
                            <Text style={styles.slideTextSecondary}>
                                {formatAppointmentDate(profile?.nextAppointment?.appointmentDate)} {formatAppointmentTime(profile?.nextAppointment?.appointmentStartTime)}
                            </Text>
                            {profile?.nextAppointment?.visitType === "Virtual" ? <MeetIcon /> : <Location />}
                        </View>
                    </View>
                    : null}
            </ImageBackground>
        );
    };

    const SwiperCode = () => {
        return (
            <>
            </>
            // <View style={styles.swiperView}>
            //     {/* <Swiper showsButtons={false} autoplay={false}
            //         dot={<View style={styles.dot} />}
            //         activeDot={<View style={styles.activeDot}/>}
            //     > */}


            //              {/* <View style={styles.slide}>
            //             <Text style={styles.slideText}><Text>You have made 20% improvement since last KAT session.</Text><Text style={styles.seemoreText}> See more...</Text></Text>
            //             <View style={styles.line} />
            //             <View style={styles.blueviewContainer}>
            //                 <Text style={styles.slideTextHighlight}>20%</Text>
            //             </View>
            //             <Arrowdown />
            //         </View>
            //         <View style={styles.slide}>
            //             <Text style={styles.slideText}><Text>Your provider,</Text>
            //                 <Text>{profile?.therapist?.providerName},{' '}</Text>
            //                 <Text style={styles.therapistRoleText}>{profile?.therapist?.designation?.join(', ')}{' '}</Text>
            //                 <Text>has requested the survey to be completed.</Text>
            //             </Text>
            //             <View style={styles.line} />
            //             <View style={styles.blueviewContainer}>
            //                 <Text style={styles.startsurveytext}>Start Survey</Text>
            //             </View>
            //         </View> */}
            //     {/* </Swiper> */}
            // </View>
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
                <TouchableOpacity style={styles.careTeamBox} onPress={handleTherapistProfile}>
                    <TherapistIcn />
                    <Text style={styles.nameNewStyle}>THERAPIST</Text>
                    <Text style={styles.careTeamName}>{profile?.therapist?.providerName}</Text>
                    <Text style={[styles.careTeamRole]}>{profile?.therapist?.designation?.join(', ')}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.careTeamBox} onPress={handlePrescriberProfile}>
                    <PrescriberIcn />
                    <Text style={styles.nameNewStyle}>PRESCRIBER</Text>
                    <Text style={styles.careTeamName}>{profile?.prescriber?.providerName}</Text>
                    <Text style={[styles.careTeamRole]}>{profile?.prescriber?.designation?.join(', ')}</Text>
                </TouchableOpacity>
                <View style={styles.conciregeView}>
                    <ConceirgeIcn />
                </View>

            </View>

        )
    }


    return (
        <View style={styles.container}>
            {renderHeader()}
            <View style={styles.scrollContent}>
                {/* <Text style={styles.reportsTitle}>Process</Text>
                {processContainer()} */}
                <View style={styles.commonContainer}>
                    <Text style={styles.reportsTitle}>My Care Team</Text>
                    {flatlistView()}
                </View>
                <View style={styles.commonContainer}>
                    <Text style={styles.reportsTitle}>Other Action</Text>
                    {actionConatiner()}
                </View>
                {/* <Text style={{  fontFamily: Fonts.RegularFigtree500 }}>regular</Text>
            <Text style={{  fontFamily: Fonts.Light400 }}>light</Text>
            <Text style={{  fontFamily: Fonts.Bold800 }}>bold</Text>
            <Text style={{  fontFamily: Fonts.Medium600 }}>medium</Text>
            <Text style={{  fontFamily: Fonts.Semibold700 }}>semibold</Text> */}
            </View>
        </View>
    );
};



export default HomeScreen;
