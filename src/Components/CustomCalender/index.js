import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Modal } from 'react-native';
import dayjs from 'dayjs';
import Colors from '../../Themes/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Calendar } from 'react-native-calendars';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import moment from "moment";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function HorizontalCalendar({ setFilteredAppointments }) {
    const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));
    const [fetchAppointments, setFetchAppointments] = useState([]);
    const [currentMonth, setCurrentMonth] = useState(dayjs().format('MMMM YYYY'));
    const [appointmentsCount, setAppointmentsCount] = useState({});
    const [isCalendarModalVisible, setCalendarModalVisible] = useState(false);
    const [dates, setDates] = useState([]);
    const [activeButton, setActiveButton] = useState('today');

    const todaysDate = dayjs().format('YYYY-MM-DD');

    const generateNextFourDays = (startDate) => {
        const datesArray = [];
        for (let i = 0; i < 4; i++) {
            datesArray.push(dayjs(startDate).add(i, 'day').format('YYYY-MM-DD'));
        }
        return datesArray;
    };

    const handleDateSelection = (date) => {
        const formattedDate = dayjs(date).format('MM/DD/YYYY');
        const filterData = fetchAppointments.filter(appointment => appointment.appointmentDate === formattedDate);
        setFilteredAppointments(filterData);
        setSelectedDate(date);
        setDates(generateNextFourDays(date));
        setCurrentMonth(dayjs(date).format('MMMM YYYY'));
    };

    const handleDateCardSelection = (date) => {
        const formattedDate = dayjs(date).format('MM/DD/YYYY');
        const filterData = fetchAppointments.filter(appointment => appointment.appointmentDate === formattedDate);
        setFilteredAppointments(filterData);
        setSelectedDate(date);
        const newMonth = dayjs(date).format('MMMM YYYY');
        setCurrentMonth(newMonth);
    };

    const toggleModalVisibility = () => {
        setCalendarModalVisible(prev => !prev);
    };

    const fetchAppointmentsData = async () => {
        try {
            const clientId = await AsyncStorage.getItem('authclientID');
            if (!clientId) {
                Alert.alert('Error', 'No clientID found');
                return;
            }
    
            const response = await fetch(
                `https://eb1.taramind.com/getAllClientAppointments/${clientId}`,
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
                const parsedDate = moment(rawDate, 'MM/DD/YYYY', true);
                if (parsedDate.isValid()) {
                    const formattedDate = parsedDate.format('YYYY-MM-DD');
                    countMap[formattedDate] = (countMap[formattedDate] || 0) + 1;
                }
            });
            setAppointmentsCount(countMap);
            const todayFormatted = dayjs().format('MM/DD/YYYY');
            const todayAppointments = data.filter(appointment => appointment.appointmentDate === todayFormatted);
            setFilteredAppointments(todayAppointments);
        } catch (error) {
            console.error('Error fetching appointments:', error.message);
        }
    };
    useEffect(() => {
        fetchAppointmentsData();
    }, []);


    const handleButtonPress = (button) => {
        setActiveButton(button);
        if (button === 'today') {
            handleDateSelection(todaysDate);
        } else {
            setFilteredAppointments(fetchAppointments);
        }
    };
    const CalendarComponent = () => (
        <Calendar
            onDayPress={day => {
                handleDateSelection(day.dateString);
                toggleModalVisibility();
            }}
            markedDates={{
                [selectedDate]: { selected: true, disableTouchEvent: true, selectedDotColor: 'orange' },
                [todaysDate]: { selected: true, selectedColor: '#354764' },
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
    );

    useEffect(() => {
        fetchAppointmentsData();
        setActiveButton('today'); // Default active button
    }, []);
    return (
        <View style={styles.container}>
            <View style={styles.calenderRow}>
                <View style={styles.row}>
                    <Text style={styles.headerText}>{currentMonth}</Text>
                    <TouchableOpacity
                        style={{ marginTop: responsiveHeight(0.2), marginLeft: responsiveWidth(1) }}
                        onPress={toggleModalVisibility}
                    >
                        <Icon name="chevron-down" size={15} color={Colors.black} />
                    </TouchableOpacity>
                </View>
                <Text  style={[
                        styles.todayText,
                        activeButton === 'today' && styles.activeButton
                    ]}
                    onPress={() => handleButtonPress('today')}>Today</Text>
                <Text   style={[
                        styles.todayText,
                        activeButton === 'all' && styles.activeButton
                    ]}
                    onPress={() => handleButtonPress('all')}>All</Text>
            </View>
            <View style={styles.calenderContainer}>
                <Modal
                    transparent={true}
                    visible={isCalendarModalVisible}
                    onRequestClose={toggleModalVisibility}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <CalendarComponent />
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
                    const hasAppointments = !!appointmentsCount[date];


                    return (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.dateContainer,
                                isSelected && styles.selectedDateContainer,
                                isToday && !isSelected && styles.todayDateContainer,
                            ]}
                            onPress={() => handleDateCardSelection(date)}
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
                            {hasAppointments && <Text style={[styles.dot, styles.dayText,
                            isSelected && styles.selectedDayText,
                            isToday && !isSelected && styles.todayDayText]}>•••</Text>}
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: responsiveHeight(2),
        backgroundColor: Colors.white,
    },
    headerText: {
        fontSize: responsiveFontSize(1.8),
        fontWeight: '700',
        color: Colors.blue,

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
    calenderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: responsiveHeight(3),
        marginHorizontal: responsiveWidth(5),
        width: responsiveWidth(85)
    },
    todayText: {
        fontSize: responsiveFontSize(1.8),
        fontWeight: '700',
        color: Colors.blue,
        textDecorationLine: 'underline'
    },
    activeButton: {
        backgroundColor: Colors.blue,
        color: Colors.white,
        paddingHorizontal:responsiveWidth(4),
        paddingVertical:responsiveHeight(0.5),
        borderRadius:12,
    }

});


