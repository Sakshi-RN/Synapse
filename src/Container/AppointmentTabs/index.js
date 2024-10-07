// import React, { useState, useEffect } from 'react';
// import { View, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';
// import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';
// import Colors from '../../Themes/Colors';
// import AppointmentCard from '../AppointmentCard';  
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchAppointments } from '../../redux/Reducers/AppointmentReducer'; 
// const tabs = ['All', 'Pending', 'Upcoming', 'Completed', 'Cancelled'];

// const AppointmentTabs = () => {
//     const dispatch = useDispatch();
//     const { appointments, loading } = useSelector((state) => state.appointments);
//     const [activeTab, setActiveTab] = useState('All');

//     useEffect(() => {
       
//         dispatch(fetchAppointments());
//     }, [dispatch]);


//     const filterAppointments = () => {
//         if (activeTab === 'All') {
//             return appointments;
//         } else {
//             return appointments.filter(appointment => appointment.appointmentStatus === activeTab.toLowerCase());
//         }
//     };

//     const renderTab = ({ item: tab }) => (
//         <TouchableOpacity
//             onPress={() => setActiveTab(tab)}
//             style={[styles.tabButton, activeTab === tab && styles.activeTab]}
//         >
//             <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
//         </TouchableOpacity>
//     );

//     return (
//         <View>

//             <FlatList
//                 data={tabs}
//                 renderItem={renderTab}
//                 keyExtractor={(item) => item}
//                 horizontal
//                 showsHorizontalScrollIndicator={false}
//                 style={styles.tabsContainer}
//             />

//             {/* Appointment List */}
//             {!loading ? (
//                 <FlatList
//                     data={filterAppointments()}
//                     keyExtractor={(item) => item.appointmentID}
//                     renderItem={({ item }) => <AppointmentCard appointment={item} />}
//                 />
//             ) : (
//                 <Text>Loading...</Text>
//             )}
//         </View>
//     );
// };

// export default AppointmentTabs;

// const styles = StyleSheet.create({
//     tabsContainer: {
//         marginTop: responsiveHeight(1),
//         height: responsiveHeight(5),
//     },
//     tabButton: {
//         paddingHorizontal: responsiveWidth(3),
//         height: responsiveHeight(3),
//         justifyContent: 'center',
//         alignItems: 'center',
//         borderRadius: 12,
//         marginHorizontal: responsiveWidth(2),
//     },
//     tabText: {
//         fontSize: responsiveFontSize(1.5),
//         color: Colors.darkgrey,
//         fontWeight: '600',
//     },
//     activeTab: {
//         backgroundColor: Colors.skyblue,
//         paddingHorizontal: responsiveWidth(3),
//         height: responsiveHeight(3),
//         justifyContent: 'center',
//         alignItems: 'center',
//         borderRadius: 12,
//     },
//     activeTabText: {
//         color: Colors.blue,
//         fontSize: responsiveFontSize(1.5),
//         fontWeight: '600',
//     },
// });


import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';
import Colors from '../../Themes/Colors';
import AppointmentCard from '../AppointmentCard';

const tabs = ['All', 'Pending', 'Upcoming', 'Completed', 'Cancelled'];

const AppointmentTabs = () => {
    const [appointments, setAppointments] = useState([]); // Correct hook
    const [loading, setLoading] = useState(true); // Correct hook
    const [error, setError] = useState(null); // Correct hook
    const [activeTab, setActiveTab] = useState('All');

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await fetch('https://eb1.taramind.com/getAllClientAppointments/9bfea3d5-74f4-11ef-9c86-02f35b8058b3', {
                    method: 'GET',
                    headers: {
                        'X-Api-Key': 'e1693d9245c57be86afc22ad06eda84c9cdb74dae6d56a8a7f71a93facb1f42b',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch appointments');
                }

                const data = await response.json();
                setAppointments(data.appointments || []); // Ensure that appointments is defined
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchAppointments();
    }, []); // Only run on mount


    // Filter appointments based on active tab
    const filterAppointments = () => {
        if (activeTab === 'All') {
            return appointments;
        } else {
            return appointments.filter(appointment => appointment.appointmentStatus === activeTab.toLowerCase());
        }
    };

    const renderTab = ({ item: tab }) => (
        <TouchableOpacity
            onPress={() => setActiveTab(tab)}
            style={[styles.tabButton, activeTab === tab && styles.activeTab]}
        >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
        </TouchableOpacity>
    );

    if (loading) {
        return <Text>Loading...</Text>;
    }

    if (error) {
        return <Text>Error: {error}</Text>;
    }

    return (
        <View>
            {/* Tabs */}
            <FlatList
                data={tabs}
                renderItem={renderTab}
                keyExtractor={(item) => item}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.tabsContainer}
            />

            {/* Appointment List */}
            <FlatList
                data={filterAppointments()}
                keyExtractor={(item) => item.appointmentID}
                renderItem={({ item }) => <AppointmentCard appointment={item} />}
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
