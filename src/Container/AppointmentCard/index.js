// import React from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Platform, Image } from 'react-native';
// import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
// import Colors from '../../Themes/Colors';
// import LCSWImage from '../../Assets/Images/LCSW.png';
// import { useNavigation } from '@react-navigation/native';


// const AppointmentCard = ({ appointment }) => {
//     const navigation = useNavigation();
//     return (
//         <View style={styles.cardContainer}>
//             <Text style={styles.time}>{appointment.time}</Text>
//             <View style={styles.detailsContainer}>
//                 <View style={{ flexDirection: 'row' }}>
//                     <Image source={LCSWImage} style={styles.careTeamImage} />
//                     <View style={styles.rowStyle}>
//                         <Text style={styles.name}>{appointment.name}</Text>
//                         <Text style={styles.type}>{appointment.type}</Text>
//                         <TouchableOpacity
//                             style={
//                                 appointment.status === 'Pending' ? styles.pendingButton :
//                                     appointment.status === 'Upcoming' ? styles.upcomingButton :
//                                         appointment.status === 'Completed' ? styles.completedButton :
//                                             appointment.status === 'Cancelled' ? styles.cancelledButton :
//                                                 styles.defaultButton
//                             }

//                         >
//                             <Text
//                                 style={
//                                     appointment.status === 'Pending' ? styles.pendingButtonText :
//                                         appointment.status === 'Upcoming' ? styles.upcomingButtonText :
//                                             appointment.status === 'Completed' ? styles.completedButtonText :
//                                                 appointment.status === 'Cancelled' ? styles.cancelledButtonText :
//                                                     styles.buttonText
//                                 }
//                             >{appointment.status}</Text>
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//                 <>
//                     {appointment.buttonText === 'Join Session' || appointment.buttonText === 'View Details' ?
//                         <TouchableOpacity
//                             style={
//                                 appointment.buttonText === 'Join Session' ? styles.upcomingJoinButton :
//                                     appointment.buttonText === 'View Details' ? styles.completedJoinButton : 'null'
//                             }

//                             onPress={() => { navigation.navigate(appointment.buttonText === 'Join Session' ? 'JoinSession' : appointment.buttonText === 'View Details' ? 'ViewDetails' : 'null') }}>
//                             <Text
//                                 style={
//                                     appointment.buttonText === 'Join Session' ? styles.upcomingJoinButtonText :
//                                         appointment.buttonText === 'View Details' ? styles.completedJoinButtonText : 'null'

//                                 }
//                             >{appointment.buttonText}</Text>
//                         </TouchableOpacity>
//                         : ''
//                     }
//                 </>
//                 <>
//                     {appointment.decline === 'Decline' ?
//                         <View style={styles.cancelbtnRow}>
//                             <TouchableOpacity style={appointment.decline === 'Decline' ? styles.declineButton : 'null'}>
//                                 <Text style={appointment.decline === 'Decline' ? styles.declineButtonText : 'null'}>{appointment.decline}</Text>
//                             </TouchableOpacity>
//                             <TouchableOpacity style={appointment.accept === 'Accept' ? styles.acceptButton : 'null'}>
//                                 <Text style={appointment.accept === 'Accept' ? styles.acceptButtonText : 'null'}>{appointment.accept}</Text>
//                             </TouchableOpacity>
//                         </View>
//                         : ''
//                     }
//                 </>
//             </View>
//         </View>
//     );
// };

// export default AppointmentCard;

// const styles = StyleSheet.create({
//     cardContainer: {
//         alignItems: 'center',
//         flexDirection: 'row',
//         justifyContent: 'space-evenly'
//     },
//     time: {
//         transform: [{ rotate: '-90deg' }],
//         fontSize: responsiveFontSize(1.4),
//         fontWeight: '500',
//         color: Colors.darkgrey,
//         textAlign: 'center',
//         marginTop: responsiveHeight(3),


//     },
//     detailsContainer: {
//         paddingHorizontal: responsiveWidth(4),
//         paddingVertical: responsiveHeight(2),
//         backgroundColor: Colors.white,
//         shadowColor: Platform.OS === 'ios' ? Colors.grey : Colors.black,
//         shadowOffset: {
//             width: 0.5,
//             height: 0.5,
//         },
//         shadowOpacity: 0.4,
//         shadowRadius: 4,
//         elevation: 5,
//         width: '85%',
//         marginVertical: responsiveHeight(2),
//         borderRadius: 12,
//         marginRight: responsiveWidth(13)


//     },
//     name: {
//         fontSize: responsiveFontSize(1.8),
//         fontWeight: 'bold',
//         color: Colors.black,
//     },
//     type: {
//         fontSize: responsiveFontSize(1.4),
//         color: Colors.darkgrey,
//         fontWeight: '600'
//     },
//     pendingButton: {
//         backgroundColor: Colors.PURPLE,
//         paddingHorizontal: responsiveWidth(2),
//         paddingVertical: responsiveHeight(0.5),
//         borderRadius: 5,
//         marginTop: responsiveHeight(1),
//         alignItems: 'center',
//         width: '46%',
//         alignItems: 'center'


