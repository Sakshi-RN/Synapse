import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import AppointmentTabs from '../../Container/AppointmentTabs';
import AppointmentCard from '../../Container/AppointmentCard';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Colors from '../../Themes/Colors';
import CustomHeader from '../../Components/CustomHeader';
import AppointmentData from '../../Container/AppointmentData';
import CustomCalender from '../../Components/CustomCalender';

const Appointment = () => {
    const [activeTab, setActiveTab] = useState('Pending');
    const [filteredAppointments, setFilteredAppointments] = useState([]);

    useEffect(() => {
        // Filter appointments based on active tab
        let filteredData;

        if (activeTab === 'All') {
            // Show all appointments if "All" tab is selected
            filteredData = AppointmentData;
        } else {
            // Filter based on the status
            filteredData = AppointmentData.filter(
                appointment => appointment.status === activeTab
            );
        }

        setFilteredAppointments(filteredData);


        // console.log(`Filtered Appointments for ${activeTab}:`, filteredData);
    }, [activeTab]);


    // Dynamic header title
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

    // Get total number of appointments for the selected tab
    const getAppointmentsText = () => {
        return `${filteredAppointments.length} Appointments`; // Show the total number of appointments
    };

    const renderAppointmentCard = ({ item }) => <AppointmentCard appointment={item} />;

    return (
        <View style={styles.container}>
            <CustomHeader title={getHeaderTitle()} />
            <CustomCalender/>
            <Text style={styles.appointmentsText}>{'0' + getAppointmentsText()}</Text>
            <AppointmentTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            <FlatList
                Enabled={false}
                data={filteredAppointments} // Show all appointments for the selected tab
                renderItem={renderAppointmentCard}
                keyExtractor={item => item.id.toString()}
                ListEmptyComponent={<Text>No appointments available.</Text>}
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
        height: '100%'

    }
});
