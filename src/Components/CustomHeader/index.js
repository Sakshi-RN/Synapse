import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Fonts } from '../../Themes/fonts';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import {Circle,Bell} from '../../Assets/svg'
import images from '../../Themes/Images';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import  Colors  from '../../Themes/Colors';

const CustomHeader = ({ title }) => {
  const navigation = useNavigation();

  const handlNotification =()=>{
    navigation.navigate('Notification');
}
  return (
    <View source={images.headerBgImg} style={styles.headerContainer}>
      <Circle/>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={handlNotification}>
       <Bell/>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: responsiveHeight(4),
    paddingHorizontal: responsiveWidth(8),
    height: responsiveHeight(12),
        borderBottomWidth:2,
        borderBottomColor:Colors.Dark_Orange,
backgroundColor:Colors.blue
    
  },

  title: {
    fontSize: responsiveFontSize(2.2),
    color:Colors.white,
    fontFamily: Fonts.Medium600,
    alignSelf:'center'
  },
});

export default CustomHeader;
