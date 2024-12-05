import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Colors from '../../Themes/Colors';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import { Fonts } from '../../Themes/fonts';


const AppointmentCard = ({ appointment }) => {
    const navigation = useNavigation();
    const formattedStartTime = moment(appointment.appointmentStartTime, 'HH:mm:ss').format('h:mm A');
    const formattedEndTime = moment(appointment.appointmentEndTime, 'HH:mm:ss').format('h:mm A');
    const formattedTime = `${formattedStartTime} - ${formattedEndTime}`;
    const formattedDate = moment(appointment.appointmentDate, 'MM/DD').format('MMMM DD');

    return (
        <View style={styles.detailsContainer}>
            <View style={styles.cardRow}>
                <View>
                    <Text style={styles.name}>Provider Details</Text>
                    <Text style={styles.name}>Therapist</Text>
                    <Text style={styles.type}>{appointment?.providerName}{' '}</Text>
                    <Text style={styles.type}>{appointment?.designation.join(', ')}</Text>
                </View>
                <View style={{ bottom: responsiveHeight(1) }}>
                    <Text style={[styles.nameNewText]}>Appointment Details</Text>
                    <Text style={styles.nameNewText}>Session</Text>
                    <Text style={styles.secondText}>{appointment?.appointmentType}</Text>
                </View>
            </View>
            <View style={[styles.cardRow, { bottom: responsiveHeight(3) }]}>
                <View>
                    <Text style={styles.name}>Facility Details</Text>
                    <Text style={styles.type}>{appointment?.facility?.facilityName}</Text>
                    <Text style={styles.type}>{appointment?.facility?.facilityAddress1}</Text>
                    <Text style={styles.type}>{appointment?.facility?.facilityCity}</Text>
                    <Text style={styles.type}>{appointment?.facility?.facilityState}{appointment?.facility?.facilityZip}</Text>
                </View>
                <View style={{ marginTop: responsiveHeight(5) }}>
                    <Text style={[styles.nameNewText]}>Date</Text>
                    <Text style={[styles.secondText]}>{formattedDate}{' '}</Text>
                    <Text style={styles.nameNewText}>Time</Text>
                    <Text style={[styles.secondText]}>{formattedTime}</Text>
                    <Text style={styles.nameNewText}>Type</Text>
                    <Text style={styles.secondText}>Virtual</Text>
                </View>
            </View>

            <TouchableOpacity
                style={
                    appointment.appointmentStatus === 'scheduled' ? styles.pendingButton :
                        appointment.appointmentStatus === 'upcoming' ? styles.upcomingButton :
                            appointment.appointmentStatus === 'completed' ? styles.completedButton :
                                appointment.appointmentStatus === 'cancelled' ? styles.cancelledButton :
                                    styles.defaultButton
                }
            >
                <Text
                    style={
                        appointment.appointmentStatus === 'scheduled' ? styles.pendingButtonText :
                            appointment.appointmentStatus === 'upcoming' ? styles.upcomingButtonText :
                                appointment.appointmentStatus === 'completed' ? styles.completedButtonText :
                                    appointment.appointmentStatus === 'cancelled' ? styles.cancelledButtonText :
                                        styles.buttonText
                    }
                >{appointment?.appointmentStatus
                    ? appointment.appointmentStatus.charAt(0).toUpperCase() + appointment.appointmentStatus.slice(1)
                    : ''}</Text>
            </TouchableOpacity>
            <>
                {appointment.appointmentStatus === 'completed' || appointment.appointmentStatus === 'upcoming' ?
                    <TouchableOpacity
                        style={
                            appointment.appointmentStatus === 'completed' ? styles.completedJoinButton :
                                appointment.appointmentStatus === 'upcoming' ? styles.upcomingJoinButton : 'null'
                        }
                        onPress={() => {
                            if (appointment.appointmentStatus === 'upcoming') {
                                navigation.navigate('JoinSession');
                            } else if (appointment.appointmentStatus === 'completed') {
                                navigation.navigate('ViewDetails');
                            }
                        }}>
                        <Text
                            style={
                                appointment.appointmentStatus === 'completed' ? styles.completedJoinButtonText :
                                    appointment.appointmentStatus === 'upcoming' ? styles.upcomingJoinButtonText : 'null'

                            }
                        >{appointment.appointmentStatus === 'completed' ? 'View Details' : appointment.appointmentStatus === 'upcoming' ? 'Join Session' : null}</Text>
                    </TouchableOpacity>
                    : ''
                }
            </>
            {/* <>
                    {appointment.appointmentStatus === 'scheduled' ?
                        <View style={styles.cancelbtnRow}>
                            <TouchableOpacity style={styles.declineButton }>
                                <Text style={styles.declineButtonText}>Decline</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.acceptButton}>
                                <Text style={styles.acceptButtonText}>Accept</Text>
                            </TouchableOpacity>
                        </View>
                        : ''
                    }
                </> */}
        </View>

    );
};

