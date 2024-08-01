import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Colors from '../../Themes/Colors';

const CustomButton = ({ title, onPress, buttonStyle, textStyle }) => {
  return (
    <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.blue,
    borderRadius: 8,
    paddingVertical: responsiveHeight(1),
    paddingHorizontal: responsiveWidth(15),
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: Colors.white,
    fontSize: responsiveFontSize(1.8)
  },
});

export default CustomButton;
