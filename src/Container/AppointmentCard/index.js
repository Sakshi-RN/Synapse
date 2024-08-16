import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Colors from '../../Themes/Colors';

const AppointmentCard = ({ appointment }) => {
    return (
        <View style={styles.cardContainer}>
            <Text style={styles.time}>{appointment.time}</Text>
            <View style={styles.detailsContainer}>
                <Text style={styles.name}>{appointment.name}</Text>
                <Text style={styles.type}>{appointment.type}</Text>
                <TouchableOpacity
                    style={
                        appointment.status === 'Pending' ? styles.pendingButton :
                            appointment.status === 'Upcoming' ? styles.upcomingButton :
                                appointment.status === 'Completed' ? styles.completedButton :
                                    appointment.status === 'Cancelled' ? styles.cancelledButton :
                                        styles.defaultButton
                    }
                >
                    <Text style={styles.buttonText}>{appointment.buttonText}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default AppointmentCard;

const styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: 'yellow',
        justifyContent: 'space-between'


    },
    time: {
        transform: [{ rotate: '-90deg' }],
        fontSize: responsiveFontSize(1.5),
        color: Colors.grey,
        textAlign: 'center',
        fontWeight: '600'
        // width: responsiveHeight(20),
    },
    detailsContainer: {
        padding: 10,
        // marginLeft: responsiveWidth(4),
        shadowColor: Colors.grey,
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 4,
        shadowRadius: 2,
        elevation: 5,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.black,
    },
    type: {
        fontSize: 14,
        color: Colors.grey,
    },
    pendingButton: {
        backgroundColor: Colors.orange, // Pending color
        paddingHorizontal: responsiveWidth(3),
        paddingVertical: responsiveHeight(1),
        borderRadius: 5,
    },
    upcomingButton: {
        backgroundColor: Colors.blue, // Upcoming color
        paddingHorizontal: responsiveWidth(3),
        paddingVertical: responsiveHeight(1),
        borderRadius: 5,
    },
    completedButton: {
        backgroundColor: Colors.green, // Completed color
        paddingHorizontal: responsiveWidth(3),
        paddingVertical: responsiveHeight(1),
        borderRadius: 5,
    },
    cancelledButton: {
        backgroundColor: Colors.red, // Cancelled color
        paddingHorizontal: responsiveWidth(3),
        paddingVertical: responsiveHeight(1),
        borderRadius: 5,
    },
    defaultButton: {
        backgroundColor: Colors.default, // Default button color
        paddingHorizontal: responsiveWidth(3),
        paddingVertical: responsiveHeight(1),
        borderRadius: 5,
    },
    buttonText: {
        color: Colors.white,
        fontSize: 14,
    },
});
