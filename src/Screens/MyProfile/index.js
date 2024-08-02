import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { SplashIcon, Logo } from '../../Assets/svg';
import images from '../../Themes/Images';
import { responsiveHeight } from 'react-native-responsive-dimensions';

const Splash = () => {
  return (
    <View>
    <Text>Profile</Text>
 </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  marginStyle:{
    marginTop:responsiveHeight(2)
  }
});

export default Splash;
