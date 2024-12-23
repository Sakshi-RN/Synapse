import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, Platform } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Colors from '../../Themes/Colors';
import { Calendar, Time, UpArrow } from '../../Assets/svg';

const ViewDetails = ({ route }) => {
    const { appointment } = route.params; 
    return (
        <View style={styles.careTeamnCard}>
            <View style={styles.row}>
                <View style={styles.textContainer}>
                    <Text style={styles.name}>Dr. {name}</Text>
                    <Text style={styles.mdText}>{sessionInfo}</Text>
                </View>
                <TouchableOpacity style={[styles.btn, btnStyle]}>
                    <Text style={[styles.btnText, btnTextColor]}>{status}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.blueRow}>
                <Calendar />
                <Text style={styles.timeText}>{date}</Text>
                <Time />
                <Text style={styles.timeText}>{time}</Text>
            </View>
            {address && (
                <>
                    <Text style={[styles.details]}>{addressTitle}</Text>
                    <Text style={styles.description}>{address}</Text>
                </>
            )}
        </View>
    );
};

export default ViewDetails;


const styles = StyleSheet.create({
    icon: {
        width: 50,
        height: 50,
        borderRadius: 25
    },
    textContainer: {
        width: responsiveWidth(65)
    },
    name: {
        fontSize: responsiveFontSize(1.8),
        fontWeight: '700',
        color: Colors.black,
    },
    details: {
        fontSize: responsiveFontSize(1.6),
        fontWeight: '700',
        color: Colors.black,
        marginTop: responsiveHeight(1.5)
    },

    mdText: {
        fontSize: responsiveFontSize(1.2),
        color: Colors.darkgrey,
        fontWeight: '600',
        width: responsiveWidth(47),
        marginTop: responsiveHeight(0.5)

    },
    description: {
        fontSize: responsiveFontSize(1.3),
        color: Colors.darkgrey,
        fontWeight: '500',
        width: responsiveWidth(80),

    },
    btn: {
        backgroundColor: Colors.GREEN,
        width: responsiveWidth(20),
        height: responsiveHeight(3),
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnText: {
        color: Colors.Dark_Green,
        fontSize: responsiveFontSize(1.2),
        fontWeight: 'bold',
    },
    row: {
        flexDirection: 'row'
    },
    timeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: responsiveHeight(1),
        justifyContent: 'space-between',

    },
    blueRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E4EEF1',
        paddingVertical: responsiveHeight(1),
        paddingHorizontal: responsiveWidth(3),
        marginTop: responsiveHeight(1.5),
        borderRadius: 6
    },
    timeText: {
        fontSize: responsiveFontSize(1.2),
        color: Colors.black,
        fontWeight: '700',
        width: responsiveWidth(33),
        marginLeft: responsiveWidth(2)
    }


});
