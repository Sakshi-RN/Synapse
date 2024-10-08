import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import dayjs from 'dayjs';
import Colors from '../../Themes/Colors';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

export default function HorizontalCalendar() {
    const [selectedDate, setSelectedDate] = useState('');

    // Function to generate the dates for the next 3 months starting from the current month
    const generateDatesForNextMonths = () => {
        const dates = [];
        const today = dayjs(); 
        const monthsToShow = 3; 

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

    // Function to check if a new month starts
    const isNewMonth = (currentDate, previousDate) => {
        return dayjs(currentDate).format('YYYY-MM') !== dayjs(previousDate).format('YYYY-MM');
    };

    return (
        <View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
                {dates.map((date, index) => {
                    const day = dayjs(date).format('D'); // Day of the month
                    const dayOfWeek = dayjs(date).format('ddd'); // Day of the week abbreviation
                    const monthNameWithYear = dayjs(date).format('MMMM YYYY'); // Month name with year
                    const isSelected = date === selectedDate;
                    const showMonthName = index === 0 || isNewMonth(date, dates[index - 1]);

                    return (
                        <View key={index}>
                            {/* Display month name with year when a new month starts */}
                            {showMonthName && (
                                <Text style={styles.monthText}>{monthNameWithYear}</Text>
                            )}
                            <TouchableOpacity
                                style={[styles.dateContainer, isSelected && styles.selectedDateContainer]}
                                onPress={() => setSelectedDate(date)}
                            >
                                <Text style={[styles.dateText, isSelected && styles.selectedDateText]}>{day}</Text>
                                <Text style={[styles.dayText, isSelected && styles.selectedDayText]}>{dayOfWeek}</Text>
                            </TouchableOpacity>
                        </View>
                    );
                })}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: responsiveWidth(3)
    },
    monthText: {
        fontSize: responsiveFontSize(2.2),
        fontWeight: 'bold',
        color: Colors.blue,
        marginTop: responsiveHeight(2),
        marginBottom: responsiveHeight(1),
        marginLeft: responsiveWidth(3), // Adjust left margin to align properly
    },
    dateContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: responsiveWidth(16),
        height: responsiveHeight(10),
        borderRadius: 6,
        marginHorizontal: responsiveWidth(0.8),
        backgroundColor: Colors.lightgrey,
        marginTop: responsiveHeight(1),
    },
    selectedDateContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: responsiveWidth(16),
        height: responsiveHeight(10),
        borderRadius: 6,
        marginHorizontal: responsiveWidth(0.8),
        backgroundColor: Colors.blue,
        marginTop: responsiveHeight(1),
    },
    dateText: {
        color: Colors.darkgrey,
        fontSize: responsiveFontSize(2.5),
        fontWeight: '500'
    },
    selectedDateText: {
        fontSize: responsiveFontSize(2.5),
        fontWeight: '500',
        color: Colors.white
    },
    dayText: {
        color: Colors.grey,
        fontSize: responsiveFontSize(1.7),
        fontWeight: '600'
    },
    selectedDayText: {
        color: Colors.white,
        fontSize: responsiveFontSize(1.7),
    }
});
