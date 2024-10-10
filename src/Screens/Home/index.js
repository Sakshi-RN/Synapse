import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, Image, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import Swiper from 'react-native-swiper';
import { Circle, Bell, Logo, MeetIcon, Location, Arrowdown, Device, ConsentForm, TreatmentSummary, AppointmentImg, SurveyHistory, Download, Concierge } from '../../Assets/svg';
import images from '../../Themes/Images'
import { ScrollView } from 'react-native-gesture-handler';
import LCSWImage from '../../Assets/Images/LCSW.png';
import MDImage from '../../Assets/Images/MD.png';
import styles from './styles';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { fetchProfile } from '../../redux/Reducers/profileReducer';
import Loader from '../../Components/Loader';
import { responsiveWidth } from 'react-native-responsive-dimensions';



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




    function formatAppointmentDate(dateString) {
        if (!dateString) return 'Invalid Date';

        const [month, day, year] = dateString.split('/');
        if (!month || !day || !year) return 'Invalid Date Format';

        const date = new Date(`${year}-${month}-${day}`);
        if (isNaN(date.getTime())) {
            return 'Invalid Date';
        }

        const options = { month: 'long', day: 'numeric' };
        const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
        const dayNumber = date.getDate();
        const suffix = dayNumber % 10 === 1 && dayNumber !== 11 ? 'st' :
            dayNumber % 10 === 2 && dayNumber !== 12 ? 'nd' :
                dayNumber % 10 === 3 && dayNumber !== 13 ? 'rd' : 'th';

        return `${formattedDate}${suffix}`;
    }


    function formatAppointmentTime(timeString) {
        if (!timeString) return 'Invalid Time';

        const [hours, minutes] = timeString.split(':');
        if (!hours || !minutes) return 'Invalid Time Format';

        const date = new Date();
        date.setHours(parseInt(hours, 10));
        date.setMinutes(parseInt(minutes, 10));

        if (isNaN(date.getTime())) {
            return 'Invalid Time';
        }

        // Extract the time in 12-hour format
        let time = date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });

        // Convert AM/PM to lowercase
        time = time.replace('AM', 'am').replace('PM', 'pm');

        return time;
    }

    function formatDateTime(dateTimeString) {
        if (!dateTimeString) return 'N/A';  // Handle cases where date is undefined

        const [datePart, timePart] = dateTimeString.split(' ');  // Split date and time
        const [month, day, year] = datePart.split('/');  // Split MM/DD/YYYY

        const formattedDate = new Date(`${year}-${month}-${day}T${timePart}:00`);  // Create a new Date object

        // Format the date using Intl.DateTimeFormat for better readability
        const options = { year: 'numeric', month: 'numeric', day: 'numeric', };
        return new Intl.DateTimeFormat('en-US', options).format(formattedDate);
    }


    const handleAppointment = () => {
        navigation.navigate('Appointment');
    }

    const handlNotification = () => {
        navigation.navigate('Notification');
    }


    const handleSurveyHistory = () => {
        navigation.navigate('SurveyHistory');
    }

    const handleTreatmentSummary = () => {
        navigation.navigate('TreatmentSummary');
    }
    const handleConsentForm = () => {
        navigation.navigate('ConsentForm');
    }

    const handleConnect = () => {
        navigation.navigate('Connect');
    }


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
                <Text style={styles.patientName}>Hello {`${profile?.firstName||''} ${profile?.lastName||''}`}{', '}</Text>
            </ImageBackground>
        );
    };

    const SwiperCode = () => {
        return (
            <View style={styles.swiperView}>
                <Swiper showsButtons={false} autoplay={false}
                    dot={<View style={styles.dot} />}
                    activeDot={<View style={styles.activeDot} />}
                >
                    <View style={styles.slide}>
                        <View>
                            <Text style={styles.slideText}>
                                <Text>{profile?.nextAppointment?.appointmentType} ({profile?.nextAppointment?.visitType}) {profile?.therapist?.providerName},</Text></Text>
                            <Text style={styles.therapistRoleText}>{profile?.therapist?.designation?.join(', ')}</Text>
                        </View>
                        <View style={styles.line} />
                        <View style={styles.blueContainer}>
                            <Text style={styles.slideTextSecondary}>
                                {formatAppointmentDate(profile?.nextAppointment?.appointmentDate)} {formatAppointmentTime(profile?.nextAppointment?.appointmentStartTime)}
                            </Text>
                            <MeetIcon />
                        </View>
                    </View>
                    <View style={styles.slide}>
                    <View>
                            <Text style={styles.slideText}>
                                <Text>{profile?.nextAppointment?.appointmentType} ({profile?.nextAppointment?.visitType}) {profile?.therapist?.providerName},</Text></Text>
                            <Text style={styles.therapistRoleText}>{profile?.therapist?.designation?.join(', ')}</Text>
                        </View>
                        <View style={styles.line} />
                        <View style={styles.blueContainer}>
                            <Text style={styles.slideTextSecondary}>
                                {formatAppointmentDate(profile?.nextAppointment?.appointmentDate)} {formatAppointmentTime(profile?.nextAppointment?.appointmentStartTime)}
                            </Text>
                            <Location />
                        </View>
                    </View>
                    <View style={styles.slide}>
                        <Text style={styles.slideText}><Text>You have made 20% improvement since last KAT session.</Text><Text style={styles.seemoreText}> See more...</Text></Text>
                        <View style={styles.line} />
                        <View style={styles.blueviewContainer}>
                            <Text style={styles.slideTextHighlight}>20%</Text>
                        </View>
                        <Arrowdown />
                    </View>
                    <View style={styles.slide}>
                        <Text style={styles.slideText}><Text>Your provider,</Text>
                            <Text>{profile?.therapist?.providerName},{' '}</Text>
                            <Text style={styles.therapistRoleText}>{profile?.therapist?.designation?.join(', ')}{' '}</Text>
                            <Text>has requested the survey to be completed.</Text>
                        </Text>
                        <View style={styles.line} />
                        <View style={styles.blueviewContainer}>
                            <Text style={styles.startsurveytext}>Start Survey</Text>
                        </View>
                    </View>
                </Swiper>
            </View>
        );
    };

    const actionConatiner = () => {
        return (
            <View style={styles.actionView}>
                <View style={styles.actionStyle}>
                    <TouchableOpacity style={styles.surveyBtnStyle} onPress={handleSurveyHistory}>
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
                    <TouchableOpacity style={styles.devicebtnStyle} onPress={handleConnect}>
                        <Device />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    const reportSection = () => {
        return (
            <View style={styles.reportItem}>
                <Text style={styles.reportDate}>{formatDateTime(profile?.lastPHQCompletedDate)}</Text>
                <Text style={styles.reportTitle}>A Comprehensive Mental Health Report</Text>
                <View style={styles.rowNew}>
                    <Text style={styles.leenatext}>{profile?.therapist?.providerName}{','} {profile?.therapist?.designation?.join(', ')}</Text>
                </View>
                <View style={styles.reportContainer}>
                    <View style={styles.phqConatiner}>
                        <View>
                            <Text style={styles.reportStats}>PHQ-9</Text>
                            <Text style={styles.countText}>{profile?.lastPHQScore}</Text>
                        </View>
                        <View >
                            <Text style={styles.reportStats}>ACE</Text>
                            <Text style={styles.countText}>{profile?.aceScore}</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.downloadBtnStyle}>
                        <Download />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    const flatlistView = () => {
        return (
            <>
                <View style={styles.careTeamRow}>
                    <TouchableOpacity>
                    <Image source={{ uri: profile?.therapist?.profilePicture }} style={styles.careTeamImage} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                    <Image source={{ uri: profile?.prescriber?.profilePicture }} style={styles.careTeamImage} />
                        </TouchableOpacity>
                    <Concierge />
                </View>
                <View style={styles.rowNew}>
                    <Text style={styles.careTeamName}>{profile?.therapist?.providerName}</Text>
                    <Text style={[styles.careTeamName,{width:responsiveWidth(24)}]}>{profile?.prescriber?.providerName}</Text>
                    <Text style={styles.careTeamName}>Concierge</Text>
                </View>
                <View style={styles.rowNew}>
                    <Text style={[styles.careTeamRole, { width: responsiveWidth(23) }]}>{profile?.therapist?.designation?.join(', ')}</Text>
                    <Text style={styles.careTeamRole}>{profile?.prescriber?.designation?.join(', ')}</Text>
                    <Text style={styles.ConcergeName}></Text>
                </View>
            </>
        )
    }

    return (
        <View style={styles.container}>
            {renderHeader()}
            {SwiperCode()}
            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollContent}>
                <Text style={styles.reportsTitle}>Recent Reports</Text>
                {reportSection()}
                <Text style={styles.careTeamTitle}>My Care Team</Text>
                {flatlistView()}
                <Text style={styles.actionsTitle}>Other Action</Text>
                {actionConatiner()}
            </ScrollView>
        </View>
    );
};



export default HomeScreen;