export default AppointmentCard;

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
    detailsContainer: {
        paddingHorizontal: responsiveWidth(5),
        paddingVertical: responsiveHeight(2),
        backgroundColor: Colors.white,
        shadowColor: Platform.OS === 'ios' ? Colors.grey : Colors.black,
        shadowOffset: {
            width: 0.5,
            height: 0.5,
        },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation: 5,
        marginVertical: responsiveHeight(1.5),
        borderRadius: 12,
        marginHorizontal: responsiveWidth(5),
        borderWidth: 1,
        borderColor: Colors.lightgrey,

    },
    name: {
        fontSize: responsiveFontSize(1.8),
        fontFamily: Fonts.Bold800,
        color: Colors.black,
        marginTop: responsiveHeight(1),
        width: responsiveWidth(38),

    },
    nameNewText: {
        fontSize: responsiveFontSize(1.8),
        fontFamily: Fonts.Bold800,
        color: Colors.black,
        marginTop: responsiveHeight(1),
        width: responsiveWidth(40),

    },
    type: {
        fontSize: responsiveFontSize(1.5),
        color: Colors.darkgrey,
       fontFamily: Fonts.Semibold700,
        width: responsiveWidth(38),
        marginTop:responsiveHeight(0.2)
    },
    secondText: {
        fontSize: responsiveFontSize(1.5),
        color: Colors.darkgrey,
       fontFamily: Fonts.Semibold700,
        width: responsiveWidth(40),
    },
    txetWidth: {
        width: responsiveHeight(60),
        marginRight: responsiveWidth(2)
    },
    pendingButton: {
        backgroundColor: Colors.PURPLE,
        padding: 3,
        borderRadius: 5,
        marginTop: responsiveHeight(1),
        alignItems: 'center',
        width: responsiveWidth(20)

    },
    upcomingButton: {
        backgroundColor: Colors.ORANGE,
        padding: 3,
        borderRadius: 5,
        marginTop: responsiveHeight(1),
        alignItems: 'center',
        width: responsiveWidth(20)

    },
    completedButton: {
        backgroundColor: Colors.GREEN,
        padding: 3,
        borderRadius: 5,
        marginTop: responsiveHeight(1),
        alignItems: 'center',
        width: responsiveWidth(20),
    },
    cancelledButton: {
        backgroundColor: Colors.PINK,
        padding: 3,
        borderRadius: 5,
        marginTop: responsiveHeight(1),
        alignItems: 'center',
        width: responsiveWidth(20)
    },
    defaultButton: {
        backgroundColor: Colors.default,
        paddingHorizontal: responsiveWidth(2.5),
        paddingVertical: responsiveHeight(2.5),
        alignSelf: 'center',
        borderRadius: 5,
        marginTop: responsiveHeight(1),

    },
    buttonText: {
        color: Colors.white,
        fontSize: responsiveFontSize(1.5),
       fontFamily: Fonts.Semibold700,
    },
    pendingButtonText: {
        color: Colors.Dark_Purple,
        fontSize: responsiveFontSize(1.3),
       fontFamily: Fonts.Semibold700,
    },
    upcomingButtonText: {
        color: Colors.Dark_Orange,
        fontSize: responsiveFontSize(1.3),
       fontFamily: Fonts.Semibold700,
    },
    completedButtonText: {
        color: Colors.Dark_Green,
        fontSize: responsiveFontSize(1.3),
       fontFamily: Fonts.Semibold700,
    },
    cancelledButtonText: {
        color: Colors.red,
        fontSize: responsiveFontSize(1.3),
       fontFamily: Fonts.Semibold700,
    },
    careTeamImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    rowStyle: {
        marginLeft: responsiveWidth(4),
        width: responsiveHeight(29),

    },
    upcomingJoinButton: {
        backgroundColor: Colors.blue,
        borderRadius: 8,
        paddingVertical: responsiveHeight(0.8),
        paddingHorizontal: responsiveWidth(15),
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: responsiveHeight(2),
    },
    completedJoinButton: {
        borderColor: Colors.black,
        borderRadius: 8,
        paddingVertical: responsiveHeight(0.8),
        paddingHorizontal: responsiveWidth(15),
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1.5,
        marginTop: responsiveHeight(2),
    },

    upcomingJoinButtonText: {
        color: Colors.white,
        fontSize: responsiveFontSize(1.8),
        fontWeight: '600'
    },
    completedJoinButtonText: {
        color: Colors.black,
        fontSize: responsiveFontSize(1.8),
        fontWeight: '600'

    },

    declineButton: {
        backgroundColor: Colors.PINK,
        paddingHorizontal: responsiveWidth(10),
        paddingVertical: responsiveHeight(1),
        borderRadius: 8,
        alignItems: 'center'
    },
    declineButtonText: {
        color: Colors.red,
        fontSize: responsiveFontSize(1.8),
        fontWeight: 'bold',
    },
    acceptButton: {
        backgroundColor: Colors.GREEN,
        paddingHorizontal: responsiveWidth(10),
        paddingVertical: responsiveHeight(1),
        borderRadius: 8,
        alignItems: 'center'
    },
    acceptButtonText: {
        color: Colors.Dark_Green,
        fontSize: responsiveFontSize(1.8),
        fontWeight: 'bold',
    },
    cancelbtnRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: responsiveHeight(0.2)
    },
    cardRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
});









