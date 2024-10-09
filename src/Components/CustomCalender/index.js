// import React, { useEffect, useState } from 'react';
// import { ScrollView, View, Text, StyleSheet, TouchableOpacity, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
// import dayjs from 'dayjs';
// import Colors from '../../Themes/Colors';
// import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

// export default function HorizontalCalendar({ availableDates }) {
//     const [selectedDate, setSelectedDate] = useState('');
//     const [currentMonth, setCurrentMonth] = useState(dayjs().format('MMMM YYYY'));
//     const [appointmentsCount, setAppointmentsCount] = useState({}); // State for appointment counts
//     const today = dayjs(); // Get current date

//     useEffect(() => {
//         const fetchAppointments = async () => {
//             try {
//                 const response = await fetch('https://eb1.taramind.com/getAllClientAppointments/9bfea3d5-74f4-11ef-9c86-02f35b8058b3', {
//                     method: 'GET',
//                     headers: {
//                         'X-Api-Key': 'e1693d9245c57be86afc22ad06eda84c9cdb74dae6d56a8a7f71a93facb1f42b',
//                     },
//                 });

//                 // Check if response is OK
//                 if (!response.ok) {
//                     throw new Error(`HTTP error! status: ${response.status}`);
//                 }

//                 const data = await response.json();

//                 // Log the entire response
//                 console.log('API Response:', data);

//                 // Check if payload exists and is an array
//                 if (data.payload && Array.isArray(data.payload)) {
//                     const count = {};
//                     data.payload.forEach(appointment => {
//                         const dateKey = dayjs(appointment.aceCompletedDate).format('YYYY-MM-DD');
//                         count[dateKey] = (count[dateKey] || 0) + 1; // Increment appointment count for the date
//                     });
//                     setAppointmentsCount(count);
//                 } else {
//                     console.error('Payload is undefined or not an array:', data.payload);
//                 }
//             } catch (error) {
//                 console.error('Error fetching appointments:', error);
//             }
//         };

//         fetchAppointments();
//     }, []);

//     const generateDatesForNextMonths = () => {
//         const dates = [];
//         const today = dayjs();
//         const monthsToShow = 2;

//         for (let monthOffset = 0; monthOffset <= monthsToShow; monthOffset++) {
//             const currentMonth = today.add(monthOffset, 'month');
//             const daysInMonth = currentMonth.daysInMonth();
//             for (let day = 1; day <= daysInMonth; day++) {
//                 const date = currentMonth.date(day).format('YYYY-MM-DD');
//                 dates.push(date);
//             }
//         }
//         return dates;
//     };

//     const dates = generateDatesForNextMonths();

//     const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
//         const scrollPosition = event.nativeEvent.contentOffset.x;
//         const itemWidth = responsiveWidth(17 + 2);
//         const currentIndex = Math.round(scrollPosition / itemWidth);

//         if (dates[currentIndex]) {
//             const newMonth = dayjs(dates[currentIndex]).format('MMMM YYYY');
//             if (newMonth !== currentMonth) {
//                 setCurrentMonth(newMonth);
//             }
//         }
//     };

//     return (
//         <View style={styles.container}>
//             <Text style={styles.headerText}>{currentMonth}</Text>
//             <ScrollView
//                 horizontal
//                 showsHorizontalScrollIndicator={false}
//                 contentContainerStyle={styles.scrollContainer}
//                 onScroll={handleScroll}
//                 scrollEventThrottle={16}
//             >
//                 {dates.map((date, index) => {
//                     const day = dayjs(date).format('D');
//                     const dayOfWeek = dayjs(date).format('ddd');
//                     const isSelected = date === selectedDate;
//                     const isAvailable = availableDates.includes(date); // Check if date is available
//                     const appointmentCount = appointmentsCount[date] || 0; // Get appointment count for the date
//                     const isToday = dayjs().isSame(date, 'day'); // Check if the date is today

