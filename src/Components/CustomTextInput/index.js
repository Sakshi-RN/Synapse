import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import Colors from '../../Themes/Colors';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

const CustomTextInput = ({ placeholder, value, onChangeText, inputStyle,}) => {
  return (
    <TextInput
      style={[styles.input, inputStyle]}
      placeholder={placeholder}
      placeholderTextColor={Colors.black}
      value={value}
      onChangeText={onChangeText}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor:Colors.lightblue,
    borderRadius: 10, 
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize:responsiveFontSize(2),
    color:Colors.black,
    elevation: 2, 
    fontWeight:'540',
    shadowColor:Colors.grey,
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.25,
    shadowRadius: 3.84, 
  },
});

export default CustomTextInput;
