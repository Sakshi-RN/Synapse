import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Image, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import Swiper from 'react-native-swiper';
import { Circle, Bell, Logo, MeetIcon, Location, Arrowdown, Device, ConsentForm, TreatmentSummary, AppointmentImg, SurveyHistory, Download } from '../../Assets/svg';
import images from '../../Themes/Images'
import { ScrollView } from 'react-native-gesture-handler';
import LCSWImage from '../../Assets/Images/LCSW.png';
import MDImage from '../../Assets/Images/MD.png';
import ConciergeImage from '../../Assets/Images/Concierge.png';
import styles from './styles';



const HomeScreen = () => {
    const navigation = useNavigation();

    const careTeam = [
        { id: '1', name: 'Leena Joseph', role: 'LCSW', IconName: LCSWImage },
        { id: '2', name: 'Samuel Rush', role: 'MD', IconName: MDImage },
        { id: '3', name: 'Concierge', role: '', IconName: ConciergeImage }
    ];

    const handleAppointment = () => {
        navigation.navigate('Appointment');
    }

    const handlNotification = () => {
        navigation.navigate('Notification');
    }


    const handleCareTeam = () => {
        navigation.navigate('CareTeam');
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
            <ImageBackground source={images.bgHome} style={styles.headerContainer}>
                <View style={styles.headerContent}>
                    <TouchableOpacity>
                        <Circle height={25} width={25} />
                    </TouchableOpacity>
                    <Logo height={100} width={120} />
                    <TouchableOpacity onPress={handlNotification}>
                        <Bell height={20} width={20} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.patientName}>Hello Nathan</Text>
                <View style={styles.patientDetails}>
                    <View>
                        <Text style={styles.patientDetail}>Age</Text>
                        <Text style={styles.patientDetail}>38 yrs</Text>
                    </View>
                    <View>
                        <Text style={styles.patientDetail}>Gender</Text>
                        <Text style={styles.patientDetail}> Male</Text>
                    </View>
                    <View>
                        <Text style={styles.patientDetail}>User ID</Text>
                        <Text style={styles.patientDetail}> 3356635915</Text>
                    </View>
                </View>
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
                        <Text style={styles.slideText}>Prep Session (Virtual) Leena Joseph, LCSW</Text>
                        <View style={styles.line} />
                        <View style={styles.blueContainer}>
                            <Text style={styles.slideTextSecondary}>July 5th 10:00am</Text>
                            <MeetIcon />
                        </View>
                    </View>
                    <View style={styles.slide}>
                        <Text style={styles.slideText}>Prep Session (Physical Visit) Leena Joseph, LCSW</Text>
                        <View style={styles.line} />
                        <View style={styles.blueContainer}>
                            <Text style={styles.slideTextSecondary}>July 5th 10:00am</Text>
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
                        <Text style={styles.slideText}>Your provider, Leena Joseph, LCSW has requested the survey to be completed.</Text>
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
                <Text style={styles.reportDate}>July 07, 2024</Text>
                <Text style={styles.reportTitle}>A Comprehensive Mental Health Report</Text>
                <Text style={styles.leenatext}>Leena Joseph, LCSW</Text>
                <View style={styles.reportContainer}>

                    <View style={styles.phqConatiner}>
                        <View>
                            <Text style={styles.reportStats}>PHQ-9</Text>
                            <Text style={styles.countText}>12</Text>
                        </View>
                        <View >
                            <Text style={styles.reportStats}>GAD-7</Text>
                            <Text style={styles.countText}>21</Text>
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
            <FlatList
                data={careTeam}
                horizontal
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.careTeamMember} onPress={handleCareTeam}>
                        <Image source={item.IconName} style={styles.careTeamImage} />
                        <Text style={styles.careTeamName}>{item.name}</Text>
                        <Text style={styles.careTeamRole}>{item.role}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={item => item.id}
            />
        )
    }

    return (
        <View style={styles.container}>
            {renderHeader()}
            {SwiperCode()}
            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollContent}>
                <Text style={styles.reportsTitle}>Recent Reports</Text>
                {reportSection()}
                <Text style={styles.careTeamTitle}>Care Team</Text>
                {flatlistView()}
                <Text style={styles.actionsTitle}>Other Action</Text>
                {actionConatiner()}
            </ScrollView>
        </View>
    );
};



export default HomeScreen;
