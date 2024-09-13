import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, Platform } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Colors from '../../Themes/Colors';
import { Calendar, Time, UpArrow } from '../../Assets/svg';

const ViewDetails = ({
    name,
    sessionInfo,
    status,
    date,
    time,
    details,
    description,
    address,
    addressTitle,
    image,
    btnStyle,
    btnTextColor
}) => {
    return (
        <View style={styles.careTeamnCard}>
            <View style={styles.row}>
                <Image source={image} style={styles.icon} />
                <View style={styles.textContainer}>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.mdText}>{sessionInfo}</Text>
                </View>
                <TouchableOpacity style={[styles.btn,btnStyle]}>
                    <Text style={[styles.btnText,btnTextColor]}>{status}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.blueRow}>
                <Calendar />
                <Text style={styles.timeText}>{date}</Text>
                <Time />
                <Text style={styles.timeText}>{time}</Text>
            </View>
            <View style={styles.timeRow}>
                <Text style={styles.details}>{details}</Text>
                <UpArrow />
            </View>
            <Text style={styles.description}>{description}</Text>
            {address && (
                <>
                    <Text style={[styles.details, { marginVertical: responsiveHeight(0.5) }]}>{addressTitle}</Text>
                    <Text style={styles.description}>{address}</Text>
                </>
            )}
        </View>
    );
};

export default ViewDetails;


const styles = StyleSheet.create({

    careTeamnCard: {
        paddingHorizontal: responsiveWidth(3),
        paddingVertical: responsiveHeight(2),
        backgroundColor: Colors.white,
        shadowColor: Platform.OS === 'ios' ? Colors.OFFWHITE : Colors.grey,
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 3,
        shadowRadius: 4,
        elevation: 5,
        borderRadius: 8,
        borderWidth: 0.2,
        borderColor: Colors.OFFWHITE,


    },
    icon: {
        width: 50,
        height: 50,
        borderRadius: 25
    },
    textContainer: {
        marginLeft: responsiveWidth(3),
        width: responsiveWidth(47),
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
    },

    mdText: {
        fontSize: responsiveFontSize(1.2),
        color: Colors.darkgrey,
        fontWeight: '600',
        width:responsiveWidth(47),
        marginTop:responsiveHeight(0.5)

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
        backgroundColor: Colors.skyblue,
        paddingVertical: responsiveHeight(1),
        paddingHorizontal: responsiveWidth(3),
        marginTop: responsiveHeight(1.5),
        borderRadius: 6,

    },
    timeText: {
        fontSize: responsiveFontSize(1.2),
        color: Colors.black,
        fontWeight: '700',
        width: responsiveWidth(33),
        marginLeft: responsiveWidth(2)
    }


});
