import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import dayjs from 'dayjs';
import Colors from '../../Themes/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import moment from 'moment';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

export default function HorizontalCalendar({ availableDates, setFilteredAppointments, filteredAppointments }) {
    const [selectedDate, setSelectedDate] = useState('');
    const [fetchAppointments, setFetchAppointments] = useState([]);
    const [currentMonth, setCurrentMonth] = useState(dayjs().format('MMMM YYYY'));
    const [appointmentsCount, setAppointmentsCount] = useState({});
    const [selected, setSelected] = useState('');
    const todays = moment().format('YYYY-MM-DD');


    const handleDateSelection = (date) => {
        const formattedDate = dayjs(date).format('MM/DD/YYYY');
        const filterData = fetchAppointments.filter(appointment => appointment.appointmentDate === formattedDate);
        setFilteredAppointments(filterData);
        setSelectedDate(date);
    };



    const today = dayjs();

    const generateDatesForNextMonths = () => {
        const dates = [];
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

    const handleScroll = (event) => {
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

    useEffect(() => {
        const fetchAppointmentsData = async () => {
            try {
                const response = await fetch(
                    'https://eb1.taramind.com/getAllClientAppointments/9bfea3d5-74f4-11ef-9c86-02f35b8058b3',
                    {
                        method: 'GET',
                        headers: {
                            'X-Api-Key': 'e1693d9245c57be86afc22ad06eda84c9cdb74dae6d56a8a7f71a93facb1f42b',
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch appointments');
                }

                const data = await response.json();

                // Log the appointment date format
                data.forEach(appointment => {

                });

                setFetchAppointments(data);

                const countMap = {};
                data.forEach(appointment => {
                    // First, check the raw format of appointment.appointmentDate
                    const rawDate = appointment.appointmentDate;

                    // Try to parse the date if it's in an unusual format, e.g., if it’s a timestamp or different string format
                    let formattedDate;
                    if (dayjs(rawDate).isValid()) {
                        formattedDate = dayjs(rawDate).format('YYYY-MM-DD'); // Valid date
                    } else {
                        // Fallback for invalid date parsing (modify this based on the actual format)
                        formattedDate = new Date(rawDate).toISOString().split('T')[0]; // Try ISO format fallback
                    }



                    // If valid, add to count map
                    if (formattedDate) {
                        countMap[formattedDate] = (countMap[formattedDate] || 0) + 1;
                    }
                });

                // Log the countMap to ensure it’s populated correctly


                setAppointmentsCount(countMap);

            } catch (error) {
                console.error(error.message);
            }
        };

        fetchAppointmentsData();
    }, []);


    const renderDots = (appointmentCount, isSelected, isToday) => {


        if (appointmentCount === 0) {
            return null;
        }

        if (appointmentCount > 3) {
            return (
                <Text style={[
                    styles.moreAppointmentsText,
                    isSelected && styles.selectedMoreAppointmentsText,
                    isToday && styles.todayMoreAppointmentsText
                ]}>
                    ... +{appointmentCount - 3}
                </Text>
            );
        }

        return (
            <View style={styles.dotsContainer}>
                {Array.from({ length: appointmentCount }).map((_, dotIndex) => (
                    <View
                        key={dotIndex}
                        style={[
                            styles.dot,
                            isSelected && styles.selectedDot,
                            isToday && styles.todayDot
                        ]}
                    />
                ))}
            </View>
        );
    };

    const Calender = () => {
        return (
            <Calendar
                onDayPress={day => {
                    setSelected(day.dateString);
                }}
                markedDates={{
                    [selected]: { selected: true, disableTouchEvent: true, selectedDotColor: 'orange' },
                    [todays]: { selected: true, selectedColor: '#354764' },
                }}
                theme={{
                    textSectionTitleColor: 'black',
                    selectedDayBackgroundColor: '#87ABC9',
                    selectedDayTextColor: '#ffffff',
                    todayTextColor: '#fffff',
                    dayTextColor: 'black',
                    textDisabledColor: '#87ABC9',
                    monthTextColor: 'black',
                    textMonthFontSize: 19,
                    textMonthFontWeight: '500',
                    textDayFontWeight: '600',
                    textDayHeaderFontWeight: '600',
                    arrowColor: 'black'
                }}
            />
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.headerText}>{currentMonth}</Text>
                <TouchableOpacity style={{ marginTop: responsiveHeight(0.2), marginLeft: responsiveWidth(1) }}>
                    <Icon name="chevron-down" size={15} color={Colors.black} />
                </TouchableOpacity>
            </View>
            <View style={styles.calenderContainer}>
                <Calender

                />
            </View>
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
                                isSelected && styles.selectedDateContainer,
                                isAvailable && !isSelected && styles.availableDateContainer,
                                isToday && styles.todayDateContainer
                            ]}
                            onPress={() => handleDateSelection(date)}
                        >
                            <Text style={[
                                styles.dateText,
                                isSelected && styles.selectedDateText,
                                isToday && !isSelected && styles.todayDateText
                            ]}>{day}</Text>
                            <Text style={[
                                styles.dayText,
                                isSelected && styles.selectedDayText,
                                isToday && !isSelected && styles.todayDayText
                            ]}>{dayOfWeek}</Text>

                            {renderDots(appointmentCount, isSelected, isToday)}
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
        backgroundColor: Colors.blue,
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
        color: Colors.white,
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
        color: Colors.white,
    },
    dotsContainer: {
        flexDirection: 'row',
        marginTop: responsiveHeight(1),
        alignItems: 'center',
    },
    dot: {
        width: 5,
        height: 5,
        borderRadius: 2.5,
        backgroundColor: Colors.grey,
        marginHorizontal: 2,
    },
    selectedDot: {
        backgroundColor: Colors.white,
    },
    todayDot: {
        backgroundColor: Colors.blue,
    },
    moreAppointmentsText: {
        color: Colors.grey,
        marginTop: responsiveHeight(1),
        fontSize: responsiveFontSize(1.7),
        fontWeight: '700',
    },
    selectedMoreAppointmentsText: {
        color: Colors.white,
    },
    todayMoreAppointmentsText: {
        color: Colors.blue,
    },
    row: {
        flexDirection: 'row'
    },
    calenderContainer: {
        paddingHorizontal: responsiveWidth(1),
        backgroundColor: Colors.white,
        shadowColor: Platform.OS === 'ios' ? Colors.grey : Colors.black,
        shadowOffset: {
            width: 0.5,
            height: 0.5,
        },
        shadowOpacity: 3,
        shadowRadius: 3,
        elevation: 5,
        borderRadius: 15,
        width: '75%',
        marginLeft: responsiveWidth(4)
    }
});
