import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Colors from '../../Themes/Colors';
import CustomHeader from '../../Components/CustomHeader';
import CustomButton from '../../Components/CustomButton';
import { MapView } from '../../Assets/svg';
import ProfileDetailCard from '../../Components/ProfileDetailCard'
import LCSWImage from '../../Assets/Images/LCSW.png';

const ViewDetails = () => {

  return (
    <View style={styles.container}>
      <CustomHeader title={'View Details'} />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.contentPadding}>
        <ProfileDetailCard
          name={"Samuel Rush"}
          sessionInfo={"KAT Session . In Person"}
          status={"Completed"}
          date={"Sunday June 09"}
          time={"08:00 am - 08:30 am"}
          details={"Details"}
          description={"Detailed para about the patient conditions..."}
          addressTitle={"Address"}
          address={"67763 New delhi"}
          image={LCSWImage}
        />
        <MapView style={styles.map} />
      </ScrollView>
      <CustomButton
        buttonStyle={styles.Button}
        title={'Do you need a ride?'} />
    </View>

  );
};

export default ViewDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: responsiveHeight(14),
    backgroundColor: Colors.white,
  },

  Button: {
    alignSelf: 'center',
    marginTop: responsiveHeight(3),
    paddingHorizontal:responsiveWidth(8)
  },

  map: {
    marginTop: responsiveHeight(2),
  },

  contentPadding: {
    marginHorizontal: responsiveWidth(5),
    marginTop: responsiveHeight(4),

  },
});
