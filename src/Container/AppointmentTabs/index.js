
import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';
import Colors from '../../Themes/Colors';

const tabs = ['All'];

const AppointmentTabs = ({ appointments, setFilteredAppointments }) => {
  const [activeTab, setActiveTab] = useState('All');


  const filterAppointments = (tab) => {
    setActiveTab(tab);
    if (tab === 'All') {
      setFilteredAppointments(appointments);
    } else {
      const filtered = appointments.filter(
        (appointment) => appointment.appointmentStatus.toLowerCase() === tab.toLowerCase()
      );
      setFilteredAppointments(filtered);
    }
  };

  const renderTab = ({ item: tab }) => (
    <TouchableOpacity
      onPress={() => filterAppointments(tab)}
      style={[styles.tabButton, activeTab === tab && styles.activeTab]}
    >
      <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
    </TouchableOpacity>
  );

  return (
    <View>
      <FlatList
        data={tabs}
        renderItem={renderTab}
        keyExtractor={(item) => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabsContainer}
      />
    </View>
  );
};

export default AppointmentTabs;

const styles = StyleSheet.create({
  tabsContainer: {
    marginTop: responsiveHeight(1),
    height: responsiveHeight(5),
  },
  tabButton: {
    paddingHorizontal: responsiveWidth(3),
    height: responsiveHeight(3),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginHorizontal: responsiveWidth(2),
  },
  tabText: {
    fontSize: responsiveFontSize(1.5),
    color: Colors.darkgrey,
    fontWeight: '600',
  },
  activeTab: {
    backgroundColor: Colors.skyblue,
    paddingHorizontal: responsiveWidth(3),
    height: responsiveHeight(3),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  activeTabText: {
    color: Colors.blue,
    fontSize: responsiveFontSize(1.5),
    fontWeight: '600',
  },
});


