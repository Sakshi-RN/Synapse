import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const inputFormat = 'DD/MM/YYYY';
const outputFormat = 'DD/MM/YYYY';

const CustomCalendarComponent = ({
  isCalendarModalVisible,
  closeCalendarModal,
  dateSelected,
  current,
}) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState('');

  const handleConfirm = (selectedDate) => {
    setOpen(false);
    const formattedDate = formatDate(selectedDate);
    setDate(formattedDate);
    dateSelected(formatDateValue(selectedDate));
  };

  const formatDate = (current) => moment(current).format(outputFormat);

  const formatDateValue = (current) => moment(current).format(inputFormat);

  useEffect(() => {
    const initialDate = current ? formatDate(current) : '';
    setDate(initialDate);
  }, [current]);

  const today = new Date(); // Current date

  return (
    <View style={styles.container}>
      <DateTimePickerModal
        isVisible={isCalendarModalVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={closeCalendarModal}
        maximumDate={today} // Disable future dates
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CustomCalendarComponent;