//                     return (
//                         <TouchableOpacity
//                             key={index}
//                             style={[
//                                 styles.dateContainer,
//                                 (isSelected || isToday) && styles.selectedDateContainer, // Use selectedDateContainer for both selected and today's date
//                                 isAvailable && !isSelected && styles.availableDateContainer, // Apply blue background for available dates
//                             ]}
//                             onPress={() => {
//                                 if (isAvailable) {
//                                     setSelectedDate(date);
//                                 }
//                             }}
//                         >
//                             <Text style={[styles.dateText, isSelected && styles.selectedDateText, isToday && !isSelected && styles.todayDateText]}>{day}</Text>
//                             <Text style={[styles.dayText, isSelected && styles.selectedDayText, isToday && !isSelected && styles.todayDayText]}>{dayOfWeek}</Text>

//                             <View style={styles.dotsContainer}>
//                                 <View style={styles.dot} />
//                                 <View style={styles.dot} />
//                             </View>
//                         </TouchableOpacity>
//                     );
//                 })}
//             </ScrollView>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         paddingVertical: responsiveHeight(2),
//         backgroundColor: Colors.white,
//     },
//     headerText: {
//         fontSize: responsiveFontSize(2),
//         fontWeight: 'bold',
//         color: Colors.blue,
//         marginBottom: responsiveHeight(1),
//         marginLeft: responsiveWidth(3)
//     },
//     scrollContainer: {
//         flexDirection: 'row',
//         paddingHorizontal: responsiveWidth(2),
//     },
//     dateContainer: {
//         alignItems: 'center',
//         justifyContent: 'center',
//         width: responsiveWidth(18),
//         height: responsiveHeight(10),
//         borderRadius: 8,
//         marginHorizontal: responsiveWidth(1),
//         backgroundColor: Colors.lightgrey,
//     },
//     selectedDateContainer: {
//         backgroundColor: Colors.blue, // Use blue background for selected date and today's date
//         borderColor: Colors.white,
//         borderWidth: 1,
//     },
//     availableDateContainer: {
//         backgroundColor: Colors.blue, // Background color for available dates
//     },
//     dateText: {
//         color: Colors.darkgrey,
//         fontSize: responsiveFontSize(2.3),
//         fontWeight: '500',
//     },
//     selectedDateText: {
//         color: Colors.white,
//     },
//     todayDateText: {
//         color: Colors.white, // Color for today's date
//     },
//     dayText: {
//         color: Colors.grey,
//         fontSize: responsiveFontSize(1.7),
//         fontWeight: '700',
//     },
//     selectedDayText: {
//         color: Colors.white,
//     },
//     todayDayText: {
//         color: Colors.white, // Color for today's day
//     },
//     dotsContainer: {
//         flexDirection: 'row',
//         marginTop: responsiveHeight(1),
//         alignItems: 'center'  
//     },
//     dot: {
//         width: 4,
//         height: 4,
//         borderRadius: 2,
//         backgroundColor: Colors.grey,
//         marginHorizontal: 2, // Space between dots
//     },
// });



import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import dayjs from 'dayjs';
import Colors from '../../Themes/Colors';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

