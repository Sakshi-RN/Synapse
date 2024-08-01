import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Colors from '../../Themes/Colors';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const OTPInput = ({ length = 6, onResend }) => {
  const [otp, setOtp] = useState(new Array(length).fill(''));
  const [focusedIndex, setFocusedIndex] = useState(null);
  const inputs = useRef([]);

  const handleChange = (value, index) => {
    const newOtp = [...otp];
    if (value === '') {
      newOtp[index] = '';
    } else if (!isNaN(value)) {
      newOtp[index] = value;
      if (index < length - 1) {
        inputs.current[index + 1].focus();
      }
    }
    setOtp(newOtp);
  };

  const handleKeyPress = (event, index) => {
    if (event.nativeEvent.key === 'Backspace' && otp[index] === '') {
      if (index > 0) {
        inputs.current[index - 1].focus();
      }
    } else if (event.nativeEvent.key === 'Backspace') {
      handleChange('', index);
    }
  };

  return (

      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputs.current[index] = ref)}
            value={digit}
            onChangeText={(value) => handleChange(value, index)}
            onKeyPress={(event) => handleKeyPress(event, index)}
            onFocus={() => setFocusedIndex(index)}
            onBlur={() => setFocusedIndex(null)}
            style={[
              styles.input,
              focusedIndex === index && styles.inputFocused,
            ]}
            keyboardType="numeric"
            maxLength={1}
            textAlign="center"
          />
        ))}
      </View>

  );
};

const styles = StyleSheet.create({

  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf:'center',
  },
  input: {
    width:responsiveWidth(11),
    height:responsiveHeight(5.5),
    borderWidth: 1,
    borderRadius:12,
    borderColor:Colors.lightgrey,
    marginRight: 10,
    fontSize:responsiveFontSize(2),
    color:Colors.black,
  },
  inputFocused: {
    borderColor: Colors.black
  },
});

export default OTPInput;
