import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../Themes/Colors';
import CustomHeader from '../../Components/CustomHeader';

const MyProfile = () => {
  const navigation = useNavigation();


  return (
    <View style={styles.container}>
      <CustomHeader title={'Profile & Settings'} />
    </View>

  );
};

export default MyProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },

 

});
