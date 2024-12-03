import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Colors from '../../Themes/Colors';
import { useNavigation } from '@react-navigation/native';
import { MeetIcon } from '../../Assets/svg';
import { Fonts } from '../../Themes/fonts';


const UpcomingAppointmentCard = () => {
    const navigation = useNavigation();
    // const formattedStartTime = moment(appointment.appointmentStartTime, 'HH:mm:ss').format('h:mm A');
    // const formattedEndTime = moment(appointment.appointmentEndTime, 'HH:mm:ss').format('h:mm A');
    // const formattedTime = `${formattedStartTime} - ${formattedEndTime}`;
    // const formattedDate = moment(appointment.appointmentDate, 'MM/DD').format('MMMM DD');

    return (
        <View>
            <View>
                <Text style={styles.name}>Upcoming Appointment</Text>
                <View style={styles.rowStyle}>
                    <Text style={styles.name}>Leena Joseph</Text>
                    <MeetIcon />
                    {/* {profile?.nextAppointment?.visitType === "Virtual" ? <MeetIcon /> : <Location />} */}
                </View>
                <Text style={styles.type}>Integration Appointment . In person</Text>
                <Text style={styles.type}>Dec 5th . 10:00 am - 10:30 am</Text>
            </View>
            <TouchableOpacity style={styles.upcomingButton}>
                <Text style={styles.upcomingButtonText}>Upcoming</Text>
            </TouchableOpacity>
            <View style={styles.calenderView}>
                <Text style={styles.calenderViewText}>Wed, Dec 11th, 08:00am - 08:30am</Text>
            </View>
            <TouchableOpacity style={styles.JoinButton}>
                <Text style={styles.JoinButtonText}>
                    {/* {appointment.appointmentStatus === 'completed' ? 'View Map' : appointment.appointmentStatus === 'upcoming' ? 'Join Session' : null} */}
                    Join Session
                </Text>
            </TouchableOpacity>
        </View>

    );
};

export default UpcomingAppointmentCard;

const styles = StyleSheet.create({
    cardContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    time: {
        transform: [{ rotate: '-90deg' }],
        fontSize: responsiveFontSize(1.4),
        fontWeight: '500',
        color: Colors.darkgrey,
        textAlign: 'center',
        marginTop: responsiveHeight(1.3),


    },

    name: {
        fontSize: responsiveFontSize(2),
        fontFamily: Fonts.Bold800,
        color: Colors.blue,

    },

    type: {
        fontSize: responsiveFontSize(1.3),
        color: Colors.newgrey,
        fontFamily: Fonts.Semibold700,
        marginTop: responsiveHeight(0.2)
    },

    upcomingButton: {
        backgroundColor: Colors.ORANGE,
        padding: 2,
        borderRadius: 5,
        marginTop: responsiveHeight(1),
        alignItems: 'center',
        width: responsiveWidth(18)

    },

    buttonText: {
        color: Colors.white,
        fontSize: responsiveFontSize(1.5),
        fontFamily: Fonts.Semibold700,
    },
    upcomingButtonText: {
        color: Colors.Dark_Orange,
        fontSize: responsiveFontSize(1.2),
        fontFamily: Fonts.Semibold700,
    },


    rowStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: responsiveHeight(1.5)

    },
JoinButton: {
        backgroundColor: '#274E6D',
        borderRadius: 8,
        paddingVertical: responsiveHeight(0.8),
        paddingHorizontal: responsiveWidth(15),
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: responsiveHeight(1.5),
    },

    calenderView: {
        backgroundColor: Colors.bg_Color,
        borderRadius: 8,
        paddingVertical: responsiveHeight(1),
        paddingHorizontal: responsiveWidth(4),
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: responsiveHeight(1.5),
    },
    calenderViewText: {
        color: Colors.blue,
        fontSize: responsiveFontSize(1.7),
        fontFamily: Fonts.Medium600
    },


    JoinButtonText: {
        color: Colors.white,
        fontSize: responsiveFontSize(1.7),
        fontFamily: Fonts.Medium600,
    },

});









