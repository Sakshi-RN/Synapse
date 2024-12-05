import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { View, StyleSheet, Text, Image, TouchableOpacity, Platform, Modal } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Colors from '../../Themes/Colors';
import CustomHeader from '../../Components/CustomHeader';
import { ThreeDots } from '../../Assets/svg';
import CustomButton from '../../Components/CustomButton';
import { fetchProfile } from '../../redux/Reducers/profileReducer';
import Loader from '../../Components/Loader';
import images from '../../Themes/Images';
import { Fonts } from '../../Themes/fonts';

const CareTeam = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const dispatch = useDispatch();
  const { data, fetchLoading, fetchError } = useSelector(state => state.profile);


  const profile = data && data[0];
  const openModal = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedItem(null);
  };

  const handleAppointment = () => {
    setModalVisible(false);
    navigation.navigate('Appointment');
  }
  const handleReasonforChange = () => {
    setModalVisible(false);
    navigation.navigate('ReasonforChange');
  }
  const handleTherapistProfile = () => {
    setModalVisible(false);
    navigation.navigate('PrescriberProfile', { providerID: profile?.therapist?.providerID,facilityId:profile?.therapist?.facilityId });
  };
  
  const handlePrescriberProfile = () => {
    setModalVisible(false);
    navigation.navigate('PrescriberProfile', { providerID: profile?.prescriber?.providerID,facilityId :profile?.prescriber?.facilityId});
  };
  


  useFocusEffect(
    useCallback(() => {
      dispatch(fetchProfile());
    }, [dispatch])
  );

  if (fetchLoading) {
    return (
      <View style={styles.centeredContainer}>
        <Loader />
      </View>
    );
  }

  const renderItem = () => (
    <>
      <View style={styles.careTeamnCard}>
        {/* {profile?.therapist?.profilePicture ? (
          <Image source={{ uri: profile?.therapist?.profilePicture }} style={styles.icon} />
        ) : (
             <Image source={images.user} style={styles.icon} />
        )} */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>{profile?.therapist?.providerName||'Therapist'}</Text>
          <Text style={styles.description}>{profile?.therapist?.designation?.join(', ')}</Text>
          <View style={styles.cancelbtnRow}>
            <CustomButton
              onPress={handleTherapistProfile}
              buttonStyle={styles.Button}
              textStyle={styles.ButtonText}
              title={'View Profile'}
            />
            <CustomButton
              buttonStyle={styles.Button}
              textStyle={styles.ButtonText}
              title={'Appt'}
            />
          </View>
        </View>
        {/* <TouchableOpacity onPress={() => openModal()}>
            <ThreeDots height={15} width={10} />
          </TouchableOpacity> */}
      </View>
      <View style={styles.careTeamnCard}>
         {/* {profile?.prescriber?.profilePicture ?
        (
          <Image source={{ uri: profile?.prescriber?.profilePicture }} style={styles.icon} />
        ) : (
             <Image source={images.user} style={styles.icon} />
        )} */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>{profile?.prescriber?.providerName||'Prescriber'}</Text>
          <Text style={styles.description}>{profile?.prescriber?.designation?.join(', ')}</Text>
          <View style={styles.cancelbtnRow}>
            <CustomButton
              onPress={handlePrescriberProfile}
              buttonStyle={styles.Button}
              textStyle={styles.ButtonText}
              title={'View Profile'}
            />

          </View>
        </View>
        {/* <TouchableOpacity onPress={() => openModal()}>
            <ThreeDots height={15} width={10} />
          </TouchableOpacity> */}
      </View>

    </>
  );

  const renderModal = () => {
    return (
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <TouchableOpacity style={styles.modalOverlay} onPress={closeModal}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={handleAppointment}>
              <Text style={styles.modalOption}>Appointment</Text>
            </TouchableOpacity>
            <View style={styles.bordrline} />
            <TouchableOpacity >
              <Text style={styles.modalOption}>Rate</Text>
            </TouchableOpacity>
            {/* <View style={styles.bordrline} />
            <TouchableOpacity onPress={handleReasonforChange} >
              <Text style={styles.modalOption}>Request to change</Text>
            </TouchableOpacity> */}
          </View>
        </TouchableOpacity>
      </Modal>
    )
  }

  return (
    <View style={styles.container}>
      <CustomHeader title={'Care Team'} />
      {renderModal()}
      {renderItem()}
      <View style={styles.bottomView}>
        <View style={styles.lineStyle} />
        <Text style={styles.questionText}>Do you have any questions?</Text>
        <CustomButton
          buttonStyle={styles.connectButton}
          textStyle={styles.connectButtonText}
          title={'Connect with concierge'} />
      </View>
    </View>
  );
};

export default CareTeam;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: responsiveHeight(14),
    backgroundColor: Colors.white
  },

  careTeamnCard: {
    marginHorizontal: responsiveWidth(5),
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(2),
    backgroundColor: Colors.white,
    shadowColor: Platform.OS === 'ios' ? Colors.grey : Colors.black,
    shadowOffset: {
      width: 4,
      height: 5,
    },
    shadowOpacity: 5,
    shadowRadius: 4,
    elevation: 5,
    marginTop: responsiveHeight(2.5),
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.skyblue,
    flexDirection: 'row'

  },
  icon: {
    width: responsiveWidth(18),
    height: responsiveWidth(18),
    borderRadius: 5
  },
  textContainer: {
    marginLeft: responsiveWidth(3),
    width: responsiveWidth(58),

  },
  title: {
    fontSize: responsiveFontSize(1.8),
  fontFamily: Fonts.Semibold700,
    color: Colors.DARKBLUE,
  },
  description: {
    fontSize: responsiveFontSize(1.3),
    color: Colors.darkgrey,
    marginTop: responsiveHeight(0.5),
  fontFamily: Fonts.Semibold700,
    width: responsiveWidth(75)
  },
  lineStyle: {
    width: "90%",
    marginHorizontal: responsiveWidth(5),
    // alignSelf: 'center',
    backgroundColor: Colors.black,
    height: 1.5,
  },
  questionText: {
    color: Colors.DARKBLUE,
    fontSize: responsiveFontSize(1.8),
    fontFamily: Fonts.Bold800, 
    alignSelf: 'center',
    marginTop: responsiveHeight(2),
  },

  Button: {
    backgroundColor: Colors.skyblue,
    height: responsiveHeight(3.5),
    borderRadius: 7,
    alignItems: 'center',
    width: responsiveWidth(25),
    justifyContent: 'center',
    paddingVertical: 0,
    paddingHorizontal: 0
  },
  ButtonText: {
    color: Colors.blue,
    fontSize: responsiveFontSize(1.4),
    fontFamily: Fonts.Bold800, 
  },

  cancelbtnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: responsiveHeight(2),
    alignItems: 'center',
    width: '90%'
  },
  connectButton: {
    backgroundColor: Colors.light_skyblue,
    height: responsiveHeight(5),
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: responsiveWidth(4),
    alignSelf: 'center',
    marginTop: responsiveHeight(2),
    paddingVertical: 0
  },
  connectButtonText: {
    color: Colors.black,
    fontSize: responsiveFontSize(1.5),
    fontFamily: Fonts.Bold800, 
  },
  flatlistContent: {
    marginBottom: responsiveHeight(5),
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingTop: responsiveHeight(20),
    alignItems: "flex-end",
  },
  modalContent: {
    backgroundColor: 'white',
    width: '60%',
    borderRadius: 8,
    marginRight: responsiveWidth(8)
  },
  modalOption: {
    fontSize: responsiveFontSize(2),
    marginVertical: responsiveHeight(1.5),
    color: Colors.DARKBLUE,
    fontFamily: Fonts.Semibold700,
    marginLeft: responsiveWidth(5)
  },
  bordrline: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.skyblue,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomView: {
    position: 'absolute',
    bottom: responsiveHeight(14),
    alignSelf: 'center',
    width: "95%",
  }
});
