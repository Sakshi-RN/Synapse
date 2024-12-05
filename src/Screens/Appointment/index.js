import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import AppointmentCard from '../../Container/AppointmentCard';
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';
import Colors from '../../Themes/Colors';
import CustomHeader from '../../Components/CustomHeader';
import Loader from '../../Components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import CustomCalender from '../../Components/CustomCalender';
import { Fonts } from '../../Themes/fonts';
import commonStyles from '../../Components/CommonStyle';


const Appointment = () => {
    const [appointments, setAppointments] = useState([]);
    const [filteredAppointments, setFilteredAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const fetchAppointments = async () => {
        try {
            const clientId = await AsyncStorage.getItem('authclientID');
            if (!clientId) {
                Alert.alert('Error', 'No clientID found');
                setLoading(false);
                return;
            }
    
            setLoading(true);
            setError(null);
    
            const url = `https://eb1.taramind.com/getAllClientAppointments/${clientId}`;
            const response = await axios.get(url, {
                headers: {
                    'X-Api-Key': 'e1693d9245c57be86afc22ad06eda84c9cdb74dae6d56a8a7f71a93facb1f42b',
                },
            });
    
            const { data } = response;
    
            if (data?.appointments?.length > 0) {
                const validAppointments = data.appointments.filter((appointment) => appointment.id);
                setAppointments(validAppointments);
                setFilteredAppointments(validAppointments);
            } else {
                setAppointments([]);
                setFilteredAppointments([]);
            }
        } catch (err) {
            console.error('Error fetching appointments:', err.response?.data || err.message);
            setError(err.response?.data?.message || 'Error fetching appointments');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAppointments();

    }, []);

    const renderAppointmentCard = ({ item }) => <AppointmentCard appointment={item} />;

    if (loading) {
        return (
            <View style={styles.centeredContainer}>
                <Loader />
            </View>
        );
    }


    return (
        <View style={styles.container}>
            <CustomHeader title="Appointments" />
            <CustomCalender setFilteredAppointments={setFilteredAppointments} appointments={appointments} />
            <View style={commonStyles.newConatiner}>
            <FlatList
                data={filteredAppointments}
                renderItem={renderAppointmentCard}
                keyExtractor={(item, index) => (item.id ? item.id.toString() : `key-${index}`)}
                ListEmptyComponent={<Text style={styles.noData}>No appointments found for the client.</Text>}
                showsVerticalScrollIndicator={false}
                style={styles.flatListStyle}
            />
            </View>
        </View>
    );
};

export default Appointment;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.bg_Color,
        paddingBottom: responsiveHeight(12),
    },
    centeredContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    flatListStyle: {
        paddingHorizontal: 10,
    },
    noData: {
        alignSelf: 'center',
        marginTop: responsiveHeight(15),
        fontSize: responsiveFontSize(2),
        fontWeight: 'bold',
        color: Colors.blue,
        fontFamily: Fonts.Bold800
    },

});
