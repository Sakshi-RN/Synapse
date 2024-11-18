import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import AppointmentCard from '../../Container/AppointmentCard';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Colors from '../../Themes/Colors';
import CustomHeader from '../../Components/CustomHeader';
import CustomCalender from '../../Components/CustomCalender';
import Loader from '../../Components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const Appointment = () => {
    const navigation = useNavigation();
    const [appointments, setAppointments] = useState([]);
    const [filteredAppointments, setFilteredAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('All');
    const [availableDates, setAvailableDates] = useState([]);
    const fetchAppointments = async () => {
      try {
          const clientId = await AsyncStorage.getItem('authclientID')
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
          if (data && data.appointments && data.appointments.length > 0) {
              setAppointments(data.appointments);
              setAvailableDates(data.appointments.map(appointment => appointment.date));
              setFilteredAppointments(data.appointments);
          } else {
              console.warn('No appointments found for the client.');
              setAppointments([]);  // No appointments, but no error
              setFilteredAppointments([]); // Ensure no filtered appointments to display
          }
      } catch (error) {
          console.error('Error fetching appointments:', error.response?.data || error.message);
          setError(error.response?.data?.message || 'Error fetching appointments');
      } finally {
          setLoading(false);
      }
  };
  
    
    useEffect(() => {
        fetchAppointments();
    }, []);

    const getAppointmentsText = () => {
        return `${filteredAppointments.length} Appointments`;
    };

    const renderAppointmentCard = ({ item }) => <AppointmentCard appointment={item} />;

    if (error) {
        return (
            <View style={styles.centeredContainer}>
                <Text>Error: {error}</Text>
            </View>
        );
    }

    return loading ? (
        <View style={styles.centeredContainer}>
            <Loader />
        </View>
    ) : (
        <View style={styles.container}>
            <CustomHeader title={'Appointments'} />
            <CustomCalender
                availableDates={availableDates}
                setFilteredAppointments={setFilteredAppointments}
                filteredAppointments={filteredAppointments}
            />
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
        backgroundColor: Colors.white,
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
        marginBottom: responsiveHeight(1),
    },
    viewAllText: {
        fontSize: responsiveFontSize(1.6),
        color: '#5594C9',
        fontWeight: '700',
    },
});
