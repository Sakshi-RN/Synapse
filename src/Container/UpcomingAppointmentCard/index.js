import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import { Location, MeetIcon } from '../../Assets/svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';

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

    const getAppointmentStatus = (appointmentDate) => {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const [month, day, year] = appointmentDate.split('/');
        const appointmentDateTime = new Date(year, month - 1, day);
        appointmentDateTime.setHours(0, 0, 0, 0);

        if (appointmentDateTime.getTime() === currentDate.getTime()) {
            return 'today';
        } else if (appointmentDateTime > currentDate) {
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

    const formatDateAndTime = (appointmentDate, startTime, endTime) => {
        const [month, day, year] = appointmentDate.split('/');
        const date = new Date(year, month - 1, day);

        const formattedDate = date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
        });

        const formattedDay = ordinalDay(date.getDate());

        const formatTime = (time) => {
            const [hour, minute] = time.split(':');
            const timeDate = new Date();
            timeDate.setHours(parseInt(hour), parseInt(minute));
            return timeDate.toLocaleTimeString('en-US', { 
                hour: 'numeric', 
                minute: 'numeric', 
                hour12: true 
            });
        };

        const formattedStartTime = formatTime(startTime);
        const formattedEndTime = formatTime(endTime);

        return `${formattedDate.replace(/ \d+/, ` ${formattedDay}`)}, ${formattedStartTime} - ${formattedEndTime}`;
    };

    const formatShortDateAndTime = (appointmentDate, startTime, endTime) => {
        const [month, day, year] = appointmentDate.split('/');
        const date = new Date(year, month - 1, day);

        const monthName = date.toLocaleDateString('en-US', { month: 'short' });
        const formattedDay = ordinalDay(date.getDate());

        const formatTime = (time) => {
            const [hour, minute] = time.split(':');
            const timeDate = new Date();
            timeDate.setHours(parseInt(hour), parseInt(minute));
            return timeDate.toLocaleTimeString('en-US', { 
                hour: 'numeric', 
                minute: 'numeric', 
                hour12: true 
            });
        };

        const formattedStartTime = formatTime(startTime);
        const formattedEndTime = formatTime(endTime);

        return `${monthName} ${formattedDay} · ${formattedStartTime} - ${formattedEndTime}`;
    };

    return (
        <View>
            <Text style={styles.name}>Upcoming Appointment</Text>
            {loading ? (
                <Text>Loading...</Text>
            ) : error ? (
                <Text style={styles.noAppointmenets}>{error}</Text>
            ) : (
                appointments.map((appointment, index) => {
                    const status = getAppointmentStatus(appointment.appointmentDate);
                    const { appointmentDate, appointmentStartTime, appointmentEndTime } = appointment;

                    return (
                        <View key={index}>
                            <View style={styles.rowStyle}>
                                <Text style={styles.name}>{appointment.providerName}</Text>
                                {appointment.visitType === 'Virtual' ? <MeetIcon /> : <Location />}
                            </View>

                            <Text style={styles.type}>
                                {`${appointment.appointmentType} · ${appointment.visitType}`}
                            </Text>

                            {status === 'today' && (
                                <Text style={[styles.type, { marginTop: responsiveHeight(1) }]}>
                                    {formatShortDateAndTime(appointmentDate, appointmentStartTime, appointmentEndTime)}
                                </Text>
                            )}

                            <TouchableOpacity style={styles.upcomingButton}>
                                <Text style={styles.upcomingButtonText}>Upcoming</Text>
                            </TouchableOpacity>

                            {status === 'future' && (
                                <View style={styles.calenderView}>
                                    <Text style={styles.calenderViewText}>
                                        {formatDateAndTime(appointmentDate, appointmentStartTime, appointmentEndTime)}
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
    );
};

export default UpcomingAppointmentCard;
