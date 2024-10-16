


import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Platform } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import moment from 'moment';
import LCSWImage from '../../Assets/Images/LCSW.png';
import Colors from '../../Themes/Colors';
import { useNavigation } from '@react-navigation/native';
import CustomHeader from '../../Components/CustomHeader';
import Icon from 'react-native-vector-icons/Ionicons';
import Loader from '../../Components/Loader';

const ViewAllAppointments = () => {
    const navigation = useNavigation();
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await fetch(
                    'https://eb1.taramind.com/getAllClientAppointments/9bfea3d5-74f4-11ef-9c86-02f35b8058b3',
                    {
                        method: 'GET',
                        headers: {
                            'X-Api-Key': 'e1693d9245c57be86afc22ad06eda84c9cdb74dae6d56a8a7f71a93facb1f42b',
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch appointments');
                }

                const data = await response.json();
                setAppointments(data);

            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, []);

    const renderAppointmentCard = (appointment) => {
        const formattedDate = moment(appointment.appointmentDate, 'MM/DD').format('MMMM Do');
        const formattedStartTime = moment(appointment.appointmentStartTime, 'HH:mm:ss').format('h:mm A');
        const formattedEndTime = moment(appointment.appointmentEndTime, 'HH:mm:ss').format('h:mm A');
        const formattedTime = `${formattedStartTime} - ${formattedEndTime}`;

        return (
            <View key={appointment.appointmentID} style={styles.detailsContainer}>
                <View style={{ flexDirection: 'row' }}>
                    <Image source={LCSWImage} style={styles.careTeamImage} />
                    <View style={styles.rowStyle}>
                        <Text style={styles.name}>{appointment.providerName}</Text>
                        <Text style={styles.type}>{appointment.appointmentType}</Text>
                        <Text style={styles.type}>{formattedDate}{' - '}{formattedTime}</Text>
                        <TouchableOpacity
                            style={
                                appointment.appointmentStatus === 'scheduled' ? styles.upcomingButton :
                                    appointment.appointmentStatus === 'completed' ? styles.completedButton :
                                        styles.defaultButton
                            }
                        >
                            <Text
                                style={
                                    appointment.appointmentStatus === 'scheduled' ? styles.upcomingButtonText :
                                        appointment.appointmentStatus === 'completed' ? styles.completedButtonText :
                                            styles.buttonText
                                }
                            >
                                {appointment.appointmentStatus}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>


                <TouchableOpacity
                    style={
                        appointment.appointmentStatus === 'scheduled' ? styles.upcomingJoinButton :
                            appointment.appointmentStatus === 'completed' ? styles.completedJoinButton : null
                    }
                    onPress={() => {
                        if (appointment.appointmentStatus === 'scheduled') {

                        } else if (appointment.appointmentStatus === 'completed') {

                        }
                    }}
                >
                    <Text
                        style={
                            appointment.appointmentStatus === 'scheduled' ? styles.upcomingJoinButtonText :
                                appointment.appointmentStatus === 'completed' ? styles.completedJoinButtonText : null
                        }
                    >
                        {appointment.appointmentStatus === 'scheduled' ? 'Join Session' : appointment.appointmentStatus === 'completed' ? 'View Details' : null}
                    </Text>
                </TouchableOpacity>
            </View>

        );
    };

    return (
        <View style={styles.container}>
            <CustomHeader title={'Appointments'} />
            <TouchableOpacity
            style={styles.backButtonContainer}
            onPress={() => navigation.goBack()}
        >
            <Icon name="arrow-back" size={25} color={Colors.black} />
          </TouchableOpacity>
            <ScrollView style={{ paddingTop: responsiveHeight(2.5) }}>
            
                <Text style={styles.header}>Upcoming</Text>
                {loading ? (
                       <View style={styles.centeredContainer}>
                       <Loader />
                   </View>
                ) : (
                    appointments
                        .filter(app => app.appointmentStatus === 'scheduled')
                        .map(renderAppointmentCard)
                )}

                <Text style={styles.header}>Past Appointments</Text>
                {appointments
                    .filter(app => app.appointmentStatus === 'completed')
                    .map(renderAppointmentCard)}
            </ScrollView>
        </View>
    );
};

export default ViewAllAppointments;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: responsiveHeight(12),
        backgroundColor: Colors.white
    },
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
        paddingHorizontal: responsiveWidth(4),
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
        marginHorizontal: responsiveWidth(5)
    },
    name: {
        fontSize: responsiveFontSize(1.8),
        fontWeight: 'bold',
        color: Colors.black,
    },
    type: {
        fontSize: responsiveFontSize(1.4),
        color: Colors.darkgrey,
        fontWeight: '600',
    },
    txetWidth: {
        width: responsiveHeight(60),
        marginRight: responsiveWidth(2)
    },
    pendingButton: {
        backgroundColor: Colors.PURPLE,
        padding: 2,
        borderRadius: 5,
        marginTop: responsiveHeight(1),
        alignItems: 'center',
        width: responsiveWidth(20)
    },
    upcomingButton: {
        backgroundColor: Colors.ORANGE,
        padding: 2,
        borderRadius: 5,
        marginTop: responsiveHeight(1),
        alignItems: 'center',
        width: responsiveWidth(20)
    },
    completedButton: {
        backgroundColor: Colors.GREEN,
        padding: 2,
        borderRadius: 5,
        marginTop: responsiveHeight(1),
        alignItems: 'center',
        width: responsiveWidth(20)
    },
    cancelledButton: {
        backgroundColor: Colors.PINK,
        padding: 2,
        borderRadius: 5,
        marginTop: responsiveHeight(1),
        alignItems: 'center',
        width: responsiveWidth(20)
    },
    defaultButton: {
        backgroundColor: Colors.default,
        paddingHorizontal: responsiveWidth(2),
        paddingVertical: responsiveHeight(2),
        borderRadius: 5,
        marginTop: responsiveHeight(1),
    },
    buttonText: {
        color: Colors.white,
        fontSize: responsiveFontSize(1.5),
        fontWeight: '600',
    },
    pendingButtonText: {
        color: Colors.Dark_Purple,
        fontSize: responsiveFontSize(1.3),
        fontWeight: '600',
    },
    upcomingButtonText: {
        color: Colors.Dark_Orange,
        fontSize: responsiveFontSize(1.3),
        fontWeight: '600',
    },
    completedButtonText: {
        color: Colors.Dark_Green,
        fontSize: responsiveFontSize(1.3),
        fontWeight: '600',
    },
    cancelledButtonText: {
        color: Colors.red,
        fontSize: responsiveFontSize(1.3),
        fontWeight: '600',
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
    header: {
        color: Colors.blue,
        fontWeight: '700',
        fontSize: responsiveFontSize(1.8),
        marginLeft: responsiveWidth(3)

    },
    backButtonContainer: {
        marginTop: responsiveHeight(1) ,
        marginLeft:responsiveWidth(3)
    },
    centeredContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }

});


