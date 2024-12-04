import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Colors from '../../Themes/Colors';
import { useNavigation } from '@react-navigation/native';
import { Location, MeetIcon } from '../../Assets/svg';
import { Fonts } from '../../Themes/fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UpcomingAppointmentCard = () => {
    const navigation = useNavigation();
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const clientId = await AsyncStorage.getItem('authclientID');
            console.log('Client ID:', clientId);
        
            if (!clientId) {
                Alert.alert('Error', 'No client ID found');
                return;
            }
        
            const response = await fetch('https://eb1.taramind.com/getAppointment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Api-Key': 'e1693d9245c57be86afc22ad06eda84c9cdb74dae6d56a8a7f71a93facb1f42b',
                },
                body: JSON.stringify({ status: 'scheduled', clientId }),
            });
    
            console.log('Response Status:', response.status);  // Log status code
            const data = await response.json();
            console.log('Full API Response:', data);
        
            if (response.ok && Array.isArray(data)) {
                if (data.length > 0) {
                    setAppointments(data);
                } else {
                    setError('No appointments found.');
                }
            } else {
                setError(data.message || 'Failed to load appointments');
            }
        } catch (error) {
            console.error('Error fetching appointments:', error.message);
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    
    
    const formatDate = (date) => {
        const [month, day, year] = date.split('/');
        const formattedDate = `${year}-${month}-${day}`;
        const options = { month: 'short', day: 'numeric', timeZone: 'America/New_York' }; // Example timezone
        return new Date(formattedDate).toLocaleDateString('en-US', options);
    };


    const formatTime = (time) => {
        const [hour, minute] = time.split(':');
        const date = new Date();
        date.setHours(hour, minute);
        return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });
    };

    const formatDateAndTime = (dateString, startTime, endTime) => {
        const date = new Date(dateString);
        const options = { weekday: 'short', month: 'short', day: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', options);

        const day = date.getDate();
        const daySuffix =
            day % 10 === 1 && day !== 11
                ? 'st'
                : day % 10 === 2 && day !== 12
                    ? 'nd'
                    : day % 10 === 3 && day !== 13
                        ? 'rd'
                        : 'th';

        const formattedStartTime = formatTime(startTime);
        const formattedEndTime = formatTime(endTime);

        return `${formattedDate}${daySuffix}, ${formattedStartTime} - ${formattedEndTime}`;
    };
    const isToday = (dateString) => {
        const today = new Date();
        const appointmentDate = new Date(dateString); // YYYY-MM-DD format

        return (
            today.getFullYear() === appointmentDate.getFullYear() &&
            today.getMonth() === appointmentDate.getMonth() &&
            today.getDate() === appointmentDate.getDate()
        );
    };


    const isFutureDate = (dateString) => {
        const today = new Date();
        const date = new Date(dateString);
        return date > today;
    };



    return (
        <View>
            <Text style={styles.name}>Upcoming Appointment</Text>
            {!loading && appointments.length > 0 ? (
                appointments.map((appointment, index) => {
                    const formattedDate = appointment.appointmentDate
                        .split('/')
                        .reverse()
                        .join('-');
    
                    return (
                        <View key={index}>
                            <View style={styles.rowStyle}>
                                <Text style={styles.name}>{appointment.providerName}</Text>
                                {appointment.visitType === 'Virtual' ? <MeetIcon /> : <Location />}
                            </View>
                            <Text style={styles.type}>
                                {`${appointment.appointmentType} . ${appointment.visitType}`}
                            </Text>
                            {isToday(formattedDate) && (
                                <Text style={[styles.type, { marginTop: responsiveHeight(1) }]}>
                                    {`${formatDate(appointment.appointmentDate)} . ${formatTime(
                                        appointment.appointmentStartTime
                                    )} - ${formatTime(appointment.appointmentEndTime)}`}
                                </Text>
                            )}
    
                            <TouchableOpacity style={styles.upcomingButton}>
                                <Text style={styles.upcomingButtonText}>Upcoming</Text>
                            </TouchableOpacity>
                            {isFutureDate(formattedDate) && (
                                <View style={styles.calenderView}>
                                    <Text style={styles.calenderViewText}>
                                        {formatDateAndTime(
                                            formattedDate,
                                            appointment.appointmentStartTime,
                                            appointment.appointmentEndTime
                                        )}
                                    </Text>
                                </View>
                            )}
                            {isToday(formattedDate) && (
                                <TouchableOpacity style={styles.JoinButton}>
                                    <Text style={styles.JoinButtonText}>
                                        {appointment.visitType === 'Virtual' ? 'Join Session' : 'View Map'}
                                    </Text>
                                </TouchableOpacity>
                            )}
    
                        </View>
                    );
                })
            ) : (
                !loading && appointments.length === 0 && (
                    <Text style={styles.noAppointmenets}>No Appointment</Text>
                )
            )}
        </View>
    );
    
};



export default UpcomingAppointmentCard;

const styles = StyleSheet.create({
    name: {
        fontSize: responsiveFontSize(2),
        fontFamily: Fonts.Bold800,
        color: Colors.blue,
    },
    type: {
        fontSize: responsiveFontSize(1.3),
        color: Colors.newgrey,
        fontFamily: Fonts.Semibold700,
        marginTop: responsiveHeight(0.2),
    },
    rowStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: responsiveHeight(1.5),
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
    JoinButtonText: {
        color: Colors.white,
        fontSize: responsiveFontSize(1.7),
        fontFamily: Fonts.Medium600,
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
        fontFamily: Fonts.Medium600,
    },
    upcomingButtonText: {
        color: Colors.Dark_Orange,
        fontSize: responsiveFontSize(1.2),
        fontFamily: Fonts.Semibold700,
    },
    upcomingButton: {
        backgroundColor: Colors.ORANGE,
        padding: 2,
        borderRadius: 5,
        marginTop: responsiveHeight(1),
        alignItems: 'center',
        width: responsiveWidth(18)
    },
    noAppointmenets: {
        fontSize: responsiveFontSize(1.8),
        fontFamily: Fonts.Bold800,
        color: Colors.blue,
        alignSelf: 'center',
        marginVertical: responsiveHeight(2)
    }

});
