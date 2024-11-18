import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import { SplashIcon, Logo } from '../../Assets/svg';
import images from '../../Themes/Images';

const Splash = ({  }) => {


  return (
    <ImageBackground source={images.Splashbg} style={styles.container}>
      <SplashIcon />
      <View style={styles.marginStyle}>
        <Logo />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  marginStyle: {
    marginTop: responsiveHeight(2),
  },
});

export default Splash;
