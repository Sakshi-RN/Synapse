import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';


const LottieAutoplay = () => {
  return (
   
      <LottieView
        source={require('../../Themes/Animation/Animation - 1727352907972.json')} 
        autoPlay
        loop={false}
        style={styles.container}
      />

  );
};

const styles = StyleSheet.create({
  container: {
height:responsiveHeight(60),width:responsiveWidth(250),alignSelf:'center'
  },
});

export default LottieAutoplay;
