import React from 'react';
import { View, StyleSheet, FlatList, Text, Image, TouchableOpacity } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Colors from '../../Themes/Colors';
import CustomHeader from '../../Components/CustomHeader';
import LCSWImage from '../../Assets/Images/LCSW.png';


const notifications = [
    {
        id: '1',
        title: 'Survey Pending',
        description: 'Your survey is pending. Complete your survey.',
        time: '1 min ago',
        icon: LCSWImage,
    },
    {
        id: '2',
        title: 'Upcoming Appointment',
        description: 'You have your next KAT Appointment on May 23, 2024.',
        time: '10 min ago',
        icon: LCSWImage,
    },
    {
        id: '3',
        title: 'New Message',
        description: 'You have an unread message from Leena Joseph.',
        time: 'June 24, 2024',
        icon: LCSWImage,
    },
    {
        id: '4',
        title: 'Survey Updated',
        description: 'Your survey has been updated.',
        time: 'June 10, 2024',
        icon: LCSWImage,
    },
    {
        id: '5',
        title: 'Update Profile',
        description: 'Complete your profile setting.',
        time: 'May 28, 2024',
        icon: LCSWImage,
    },
    {
        id: '6',
        title: 'Add your availability',
        description: 'It seems like you have not added your availability yet.',
        time: 'May 26, 2024',
        icon: LCSWImage,
    },
];


const renderItem = ({ item }) => (

    <TouchableOpacity style={styles.notificationCard}>
        <Image source={item.icon} style={styles.icon} />
        <View style={styles.textContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
        </View>
        <View style={styles.alignItemsStyle}>

            <Text style={styles.time}>{item.time}</Text>
        </View>
    </TouchableOpacity>
);

const Notification = () => {
    return (
        <View style={styles.container}>
            <CustomHeader title={'Notification'} />
            <FlatList
                data={notifications}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.flatlistContent}
            />
        </View>
    );
};

export default Notification;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: responsiveHeight(12),
    },
    flatlistContent: {
        paddingHorizontal: responsiveWidth(3),
        paddingTop: responsiveHeight(3),
    },
    notificationCard: {
        flexDirection: 'row',
        borderBottomColor: Colors.Light_gray,
        borderBottomWidth: 1,
        paddingVertical: responsiveHeight(1.5),

    },
    icon: {
        width: responsiveWidth(12),
        height: responsiveWidth(12),
    },
    textContainer: {
        marginLeft: responsiveWidth(3),
        width: responsiveWidth(55)
    },
    title: {
        fontSize: responsiveFontSize(1.7),
        fontWeight: 'bold',
        color: Colors.DARKBLUE,
    },
    description: {
        fontSize: responsiveFontSize(1.3),
        color: Colors.darkgrey,
        marginTop: responsiveHeight(0.5),
        fontWeight: '600',
        width:responsiveWidth(75)
    },
    time: {
        fontSize: responsiveFontSize(1.3),
        color: Colors.grey,
        fontWeight: '600',
    },
    alignItemsStyle: {
        alignItems: 'flex-end',
        width: responsiveWidth(23),

    }
});
