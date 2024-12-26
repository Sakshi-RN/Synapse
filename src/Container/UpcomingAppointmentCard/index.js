import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import { Location, MeetIcon } from '../../Assets/svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import { DateTime } from 'luxon';

const UpcomingAppointmentCard = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const clientId = await AsyncStorage.getItem('authclientID');

            if (!clientId) {
                Alert.alert('Error', 'No client ID found');
                return;
            }

            const response = await fetch('https://eb1.taramind.com/appointment/mobile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Api-Key': 'e1693d9245c57be86afc22ad06eda84c9cdb74dae6d56a8a7f71a93facb1f42b',
                },
                body: JSON.stringify({ status: 'scheduled', clientId }),
            });

            const result = await response.json();
            if (response.ok && result.status && Array.isArray(result.data)) {
                if (result.data.length > 0) {
                    setAppointments(result.data);
                } else {
                    setError('No appointments found.');
                }
            } else {
                setError(result.message || 'Failed to load appointments');
            }
        } catch (error) {
            console.error('Error fetching appointments:', error.message);
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    const getAppointmentStatus = (appointmentDate, timezone) => {
        const now = new Date();
        const currentDate = new Intl.DateTimeFormat('en-US', {
            timeZone: timezone,
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        }).format(now);


        const [month, day, year] = appointmentDate.split('/');
        const appointmentDateTime = new Date(`${year}-${month}-${day}`);

        const [currentMonth, currentDay, currentYear] = currentDate.split('/');
        const currentDateTime = new Date(`${currentYear}-${currentMonth}-${currentDay}`);
            
        if (appointmentDateTime.getTime() === currentDateTime.getTime()) {

            return 'today';
        } else if (appointmentDateTime > currentDateTime) {

            return 'future';
        }

        return 'past';
    };


    const ordinalDay = (d) => {
        if (d > 3 && d < 21) return `${d}th`;
        switch (d % 10) {
            case 1:
                return `${d}st`;
            case 2:
                return `${d}nd`;
            case 3:
                return `${d}rd`;
            default:
                return `${d}th`;
        }
    };

    const formatDateAndTime = (appointmentDate, startTime, endTime, timezone) => {
        // Combine date and time to create Luxon DateTime objects
        const appointmentStart = DateTime.fromFormat(
            `${appointmentDate} ${startTime}`,
            'MM/dd/yyyy HH:mm',
            { zone: timezone }
        );
        const appointmentEnd = DateTime.fromFormat(
            `${appointmentDate} ${endTime}`,
            'MM/dd/yyyy HH:mm',
            { zone: timezone }
        );

        const formattedDate = appointmentStart.toLocaleString({
            weekday: 'short',
            month: 'short',
            day: 'numeric',
        });

        const formattedDay = ordinalDay(appointmentStart.day);

        const formattedStartTime = appointmentStart.toLocaleString(DateTime.TIME_SIMPLE);
        const formattedEndTime = appointmentEnd.toLocaleString(DateTime.TIME_SIMPLE);

        return `${formattedDate.replace(/ \d+/, ` ${formattedDay}`)}, ${formattedStartTime} - ${formattedEndTime}`;
    };


    return (
        <View>
        {appointments.length === 0 ? null : (
            <View style={styles.commonContainer}>
                {loading ? (
                    <Text>Loading...</Text>
                ) : error ? (
                    <Text style={styles.noAppointments}>{error}</Text>
                ) : (
                    appointments.map((appointment, index) => {
                        const status = getAppointmentStatus(appointment.appointmentDate, appointment.timezone);
                        const { appointmentDate, appointmentStartTime, appointmentEndTime, timezone, providerTimezoneAbbr } = appointment;

                        return (
                            <View key={index}>
                                    <Text style={styles.name}>
                                        {status === 'future' ? 'Upcoming Appointment' : 'Today’s Appointment'}
                                    </Text>
                                    <View style={styles.rowStyle}>
                                    <Text style={styles.name}>{appointment.providerName}</Text>
                                    {appointment.visitType === 'Virtual' ? <MeetIcon /> : <Location />}
                                </View>

                                <Text style={styles.type}>
                                    {`${appointment.appointmentType} · ${appointment.visitType}`}
                                </Text>

                                <Text style={[styles.type, { marginTop: responsiveHeight(1) }]}>
                                    {formatDateAndTime(appointmentDate, appointmentStartTime, appointmentEndTime, timezone)}{' '}({appointment.providerTimezoneAbbr})
                                </Text>

                                {status === 'future' && (
                                    <View style={styles.calenderView}>
                                        <Text style={styles.calenderViewText}>
                                            {formatDateAndTime(appointmentDate, appointmentStartTime, appointmentEndTime, timezone)}{' '}({appointment.providerTimezoneAbbr})
                                        </Text>
                                    </View>
                                )}

                                {status === 'today' && (
                                    <TouchableOpacity style={styles.JoinButton}>
                                        <Text style={styles.JoinButtonText}>
                                            {appointment.visitType === 'Virtual' ? 'Join Session' : 'View Map'}
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        );
                    })
                )}
            </View>
        )}
    </View>
);

};

export default UpcomingAppointmentCard;
