import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Colors from '../../Themes/Colors';
import CustomHeader from '../../Components/CustomHeader';
import CustomButton from '../../Components/CustomButton';
import ProfileDetailCard from '../../Components/ProfileDetailCard'
import LCSWImage from '../../Assets/Images/LCSW.png';

const JoinSession = () => {
  const navigation = useNavigation();

  const handleWaitingRoom = () => {
    navigation.navigate('WaitingRoom');
}
const handleResheduleRequest = () => {
  navigation.navigate('ResheduleRequest');
}


  return (
    <View style={styles.container}>
      <CustomHeader title={'Session Details'} />
      <View style={styles.contentPadding}>
        <ProfileDetailCard
          name={"Leena Joseph"}
          sessionInfo={"Integration Appointment . Virtual"}
          status={"Upcoming"}
          date={"Sunday June 09"}
          time={"08:00 am - 08:30 am"}
          details={"Details"}
          description={"Detailed para about the patient conditions..."}
          image={LCSWImage}
          btnStyle={styles.upcomingBtn}
          btnTextColor={styles.upcomingText}
        />
      </View>
      <View style={styles.row}>
        <CustomButton
          buttonStyle={styles.Button}
          textStyle={styles.btnText}
          title={'Reschedule Request'}
          onPress={handleResheduleRequest}/>
        <CustomButton
          buttonStyle={styles.joinButton}
          textStyle={styles.joinText}
          title={'Join Session'} 
          onPress={handleWaitingRoom}/>
      </View>
    </View>

  );
};

export default JoinSession;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  Button: {
    backgroundColor: Colors.white,
    borderColor: Colors.blue,
    borderWidth: 1.5,
    paddingHorizontal: responsiveWidth(3),
  },
  joinButton: {
    paddingHorizontal: responsiveWidth(8.5),
  },

  row: {
    marginTop: responsiveHeight(2),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(4),
    position: 'absolute',
    bottom: responsiveHeight(13),
    justifyContent: 'space-between',
    width: '100%'

  },

  contentPadding: {
    marginHorizontal: responsiveWidth(5),
    marginTop: responsiveHeight(4),
  },
  btnText: {
    color: Colors.black,
    fontWeight: '500'
  },
  joinText: {
    fontWeight: '500'
  },
  upcomingBtn: {
    backgroundColor: Colors.ORANGE
  },
  upcomingText: {
    color: Colors.Dark_Orange
  }

});
