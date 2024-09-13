import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';
import Colors from '../../Themes/Colors';
import { MapView } from '../../Assets/svg';

const Location = () => {

  return (
    <>
      <Text style={[styles.specialitiesText,{marginTop:0}]}>Practice Place</Text>
      <Text style={styles.description}>New York, USA</Text>
      <Text style={styles.specialitiesText}>Location</Text>
      <MapView style={styles.map} />
    </>
  );
};

export default Location;

const styles = StyleSheet.create({
  map: {
    marginTop: responsiveHeight(2),
  },
  specialitiesText: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: '700',
    color: Colors.blue,
    marginTop: responsiveHeight(1.5),
  },
  description: {
    fontSize: responsiveFontSize(1.4),
    color: Colors.darkgrey,
    marginTop: responsiveHeight(0.5),
    fontWeight: '500',
  }
});
