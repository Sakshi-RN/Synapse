import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import dayjs from 'dayjs';
import Colors from '../../Themes/Colors';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
export default function HorizontalCalendar() {
    const [selectedDate, setSelectedDate] = useState('');

    const dates = Array.from({ length: 30 }, (_, index) => dayjs(`2024-06-${index + 1}`).format('YYYY-MM-DD'));

    return (
        <View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
                {dates.map((date, index) => {
                    const day = dayjs(date).format('D');
                    const isSelected = date === selectedDate;
                    return (
                        <TouchableOpacity style={[styles.dateContainer, isSelected && styles.selectedDateContainer]}
                            key={index}
                            onPress={() => setSelectedDate(date)}>
                            <Text style={[styles.dateText, isSelected && styles.selectedDateText]}>{day}</Text>
                            <Text style={[styles.dayText, isSelected && styles.selectedDayText]}>Mon</Text>
                        </TouchableOpacity>
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
    dateContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: responsiveWidth(16),
        height: responsiveHeight(10),
        borderRadius: 6,
        marginHorizontal: responsiveWidth(0.8),
        backgroundColor: Colors.lightgrey,
        marginTop: responsiveHeight(2),
    },
    selectedDateContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: responsiveWidth(16),
        height: responsiveHeight(10),
        borderRadius: 6,
        marginHorizontal: responsiveWidth(0.8),
        backgroundColor: Colors.blue,
        marginTop: responsiveHeight(2),
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