//     },
//     upcomingButton: {
//         backgroundColor: Colors.ORANGE,
//         paddingHorizontal: responsiveWidth(2),
//         paddingVertical: responsiveHeight(0.5),
//         borderRadius: 5,
//         marginTop: responsiveHeight(1),
//         width: '39%',
//         alignItems: 'center'
//     },
//     completedButton: {
//         backgroundColor: Colors.GREEN,
//         paddingHorizontal: responsiveWidth(2),
//         paddingVertical: responsiveHeight(0.5),
//         borderRadius: 5,
//         marginTop: responsiveHeight(1),
//         width: '58%',
//         alignItems: 'center'
//     },
//     cancelledButton: {
//         backgroundColor: Colors.PINK,
//         paddingHorizontal: responsiveWidth(2),
//         paddingVertical: responsiveHeight(0.5),
//         borderRadius: 5,
//         marginTop: responsiveHeight(1),
//         width: '48%',
//         alignItems: 'center'
//     },
//     defaultButton: {
//         backgroundColor: Colors.default,
//         paddingHorizontal: responsiveWidth(2),
//         paddingVertical: responsiveHeight(0.5),
//         borderRadius: 5,
//     },
//     buttonText: {
//         color: Colors.white,
//         fontSize: responsiveFontSize(1.5),
//         fontWeight: '600',
//     },
//     pendingButtonText: {
//         color: Colors.Dark_Purple,
//         fontSize: responsiveFontSize(1.3),
//         fontWeight: '600',
//     },
//     upcomingButtonText: {
//         color: Colors.Dark_Orange,
//         fontSize: responsiveFontSize(1.3),
//         fontWeight: '600',
//     },
//     completedButtonText: {
//         color: Colors.Dark_Green,
//         fontSize: responsiveFontSize(1.3),
//         fontWeight: '600',
//     },
//     cancelledButtonText: {
//         color: Colors.red,
//         fontSize: responsiveFontSize(1.3),
//         fontWeight: '600',
//     },
//     careTeamImage: {
//         width: 60,
//         height: 60,
//         borderRadius: 30,
//     },
//     rowStyle: {
//         marginLeft: responsiveWidth(4)
//     },
//     upcomingJoinButton: {
//         backgroundColor: Colors.blue,
//         borderRadius: 8,
//         paddingVertical: responsiveHeight(1),
//         paddingHorizontal: responsiveWidth(15),
//         alignItems: 'center',
//         justifyContent: 'center',
//         marginTop: responsiveHeight(2),
//     },
//     completedJoinButton: {
//         borderColor: Colors.black,
//         borderRadius: 8,
//         paddingVertical: responsiveHeight(1),
//         paddingHorizontal: responsiveWidth(15),
//         alignItems: 'center',
//         justifyContent: 'center',
//         borderWidth: 1.5,
//         marginTop: responsiveHeight(2),
//     },

//     upcomingJoinButtonText: {
//         color: Colors.white,
//         fontSize: responsiveFontSize(1.8),
//         fontWeight: '600'
//     },
//     completedJoinButtonText: {
//         color: Colors.black,
//         fontSize: responsiveFontSize(1.8),
//         fontWeight: '600'

//     },

//     declineButton: {
//         backgroundColor: Colors.PINK,
//         paddingHorizontal: responsiveWidth(10),
//         paddingVertical: responsiveHeight(1),
//         borderRadius: 8,
//         alignItems: 'center'
//     },
//     declineButtonText: {
//         color: Colors.red,
//         fontSize: responsiveFontSize(1.8),
//         fontWeight: 'bold',
//     },
//     acceptButton: {
//         backgroundColor: Colors.GREEN,
//         paddingHorizontal: responsiveWidth(10),
//         paddingVertical: responsiveHeight(1),
//         borderRadius: 8,
//         alignItems: 'center'
//     },
//     acceptButtonText: {
//         color: Colors.Dark_Green,
//         fontSize: responsiveFontSize(1.8),
//         fontWeight: 'bold',
//     },
//     cancelbtnRow: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         marginTop: responsiveHeight(2)
//     }
// });


import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Image } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Colors from '../../Themes/Colors';
import LCSWImage from '../../Assets/Images/LCSW.png';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment'; 

