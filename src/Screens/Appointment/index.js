
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import AppointmentTabs from '../../Container/AppointmentTabs';
import AppointmentCard from '../../Container/AppointmentCard';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Colors from '../../Themes/Colors';
import CustomHeader from '../../Components/CustomHeader';
import CustomCalender from '../../Components/CustomCalender';

const Appointment = () => {
    const [appointments, setAppointments] = useState([]);
    const [filteredAppointments, setFilteredAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('All');

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
            setFilteredAppointments(data); 
          } catch (error) {
            setError(error.message);
          } finally {
            setLoading(false);
          }
        };
    
        fetchAppointments();
      }, []);

    const getHeaderTitle = () => {
        switch (activeTab) {
            case 'Pending':
                return 'Pending';
            case 'Upcoming':
                return 'Upcoming';
            case 'Completed':
                return 'Completed';
            case 'Cancelled':
                return 'Cancelled';
            default:
                return 'Appointments';
        }
    };

    const getAppointmentsText = () => {
        return `${filteredAppointments.length} Appointments`;
    };

    const renderAppointmentCard = ({ item }) => <AppointmentCard appointment={item} />;

    if (loading) {
        return <ActivityIndicator size="large" color={Colors.blue} />;
    }

    if (error) {
        return <Text>Error: {error}</Text>;
    }

    return (
        <View style={styles.container}>
            <CustomHeader title={getHeaderTitle()} />
          
            <CustomCalender />
            <Text style={styles.appointmentsText}>{getAppointmentsText()}</Text>
            <AppointmentTabs appointments={appointments} setFilteredAppointments={setFilteredAppointments} />
            <FlatList
                data={filteredAppointments}
                renderItem={renderAppointmentCard}
                keyExtractor={item => item.id}
                ListEmptyComponent={<Text style={styles.noData}>No appointments available.</Text>}
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
    },
    appointmentsText: {
        fontSize: responsiveFontSize(2),
        fontWeight: 'bold',
        color: Colors.blue,
        marginHorizontal: responsiveWidth(5),
        marginTop: responsiveHeight(3),
    },
    flatListStyle: {
        height: '100%',
    },
        noData:{
        alignSelf:'center',
        marginTop:responsiveHeight(15),
        fontSize: responsiveFontSize(2),
        fontWeight: 'bold',
        color: Colors.OFFBLACK,

    }
  
});





