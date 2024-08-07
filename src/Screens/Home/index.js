import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import Swiper from 'react-native-swiper';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Colors from '../../Themes/Colors';
import { Circle, Bell, Logo, MeetIcon, Location, Arrowdown, Device, ConsentForm, TreatmentSummary, AppointmentImg, SurveyHistory, Download } from '../../Assets/svg';
import images from '../../Themes/Images'
import { ScrollView } from 'react-native-gesture-handler';
import LCSWImage from '../../Assets/Images/LCSW.png';
import MDImage from '../../Assets/Images/MD.png';
import ConciergeImage from '../../Assets/Images/Concierge.png';



const HomeScreen = () => {
    const careTeam = [
        { id: '1', name: 'Leena Joseph', role: 'LCSW', IconName: LCSWImage },
        { id: '2', name: 'Samuel Rush', role: 'MD', IconName: MDImage },
        { id: '3', name: 'Concierge', role: '', IconName: ConciergeImage }
    ];

    const actions = [
        { id: '1', name: 'Survey History', IconComponent: SurveyHistory },
        { id: '2', name: 'Appointment', IconComponent: AppointmentImg },
        { id: '3', name: 'Treatment Summary', IconComponent: TreatmentSummary },
        { id: '4', name: 'Consent Form', IconComponent: ConsentForm },
        { id: '5', name: 'Device', IconComponent: Device }
    ];

    const renderHeader = () => {
        return (
            <ImageBackground source={images.bgHome} style={styles.headerContainer}>
                <View style={styles.headerContent}>
                    <TouchableOpacity>
                        <Circle height={25} width={25} />
                    </TouchableOpacity>
                    <Logo height={100} width={120} />
                    <TouchableOpacity>
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
            <Swiper showsButtons={false} autoplay={false}>
                <View style={styles.slide}>
                    <Text style={styles.slideText}>Prep Session (Physical Visit)Leena Joseph, LCSW</Text>
                    <View style={styles.line} />
                    <View style={styles.blueContainer}>
                        <Text style={styles.slideTextSecondary}>July 5th 10:00am</Text>
                        <MeetIcon />
                    </View>
                </View>
                <View style={styles.slide}>
                    <Text style={styles.slideText}>You have made 20% improvement since last KAT session. See more...</Text>
                    <View style={styles.line} />
                    <View style={styles.blueContainer}>
                        <Text style={styles.slideTextHighlight}>20%</Text>
                    </View>
                    <Arrowdown />
                </View>
                <View style={styles.slide}>
                    <Text style={styles.slideText}>Your provider, Leena Joseph, LCSW has requested the survey to be completed.</Text>
                    <View style={styles.blueContainer}>
                        <Text style={styles.slideTextSecondary}>Start Survey</Text>
                    </View>
                </View>
            </Swiper>
        );
    };

    const actionConatiner = () => {
        return (
            <View style={{marginTop:responsiveHeight(1),paddingBottom:responsiveHeight(15)}}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity style={{ marginBottom: responsiveHeight(1) }}>
                        <SurveyHistory />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginHorizontal: responsiveWidth(3) }}>
                        <AppointmentImg />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <TreatmentSummary />
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: responsiveHeight(1) }}>
                    <TouchableOpacity>
                        <ConsentForm />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginLeft: responsiveWidth(3) }}>
                        <Device />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            {renderHeader()}
            {SwiperCode()}
            <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: responsiveHeight(3) }}>
                <Text style={styles.reportsTitle}>Recent Reports</Text>
                <View style={styles.reportItem}>
                    <Text style={styles.reportDate}>July 07, 2024</Text>
                    <Text style={styles.reportTitle}>A Comprehensive Mental Health Report</Text>
                    <Text style={styles.leenatext}>Leena Joseph, LCSW</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

                        <View style={{ flexDirection: 'row', marginTop: responsiveHeight(1), width: '40%', justifyContent: 'space-between' }}>
                            <View>
                                <Text style={styles.reportStats}>PHQ-9</Text>
                                <Text style={styles.countText}>12</Text>
                            </View>
                            <View >
                                <Text style={styles.reportStats}>GAD-7</Text>
                                <Text style={styles.countText}>21</Text>
                            </View>

                        </View>
                        <TouchableOpacity style={{marginTop:responsiveHeight(3)}}>
                        <Download />
                        </TouchableOpacity>
                      
                    </View>


                </View>
                <Text style={styles.careTeamTitle}>Care Team</Text>
                    <FlatList
                        data={careTeam}
                        horizontal
                        renderItem={({ item }) => (
                            <View style={styles.careTeamMember}>
                                <Image source={item.IconName} style={styles.careTeamImage} />
                                <Text style={styles.careTeamName}>{item.name}</Text>
                                <Text style={styles.careTeamRole}>{item.role}</Text>
                            </View>
                        )}
                        keyExtractor={item => item.id}
                    />


                <Text style={styles.actionsTitle}>Other Actions</Text>
                {actionConatiner()}

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white
    },
    headerContainer: {
        paddingTop: responsiveHeight(5),
        paddingHorizontal: responsiveWidth(8),
        height: responsiveHeight(28)
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: responsiveHeight(6)
    },
    patientName: {
        color: Colors.white,
        fontWeight: '600',
        fontSize: responsiveFontSize(3)
    },
    patientDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: responsiveHeight(1),
        width: '85%'
    },
    patientDetail: {
        color: Colors.white,
        fontWeight: '500',
        fontSize: responsiveFontSize(1.8),
        lineHeight: 20
    },
    slide: {
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Colors.white,
        shadowColor: Colors.grey,
        shadowOffset: { width: 1, height: 3 },
        shadowOpacity: 4,
        shadowRadius: 4,
        elevation: 5,
        alignSelf: 'center',
        borderRadius: 8,
        marginHorizontal: responsiveWidth(10),
        width: '85%'
    },
    slideText: {
        color: Colors.blue,
        fontSize: responsiveFontSize(1.3),
        width: '50%',
        fontWeight: '500'
    },
    slideTextSecondary: {
        color: Colors.black,
        fontWeight: '500',
        fontSize: responsiveFontSize(1.5),
        width: '40%'
    },
    slideTextHighlight: {
        color: Colors.black,
        fontWeight: '700',
        fontSize: responsiveFontSize(2)
    },
    blueContainer: {
        borderWidth: 1.5,
        borderColor: Colors.blue,
        backgroundColor: Colors.paleblue,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
        padding: 5
    },
    line: {
        height: 20,
        width: 1,
        backgroundColor: Colors.grey,
        marginHorizontal: responsiveWidth(3)
    },
    reportsContainer: {
        padding: responsiveWidth(4)
    },
    reportsTitle: {
        fontSize: responsiveFontSize(2.3),
        fontWeight: '600',
        marginTop: responsiveHeight(3),
        color: Colors.blue
    },
    reportItem: {
        backgroundColor: Colors.paleblue,
        borderRadius: 10,
        padding: responsiveWidth(4),
        marginTop: responsiveHeight(1)
    },
    reportDate: {
        fontSize: responsiveFontSize(1.5),
        color: Colors.darkgrey,
        fontWeight: '500'
    },
    reportTitle: {
        fontSize: responsiveFontSize(1.8),
        fontWeight: '700',
        color: Colors.black,
        marginTop: responsiveHeight(0.5)
    },
    leenatext: {
        fontSize: responsiveFontSize(1.5),
        fontWeight: '600',
        color: Colors.black,
        marginTop: responsiveHeight(0.5)
    },
    reportAuthor: {
        fontSize: responsiveFontSize(1.5),
        color: Colors.black
    },
    reportStats: {
        fontSize: responsiveFontSize(1.3),
        fontWeight: '600',
        color: Colors.black,
        marginTop: responsiveHeight(0.5)
    },
    countText: {
        fontSize: responsiveFontSize(2),
        fontWeight: '700',
        color: Colors.black,
        marginTop: responsiveHeight(0.5)
    },
    careTeamContainer: {
        padding: responsiveWidth(4)
    },
    careTeamTitle: {
        fontSize: responsiveFontSize(2.3),
        fontWeight: '600',
        marginTop: responsiveHeight(3),
        color: Colors.blue
    },
    careTeamMember: {
        marginTop:responsiveHeight(1.5),
        marginHorizontal:responsiveWidth(3)
    },
    careTeamImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    careTeamName: {
        fontSize: responsiveFontSize(1.2),
        fontWeight: '600',
        textAlign: 'center',
        marginTop:responsiveHeight(1)
    },
    careTeamRole: {
        fontSize: responsiveFontSize(1.2),
        color: Colors.black,
        textAlign: 'center',
        fontWeight: '500',
    },
    actionsContainer: {
        padding: responsiveWidth(4)
    },
    actionsTitle: {
        fontSize: responsiveFontSize(2.3),
        fontWeight: '600',
        marginTop: responsiveHeight(2),
        color: Colors.blue
    },
    actionButton: {
        flex: 1,
        alignItems: 'center',
        margin: responsiveWidth(2),
        backgroundColor: Colors.blue
    },
    actionIcon: {
        width: 40,
        height: 40,
        marginBottom: responsiveHeight(1)
    },
    actionName: {
        fontSize: responsiveFontSize(1.5),
        textAlign: 'center'
    }
});

export default HomeScreen;