const AppointmentCard = ({ appointment }) => {
    const navigation = useNavigation();

    const formattedDate = moment(appointment.appointmentDate, 'MM/DD/YYYY').format('MMMM Do, YYYY');
    const formattedTime = `${appointment.appointmentStartTime} - ${appointment.appointmentEndTime}`;

    return (
        <View style={styles.cardContainer}>
            <Text style={styles.time}>{formattedTime}</Text>
            <View style={styles.detailsContainer}>
                <View style={{ flexDirection: 'row' }}>
                    <Image source={LCSWImage} style={styles.careTeamImage} />
                    <View style={styles.rowStyle}>
                        <Text style={styles.name}>{appointment.providerName}</Text>
                        <Text style={styles.type}>{appointment.appointmentType}</Text>
                        <TouchableOpacity
                            style={
                                appointment.appointmentStatus === 'pending' ? styles.pendingButton :
                                    appointment.appointmentStatus === 'scheduled' ? styles.upcomingButton :
                                        appointment.appointmentStatus === 'completed' ? styles.completedButton :
                                            appointment.appointmentStatus === 'cancelled' ? styles.cancelledButton :
                                                styles.defaultButton
                            }
                        >
                            <Text
                                style={
                                    appointment.appointmentStatus === 'pending' ? styles.pendingButtonText :
                                        appointment.appointmentStatus === 'scheduled' ? styles.upcomingButtonText :
                                            appointment.appointmentStatus === 'completed' ? styles.completedButtonText :
                                                appointment.appointmentStatus === 'cancelled' ? styles.cancelledButtonText :
                                                    styles.buttonText
                                }
                            >
                                {appointment.appointmentStatus}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.detailsButton}
                    onPress={() => navigation.navigate('ViewDetails', { appointmentID: appointment.appointmentID })}
                >
                    <Text style={styles.detailsButtonText}>View Details</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default AppointmentCard;

const styles = StyleSheet.create({
    cardContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    time: {
        transform: [{ rotate: '-90deg' }],
        fontSize: responsiveFontSize(1.4),
        fontWeight: '500',
        color: Colors.darkgrey,
        textAlign: 'center',
        marginTop: responsiveHeight(3),
    },
    detailsContainer: {
        paddingHorizontal: responsiveWidth(4),
        paddingVertical: responsiveHeight(2),
        backgroundColor: Colors.white,
        shadowColor: Platform.OS === 'ios' ? Colors.grey : Colors.black,
        shadowOffset: { width: 0.5, height: 0.5 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation: 5,
        width: '85%',
        marginVertical: responsiveHeight(2),
        borderRadius: 12,
        marginRight: responsiveWidth(13),
    },
    name: {
        fontSize: responsiveFontSize(1.8),
        fontWeight: 'bold',
        color: Colors.black,
    },
    type: {
        fontSize: responsiveFontSize(1.4),
        color: Colors.darkgrey,
        fontWeight: '600',
    },
    pendingButton: {
        backgroundColor: Colors.PURPLE,
        paddingHorizontal: responsiveWidth(2),
        paddingVertical: responsiveHeight(0.5),
        borderRadius: 5,
        marginTop: responsiveHeight(1),
        alignItems: 'center',
        width: '46%',
    },
    upcomingButton: {
        backgroundColor: Colors.ORANGE,
        paddingHorizontal: responsiveWidth(2),
        paddingVertical: responsiveHeight(0.5),
        borderRadius: 5,
        marginTop: responsiveHeight(1),
        width: '39%',
        alignItems: 'center',
    },
    completedButton: {
        backgroundColor: Colors.GREEN,
        paddingHorizontal: responsiveWidth(2),
        paddingVertical: responsiveHeight(0.5),
        borderRadius: 5,
        marginTop: responsiveHeight(1),
        width: '58%',
        alignItems: 'center',
    },
    cancelledButton: {
        backgroundColor: Colors.PINK,
        paddingHorizontal: responsiveWidth(2),
        paddingVertical: responsiveHeight(0.5),
        borderRadius: 5,
        marginTop: responsiveHeight(1),
        width: '48%',
        alignItems: 'center',
    },
    defaultButton: {
        backgroundColor: Colors.default,
        paddingHorizontal: responsiveWidth(2),
        paddingVertical: responsiveHeight(0.5),
        borderRadius: 5,
    },
    buttonText: {
        color: Colors.white,
        fontSize: responsiveFontSize(1.5),
        fontWeight: '600',
    },
    pendingButtonText: {
        color: Colors.Dark_Purple,
        fontSize: responsiveFontSize(1.3),
        fontWeight: '600',
    },
    upcomingButtonText: {
        color: Colors.Dark_Orange,
        fontSize: responsiveFontSize(1.3),
        fontWeight: '600',
    },
    completedButtonText: {
        color: Colors.Dark_Green,
        fontSize: responsiveFontSize(1.3),
        fontWeight: '600',
    },
    cancelledButtonText: {
        color: Colors.red,
        fontSize: responsiveFontSize(1.3),
        fontWeight: '600',
    },
    careTeamImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    rowStyle: {
        marginLeft: responsiveWidth(4),
    },
    detailsButton: {
        backgroundColor: Colors.blue,
        borderRadius: 8,
        paddingVertical: responsiveHeight(1),
        paddingHorizontal: responsiveWidth(15),
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: responsiveHeight(2),
    },
    detailsButtonText: {
        color: Colors.white,
        fontSize: responsiveFontSize(1.8),
        fontWeight: '600',
    },
});

