import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Colors from '../../Themes/Colors';


const TimePicker = () => {
  // Generate time slots for 24 hours with a 30-minute interval
  const timeSlots = Array.from({ length: 48 }, (_, index) => {
    const hours = String(Math.floor(index / 2)).padStart(2, '0');
    const minutes = index % 2 === 0 ? '00' : '30';
    return `${hours}:${minutes}`;
  });

  // State to manage selected time slot and input
  const [selectedTime, setSelectedTime] = useState(null);
  const [reason, setReason] = useState('');

  return (

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
        {timeSlots.map((time, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.dateContainer, selectedTime === time && styles.selectedDateContainer]}
            onPress={() => setSelectedTime(time)}
          >
            <Text style={selectedTime === time ? styles.isSelected : styles.selectedDayText}>{time}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  scrollContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeSlot: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  selectedTimeSlot: {
    backgroundColor: '#3483FA',
  },
  timeText: {
    fontSize: 16,
    color: '#000',
  },
  selectedText: {
    fontSize: 16,
    color: '#fff',
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
    color: Colors.black,
    fontSize: responsiveFontSize(1.7),

}

});

export default TimePicker;
