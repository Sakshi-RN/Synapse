import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import AppointmentCard from '../../Container/AppointmentCard';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Colors from '../../Themes/Colors';
import CustomHeader from '../../Components/CustomHeader';
import CustomCalender from '../../Components/CustomCalender';
import Loader from '../../Components/Loader';
import { useNavigation } from '@react-navigation/native';

const Appointment = () => {
    const navigation = useNavigation();
    const [appointments, setAppointments] = useState([]);
    const [filteredAppointments, setFilteredAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('All');
    const [availableDates, setAvailableDates] = useState([]);

    const handleViewAllAppointment = () => {
        navigation.navigate('ViewAllAppointments');
    }

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await fetch(
                    'https://eb1.taramind.com/getAllClientAppointments/32169136-9c4f-11ef-83e8-02f35b8058b3',
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

                const dates = data.map(appointment => appointment.appointmentDate);
                setAvailableDates(dates);

            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, []);


    const getAppointmentsText = () => {
        return `${filteredAppointments.length} Appointments`;
    };

    const renderAppointmentCard = ({ item }) =><AppointmentCard appointment={item}/>;

    if (loading) {
        return (
            <View style={styles.centeredContainer}>
                <Loader />
            </View>
        );
    }
    if (error) {
        return <Text>Error: {error}</Text>;
    }

    return (
        <View style={styles.container}>
            <CustomHeader title={'Appointments'} />
            <CustomCalender availableDates={availableDates} setFilteredAppointments={setFilteredAppointments} filteredAppointments={filteredAppointments} />
            <FlatList
                data={filteredAppointments}
                renderItem={renderAppointmentCard}
                keyExtractor={item => item.id}
                ListEmptyComponent={<Text style={styles.noData}>No Appointments</Text>}
                showsVerticalScrollIndicator={false}
                style={styles.flatListStyle}
            />
        </View>
    );
};

export default Appointment;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: responsiveHeight(12),
        backgroundColor: Colors.white
    },
    
    centeredContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    flatListStyle: {
        height: '100%',
    },
    noData: {
        alignSelf: 'center',
        marginTop: responsiveHeight(15),
        fontSize: responsiveFontSize(2),
        fontWeight: 'bold',
        color: Colors.blue,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: responsiveWidth(5),
        alignItems: 'center',
        marginBottom: responsiveHeight(1)

    },
    viewAllText: {
        fontSize: responsiveFontSize(1.6),
        color: '#5594C9',
        fontWeight: '700',
    }
});


