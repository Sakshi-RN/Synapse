import React from 'react';
import { Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';
import Colors from '../../Themes/Colors';

const tabs = ['All', 'Pending', 'Upcoming', 'Completed', 'Cancelled'];

const AppointmentTabs = ({ activeTab, setActiveTab }) => {
    const renderTab = ({ item: tab }) => (
        <TouchableOpacity
            onPress={() => setActiveTab(tab)}
            style={[styles.tabButton, activeTab === tab && styles.activeTab]}
        >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
        </TouchableOpacity>
    );

    return (
        <FlatList
            data={tabs}
            renderItem={renderTab}
            keyExtractor={(item) => item}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.tabsContainer}
        />
    );
};

export default AppointmentTabs;

const styles = StyleSheet.create({
    tabsContainer: {
        marginTop: responsiveHeight(1),

    },
    tabButton: {
        paddingHorizontal: responsiveWidth(3),
        height: responsiveHeight(3),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12
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
        borderRadius: 12
    },
    activeTabText: {
        color: Colors.blue,
        fontSize: responsiveFontSize(1.5),
        fontWeight: '600',
    }
});
