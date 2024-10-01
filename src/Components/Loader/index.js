import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import Colors from '../../Themes/Colors';

const Loader = () => {
  return (
    <View style={styles.loaderContainer}>
      <ActivityIndicator size="large" color={Colors.blue} />
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    loaderContainer: {
      width: 20,
      height: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
});

export default Loader;