export default function HorizontalCalendar({ availableDates }) {
    const [selectedDate, setSelectedDate] = useState('');
    const [currentMonth, setCurrentMonth] = useState(dayjs().format('MMMM YYYY'));
    const [appointmentsCount, setAppointmentsCount] = useState({}); // State for appointment counts
    const today = dayjs(); // Get current date

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await fetch('https://eb1.taramind.com/getAllClientAppointments/9bfea3d5-74f4-11ef-9c86-02f35b8058b3', {
                    method: 'GET',
                    headers: {
                        'X-Api-Key': 'e1693d9245c57be86afc22ad06eda84c9cdb74dae6d56a8a7f71a93facb1f42b',
                    },
                });

                // Check if response is OK
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                // Log the entire response
                console.log('API Response:', data);

                // Check if payload exists and is an array
                if (data.payload && Array.isArray(data.payload)) {
                    const count = {};
                    data.payload.forEach(appointment => {
                        const dateKey = dayjs(appointment.aceCompletedDate).format('YYYY-MM-DD');
                        count[dateKey] = (count[dateKey] || 0) + 1; // Increment appointment count for the date
                    });
                    setAppointmentsCount(count);
                } else {
                    console.error('Payload is undefined or not an array:', data.payload);
                }
            } catch (error) {
                console.error('Error fetching appointments:', error);
            }
        };

        fetchAppointments();
    }, []);

    const generateDatesForNextMonths = () => {
        const dates = [];
        const today = dayjs();
        const monthsToShow = 2;

        for (let monthOffset = 0; monthOffset <= monthsToShow; monthOffset++) {
            const currentMonth = today.add(monthOffset, 'month');
            const daysInMonth = currentMonth.daysInMonth();
            for (let day = 1; day <= daysInMonth; day++) {
                const date = currentMonth.date(day).format('YYYY-MM-DD');
                dates.push(date);
            }
        }
        return dates;
    };

    const dates = generateDatesForNextMonths();

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const scrollPosition = event.nativeEvent.contentOffset.x;
        const itemWidth = responsiveWidth(17 + 2);
        const currentIndex = Math.round(scrollPosition / itemWidth);

        if (dates[currentIndex]) {
            const newMonth = dayjs(dates[currentIndex]).format('MMMM YYYY');
            if (newMonth !== currentMonth) {
                setCurrentMonth(newMonth);
            }
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>{currentMonth}</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContainer}
                onScroll={handleScroll}
                scrollEventThrottle={16}
            >
                {dates.map((date, index) => {
                    const day = dayjs(date).format('D');
                    const dayOfWeek = dayjs(date).format('ddd');
                    const isSelected = date === selectedDate;
                    const isAvailable = availableDates.includes(date);
                    const appointmentCount = appointmentsCount[date] || 0;
                    const isToday = dayjs().isSame(date, 'day');

                    return (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.dateContainer,
                                isSelected && styles.selectedDateContainer, // Use selectedDateContainer for selected date
                                isAvailable && !isSelected && styles.availableDateContainer, // Apply background for available dates only if not selected
                                isToday && styles.todayDateContainer // Optionally highlight today's date
                            ]}
                            onPress={() => {
                                if (isAvailable) {
                                    setSelectedDate(date);
                                }
                            }}
                        >
                            <Text style={[styles.dateText, isSelected && styles.selectedDateText, isToday && !isSelected && styles.todayDateText]}>{day}</Text>
                            <Text style={[styles.dayText, isSelected && styles.selectedDayText, isToday && !isSelected && styles.todayDayText]}>{dayOfWeek}</Text>

                            <View style={styles.dotsContainer}>
                                <View style={styles.dot} />
                                <View style={styles.dot} />
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: responsiveHeight(2),
        backgroundColor: Colors.white,
    },
    headerText: {
        fontSize: responsiveFontSize(2),
        fontWeight: 'bold',
        color: Colors.blue,
        marginBottom: responsiveHeight(1),
        marginLeft: responsiveWidth(3)
    },
    scrollContainer: {
        flexDirection: 'row',
        paddingHorizontal: responsiveWidth(2),
    },
    dateContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: responsiveWidth(18),
        height: responsiveHeight(10),
        borderRadius: 8,
        marginHorizontal: responsiveWidth(1),
        backgroundColor: Colors.lightgrey,
    },
    selectedDateContainer: {
        backgroundColor: Colors.blue, 
        borderColor: Colors.white,
        borderWidth: 1,
    },
    availableDateContainer: {
        backgroundColor: Colors.blue, 
    },
    todayDateContainer: {
        backgroundColor: Colors.blue, // Optional: change this to any color you want for today's date
    },
    dateText: {
        color: Colors.darkgrey,
        fontSize: responsiveFontSize(2.3),
        fontWeight: '500',
    },
    selectedDateText: {
        color: Colors.white,
    },
    todayDateText: {
        color: Colors.white, // Color for today's date
    },
    dayText: {
        color: Colors.grey,
        fontSize: responsiveFontSize(1.7),
        fontWeight: '700',
    },
    selectedDayText: {
        color: Colors.white,
    },
    todayDayText: {
        color: Colors.white, // Color for today's day
    },
    dotsContainer: {
        flexDirection: 'row',
        marginTop: responsiveHeight(1),
        alignItems: 'center'  
    },
    dot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: Colors.grey,
        marginHorizontal: 2, // Space between dots
    },
});
