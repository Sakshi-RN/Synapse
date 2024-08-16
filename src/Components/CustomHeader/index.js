// CustomHeader.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import {Circle,Bell} from '../../Assets/svg'
import images from '../../Themes/Images';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import  Colors  from '../../Themes/Colors';
const CustomHeader = ({ title, onLeftPress, onRightPress }) => {
  return (
    <ImageBackground source={images.headerBgImg} style={styles.headerContainer}>
      <TouchableOpacity onPress={onLeftPress}>
      <Circle/>
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={onRightPress}>
       <Bell/>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: responsiveHeight(5),
    paddingHorizontal: responsiveWidth(8),
    height:responsiveHeight(13)
    
  },

  title: {
    fontSize: responsiveFontSize(2.2),
    color:Colors.white,
    fontWeight:'500',
    alignSelf:'center'
  },
});

export default CustomHeader;
