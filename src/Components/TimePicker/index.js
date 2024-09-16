import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Colors from '../../Themes/Colors';

const TimePicker = () => {
  const [selectedTime, setSelectedTime] = useState(null);

  // Function to generate 24-hour time slots
  const generateTimeSlots = () => {
    const slots = Array(24 * 2) // 24 hours, 2 slots per hour (00 and 30 minutes)
      .fill()
      .map((_, index) => {
        let hour = Math.floor(index / 2);
        let minutes = (index % 2) * 30;
        let displayHour = hour > 12 ? hour - 12 : hour;
        let period = hour < 12 ? 'am' : 'pm';
        if (hour === 0) {
          displayHour = 12; // Midnight case
          period = 'AM';
        }
        return [`${displayHour}:${minutes === 0 ? '00' : minutes} ${period}`];
      });

    return slots.flat();
  };

  const timeSlots = generateTimeSlots();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.dateContainer,
        selectedTime === item ? styles.selectedDateContainer : null,
      ]}
      onPress={() => setSelectedTime(item)}
    >
      <Text
        style={[
          styles.dayText,
          selectedTime === item ? styles.selectedDayText : null,
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  return (
  
      <FlatList
        data={timeSlots}
        renderItem={renderItem}
        keyExtractor={(item) => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.timeContainer}
      />

  );
};

const styles = StyleSheet.create({
  timeContainer:{
    marginHorizontal:responsiveWidth(2),
    marginTop: responsiveHeight(1),
    marginBottom:responsiveHeight(1.5)
  },
  dateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: responsiveWidth(28),
    height: responsiveHeight(5),
    borderRadius: 6,
    marginHorizontal: responsiveWidth(1),
    backgroundColor: Colors.lightgrey,
 
},
selectedDateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: responsiveWidth(28),
    height: responsiveHeight(5),
    borderRadius: 6,
    marginHorizontal: responsiveWidth(1),
    backgroundColor: Colors.blue,

},
dateText: {
    color: Colors.black,
    fontSize: responsiveFontSize(2.5),
    fontWeight: '500'
},
selectedDateText: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: '500',
    color: Colors.white
},
dayText: {
    color: Colors.black,
    fontSize: responsiveFontSize(1.5),
    fontWeight: '500'
},
selectedDayText: {
    color: Colors.white,
    fontSize: responsiveFontSize(1.5),
    fontWeight: '500'

}
});

export default TimePicker;
