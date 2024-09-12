import React from 'react';
import { TextInput, StyleSheet,View,Text } from 'react-native';
import Colors from '../../Themes/Colors';
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';

const CustomTextInput = ({ placeholder, value, onChangeText, inputStyle,title}) => {
  return (
    <View>
      <Text style={styles.titleText}>{title}</Text>
    <TextInput
      style={[styles.input, inputStyle]}
      placeholder={placeholder}
      placeholderTextColor={Colors.black}
      value={value}
      onChangeText={onChangeText}
    />
    </View>
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
  titleText:{
    color: Colors.black,
    fontSize: responsiveFontSize(1.8),
    fontWeight: 'bold',
    marginTop:responsiveHeight(3)
  }
});

export default CustomTextInput;
