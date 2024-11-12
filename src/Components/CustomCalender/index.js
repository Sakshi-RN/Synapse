import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Modal } from 'react-native';
import dayjs from 'dayjs';
import Colors from '../../Themes/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

export default function HorizontalCalendar({ setFilteredAppointments }) {
    const [selectedDate, setSelectedDate] = useState('');
    const [fetchAppointments, setFetchAppointments] = useState([]);
    const [currentMonth, setCurrentMonth] = useState(dayjs().format('MMMM YYYY'));
    const [appointmentsCount, setAppointmentsCount] = useState({});
    const [isCalendarModalVisible, setCalendarModalVisible] = useState(false);
    const [selected, setSelected] = useState('');
    const todays = moment().format('YYYY-MM-DD');

    const handleDateSelection = (date) => {
        const formattedDate = dayjs(date).format('MM/DD/YYYY');
        const filterData = fetchAppointments.filter(appointment => appointment.appointmentDate === formattedDate);
        setFilteredAppointments(filterData);
        setSelectedDate(date); // Update selectedDate directly here
    };



    const generateNextFourDays = () => {
        const dates = [];
        for (let i = 0; i < 4; i++) {
            dates.push(dayjs().add(i, 'day').format('YYYY-MM-DD'));
        }
        return dates;
    };
    const dates = generateNextFourDays();

    const toggleModalVisibility = () => {
        setCalendarModalVisible(prev => !prev);
    };

    useEffect(() => {
        const fetchAppointmentsData = async () => {
            try {
                const response = await fetch(
                    'https://eb1.taramind.com/getAllClientAppointments/32169136-9c4f-11ef-83e8-02f35b8058b3',
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
                setFetchAppointments(data);

                const countMap = {};
                data.forEach(appointment => {
                    const rawDate = appointment.appointmentDate;
                    const formattedDate = dayjs(rawDate).isValid()
                        ? dayjs(rawDate).format('YYYY-MM-DD')
                        : new Date(rawDate).toISOString().split('T')[0];
                    if (formattedDate) {
                        countMap[formattedDate] = (countMap[formattedDate] || 0) + 1;
                    }
                });

                setAppointmentsCount(countMap);
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchAppointmentsData();
    }, []);

    const Calender = () => {
        return (
            <Calendar
                onDayPress={day => {
                    setSelected(day.dateString);
                    handleDateSelection(day.dateString);
                    toggleModalVisibility();
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
                <TouchableOpacity style={{ marginTop: responsiveHeight(0.2), marginLeft: responsiveWidth(1) }}
                    onPress={toggleModalVisibility} >
                    <Icon name="chevron-down" size={15} color={Colors.black} />
                </TouchableOpacity>
            </View>
            <View style={styles.calenderContainer}>
                <Modal
                    transparent={true}
                    visible={isCalendarModalVisible}
                    onRequestClose={toggleModalVisibility}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <Calender />
                        </View>
                    </View>
                </Modal>
            </View>
            <View style={styles.scrollContainer}>
                {dates.map((date, index) => {
                    const day = dayjs(date).format('D');
                    const dayOfWeek = dayjs(date).format('ddd');
                    const isSelected = date === selectedDate;
                    const isToday = dayjs().isSame(date, 'day');
                    const hasAppointments = appointmentsCount[date];
                    return (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.dateContainer,

                                isSelected && styles.selectedDateContainer,
                                isToday && styles.todayDateContainer,  // Do not apply background change for today's date
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
                            {hasAppointments && <Text style={styles.dot}>•</Text>}

                        </TouchableOpacity>
                    );
                })}
            </View>
            <Text style={[styles.headerText,{marginTop:responsiveHeight(2.5)}]}>Today</Text>
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
        paddingHorizontal: responsiveWidth(5),
    },
    dateContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: responsiveWidth(19),
        height: responsiveHeight(11),
        borderRadius: 8,
        marginHorizontal: responsiveWidth(1.5),
        backgroundColor: '#F5F5F5',
    },
    selectedDateContainer: {
        backgroundColor: '#87ABC9',
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

    dot: {
        fontSize: 20,
        color: Colors.grey,
        marginHorizontal: responsiveWidth(3),
        fontWeight: '500'
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
    },
    modalOverlay: {
        marginTop: responsiveHeight(20),
        marginLeft: responsiveWidth(4)

    },
    modalContent: {
        width: '75%',
        backgroundColor: Colors.white,
        paddingVertical: responsiveHeight(2),
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },

});


