
import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import dayjs from 'dayjs';
import Colors from '../../Themes/Colors';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

export default function HorizontalCalendar() {
    const [selectedDate, setSelectedDate] = useState('');
    const [currentMonth, setCurrentMonth] = useState(dayjs().format('MMMM YYYY'));

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


    const isNewMonth = (currentDate, previousDate) => {
        return dayjs(currentDate).format('YYYY-MM') !== dayjs(previousDate).format('YYYY-MM');
    };


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
                    return (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.dateContainer,
                                isSelected && styles.selectedDateContainer
                            ]}
                            onPress={() => setSelectedDate(date)}
                        >
                            <Text style={[styles.dateText, isSelected && styles.selectedDateText]}>{day}</Text>
                            <Text style={[styles.dayText, isSelected && styles.selectedDayText]}>{dayOfWeek}</Text>
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
        width: responsiveWidth(17),
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
    dateText: {
        color: Colors.darkgrey,
        fontSize: responsiveFontSize(2.3),
        fontWeight: '500',
    },
    selectedDateText: {
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
});



