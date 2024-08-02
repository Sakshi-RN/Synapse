import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import Swiper from 'react-native-swiper';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import images from '../../Themes/Images';
import Colors from '../../Themes/Colors';
import { Circle, Bell, Logo } from '../../Assets/svg'

const HomeScreen = () => {
    const careTeam = [
        { id: '1', name: 'Leena Joseph', role: 'LCSW', image: 'path/to/image' },
        { id: '2', name: 'Samuel Rush', role: 'MD', image: 'path/to/image' },
        { id: '3', name: 'Concierge', role: '', image: 'path/to/image' }
    ];

    const actions = [
        { id: '1', name: 'Survey History', icon: 'path/to/icon' },
        { id: '2', name: 'Appointment', icon: 'path/to/icon' },
        { id: '3', name: 'Treatment Summary', icon: 'path/to/icon' },
        { id: '4', name: 'Consent Form', icon: 'path/to/icon' },
        { id: '5', name: 'Device', icon: 'path/to/icon' }
    ];

    const renderHeader = () => {
        return (
            <ImageBackground source={images.bgHome} style={styles.headerContainer}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    height:responsiveHeight(6)
                }}>
                    <TouchableOpacity>
                        <Circle height={25} width={25} />
                    </TouchableOpacity>
                    <Logo height={100} width={120} />
                    <TouchableOpacity>
                        <Bell height={20} width={20} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.patientName}>Hello Nathan</Text>

                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop:responsiveHeight(1),
                    width:'85%',
                }}>
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
        )
    }
    const SwiperCode = ()=>{
return(
  
    <Swiper showsButtons={false} autoplay={true}>
    <View style={styles.slide}>
        <Text style={styles.slideText}>Prep Appointment Schedule</Text>
    </View>
    <View style={styles.slide}>
        <Text style={styles.slideText}> Integration Appointment</Text>
    </View>
    <View style={styles.slide}>
        <Text style={styles.slideText}>KAT Appointment</Text>
    </View>
</Swiper>

)
    }
    return (
        <View style={styles.container}>
            {renderHeader()}
            {SwiperCode()}

         

            {/* <View style={styles.reportsContainer}>
                <Text style={styles.reportsTitle}>Recent Reports</Text>
                <View style={styles.reportItem}>
                    <Text style={styles.reportDate}>July 07, 2024</Text>
                    <Text style={styles.reportTitle}>A Comprehensive Mental Health Report</Text>
                    <Text style={styles.reportAuthor}>Leena Joseph, LCSW</Text>
                    <Text style={styles.reportStats}>PHQ-9: 21 GAD-7: 12</Text>
                </View>
            </View>

            <View style={styles.careTeamContainer}>
                <Text style={styles.careTeamTitle}>Care Team</Text>
                <FlatList
                    data={careTeam}
                    horizontal
                    renderItem={({ item }) => (
                        <View style={styles.careTeamMember}>
                            <Image source={{ uri: item.image }} style={styles.careTeamImage} />
                            <Text style={styles.careTeamName}>{item.name}</Text>
                            <Text style={styles.careTeamRole}>{item.role}</Text>
                        </View>
                    )}
                    keyExtractor={item => item.id}
                />
            </View>

            <View style={styles.actionsContainer}>
                <Text style={styles.actionsTitle}>Other Action</Text>
                <FlatList
                    data={actions}
                    numColumns={3}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.actionButton}>
                            <Image source={{ uri: item.icon }} style={styles.actionIcon} />
                            <Text style={styles.actionName}>{item.name}</Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={item => item.id}
                />
            </View> */}
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
        height:responsiveHeight(28)

    },
    patientName: {
        color: Colors.white,
        fontWeight: '600',
        fontSize: responsiveFontSize(3)

    },
    patientDetail: {
        color: Colors.white,
        fontWeight: '500',
        fontSize: responsiveFontSize(1.8),
        lineHeight:20,

    },

    wrapper: {
        height: responsiveHeight(20),
    },
    slide: {
        padding:20,
       flexDirection:'row',
        alignItems: 'center',
        backgroundColor:Colors.white
    },
    slideText: {
        color: Colors.blue,
        fontSize: responsiveFontSize(1.5),
    },
    reportsContainer: {
        padding: responsiveWidth(4),
    },
    reportsTitle: {
        fontSize: responsiveFontSize(2.5),
        fontWeight: 'bold',
    },
    reportItem: {
        backgroundColor: '#e9e9e9',
        borderRadius: 10,
        padding: responsiveWidth(4),
        marginTop: responsiveHeight(1),
    },
    reportDate: {
        fontSize: responsiveFontSize(1.5),
    },
    reportTitle: {
        fontSize: responsiveFontSize(2),
        fontWeight: 'bold',
        marginTop: responsiveHeight(0.5),
    },
    reportAuthor: {
        fontSize: responsiveFontSize(1.5),
        marginTop: responsiveHeight(0.5),
    },
    reportStats: {
        fontSize: responsiveFontSize(1.5),
        marginTop: responsiveHeight(0.5),
    },
    careTeamContainer: {
        padding: responsiveWidth(4),
    },
    careTeamTitle: {
        fontSize: responsiveFontSize(2.5),
        fontWeight: 'bold',
    },
    careTeamMember: {
        alignItems: 'center',
        marginRight: responsiveWidth(2),
    },
    careTeamImage: {
        width: responsiveWidth(15),
        height: responsiveWidth(15),
        borderRadius: responsiveWidth(7.5),
    },
    careTeamName: {
        fontSize: responsiveFontSize(1.5),
        marginTop: responsiveHeight(0.5),
    },
    careTeamRole: {
        fontSize: responsiveFontSize(1.2),
        color: '#777',
    },
    actionsContainer: {
        padding: responsiveWidth(4),
    },
    actionsTitle: {
        fontSize: responsiveFontSize(2.5),
        fontWeight: 'bold',
        marginBottom: responsiveHeight(1),
    },
    actionButton: {
        width: responsiveWidth(28),
        alignItems: 'center',
        marginVertical: responsiveHeight(1),
    },
    actionIcon: {
        width: responsiveWidth(15),
        height: responsiveWidth(15),
    },
    actionName: {
        fontSize: responsiveFontSize(1.5),
        marginTop: responsiveHeight(0.5),
    },
});

export default HomeScreen;
