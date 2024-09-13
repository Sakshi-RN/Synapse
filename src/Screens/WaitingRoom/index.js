import React from 'react';
import { View, StyleSheet, Platform, Text } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import Colors from '../../Themes/Colors';
import CustomHeader from '../../Components/CustomHeader';
import CustomButton from '../../Components/CustomButton';
import { Time } from '../../Assets/svg';


const WaitingRoom = () => {

  return (
    <View style={styles.container}>
      <CustomHeader title={'Session Details'} />
      <View style={styles.contentPadding}>
        <View style={styles.careTeamnCard}>
          <Text style={styles.name}>Get Ready</Text>
          <Text style={styles.name}>Your session is about to begin</Text>
          <View style={styles.blueRow}>
            <Text style={styles.providerText}>The provider will start the meeting shortly</Text>
            <View style={styles.timeRow}>
              <Time height={30} width={30} />
              <Text style={styles.timeText}>08:00 - 08:30 am</Text>
            </View>
          </View>
          <Text style={styles.pleaseText}>Please be ready and in the waiting room at least 5 minutes before your visit.</Text>
          <Text style={styles.description}><Text>You can learn some facts about</Text> <Text style={styles.lineText}>mental health well being</Text> <Text>while you wait.</Text></Text>
        </View>
        <CustomButton
          title={'Go to Waiting Room'}
          buttonStyle={styles.btn} />
      </View>
    </View>

  );
};

export default WaitingRoom;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  contentPadding: {
    marginHorizontal: responsiveWidth(5),
    marginTop: responsiveHeight(4),
  },
  careTeamnCard: {
    paddingHorizontal: responsiveWidth(3),
    paddingVertical: responsiveHeight(2),
    backgroundColor: Colors.white,
    shadowColor: Platform.OS === 'ios' ? Colors.OFFWHITE : Colors.grey,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 3,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 8,
    borderWidth: 0.2,
    borderColor: Colors.OFFWHITE,
  },
  name: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: '700',
    color: Colors.blue,
    marginBottom: responsiveHeight(1)
  },

  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: responsiveHeight(2),
    alignSelf: 'center'


  },
  blueRow: {
    backgroundColor: Colors.skyblue,
    paddingVertical: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(5),
    borderRadius: 6,
  },
  timeText: {
    fontSize: responsiveFontSize(2.5),
    color: Colors.black,
    fontWeight: '600',
    marginLeft: responsiveWidth(2)
  },
  description: {
    fontSize: responsiveFontSize(1.5),
    color: Colors.darkgrey,
    fontWeight: '600',
    width: responsiveWidth(90),
    lineHeight: 15,
    marginTop: responsiveHeight(2)
  },
  pleaseText: {
    fontSize: responsiveFontSize(1.5),
    color: Colors.darkgrey,
    fontWeight: '600',
    width: responsiveWidth(90),
    lineHeight: 15,
    marginTop: responsiveHeight(1)
  },
  lineText: {
    textDecorationLine: 'underline'
  },
  btn: {
    marginTop: responsiveHeight(4),
    marginHorizontal: responsiveWidth(5)
  },
  providerText: {
    fontSize: responsiveFontSize(1.6),
    fontWeight: '700',
    color: Colors.black,
    alignSelf: 'center',
    textAlign: 'center'
  },


});
