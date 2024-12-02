
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Colors from '../../Themes/Colors';
import CustomButton from '../../Components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { ThankyouChecked } from '../../Assets/svg';
import LottieAutoplay from '../../Components/LottieViewComponent';
import { Fonts } from '../../Themes/fonts';

const ThankyouForFeedback = () => {
  const navigation = useNavigation();

  const handleHome = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <LottieAutoplay/>
      <View style={styles.imgStyle}>
      <ThankyouChecked />
      <Text style={styles.title}>Thank you for the feedback!</Text>
      <Text style={styles.description}>
      Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium.
      </Text>
      </View>
      <View style={styles.btnContainer}> 
      <CustomButton title="Go to Dashboard" onPress={handleHome} />

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: responsiveWidth(3),
    backgroundColor: Colors.white,
  },
  icon: {
    width: responsiveWidth(20),
    height: responsiveWidth(20),
    marginBottom: responsiveHeight(2),
  },
  title: {
    textAlign: 'center',
    fontSize: responsiveFontSize(2.5),
    fontWeight: 'bold',
    marginTop: responsiveHeight(2),
    color: Colors.black,
  },
  description: {
    textAlign: 'center',
    fontSize: responsiveFontSize(1.7),
    color: Colors.darkgrey,
 fontFamily: Fonts.Semibold700,
    marginTop: responsiveHeight(1),

  },
  btnContainer:{
    position:'absolute',
    bottom:responsiveHeight(13),
    width:'100%',
    alignSelf:'center'
  },
  imgStyle:{
    alignItems:'center',
    top:responsiveHeight(-28)

  }
});

export default ThankyouForFeedback;
