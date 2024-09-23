import React from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Platform, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, ScrollView } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Colors from '../../Themes/Colors';
import LCSWImage from '../../Assets/Images/LCSW.png';
import CustomButton from '../../Components/CustomButton';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import InputContainer from '../../Components/InputContainer';

const FeedbackAfterSession = () => {
  const navigation = useNavigation()

  const handleHome = () => {
    navigation.navigate('Home');
  }

  const handleViewDetails = () => {
    navigation.navigate('ViewDetails');
  }
  const renderAvatar = () => {
    return (
      <>
        <View style={styles.avatarSection}>
          <Image source={LCSWImage} />
          <View style={styles.avatarInitials}>
            <Text style={styles.avatarText}>NK</Text>
          </View>
        </View>
        <Text style={styles.sessionText}>Your session with Leena Joseph is complete! 🎉</Text>
      </>
    );
  };

  const renderSessionInfo = () => {
    return (
      <View style={styles.sessionInfoCard}>
        <View style={styles.sessionDetails}>
          <Text style={styles.sessionName}>Leena Joseph</Text>
          <Text style={styles.sessionType}>Integration Appointment ・ Virtual</Text>
          <Text style={styles.sessionTime}>08:00 am - 08:30 am</Text>
          <TouchableOpacity style={styles.completedButton}>
            <Text style={styles.completedButtonText}>Completed</Text>
          </TouchableOpacity>
        </View>
        <CustomButton
          title={'View Details'}
          onPress={handleViewDetails}
          buttonStyle={styles.viewDetailsButton}
          textStyle={styles.viewDetailsButtonText}
        />
        {/* <TouchableOpacity style={styles.viewDetailsButton}>
          <Text style={styles.viewDetailsButtonText}>View Details</Text>
        </TouchableOpacity> */}
      </View>
    );
  };

  const renderFeedbackSection = () => {
    return (
      <View style={styles.sessionInfoCard}>
        <Text style={styles.feedbackTitle}>We would love to hear from you</Text>
        <View style={styles.heartRatingContainer}>
          {[...Array(5)].map((_, i) => (
            <Icon key={i} name="heart" size={30} color={Colors.RED} style={styles.heartIcon} />
          ))}
        </View>
        <InputContainer
          placeholderTextColor={Colors.grey}
          titleColor={styles.inputTitle}
          showAsterisk={false}
          title={'Feedback'}
          placeholder={'Write your feedback here'}
          inputStyle={styles.input}
          dynamicStyle={styles.inputView} />
        <CustomButton title="Submit" onPress={handleHome} />
        <TouchableOpacity onPress={handleHome}>
          <Text style={styles.skipText}>Skip & Go to Dashboard</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.content}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
          {renderAvatar()}
          {renderSessionInfo()}
          {renderFeedbackSection()}
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: responsiveWidth(5),
    paddingTop: Platform.OS === "ios" ? responsiveHeight(8) : responsiveHeight(5),
    backgroundColor: Colors.white
  },
  content: {
    flex: 1,
  },
  avatarSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: responsiveHeight(2),
  },
  avatarImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  avatarInitials: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#E3E1E6',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -20,
  },
  avatarText: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: '700',
    color: '#18273B',
  },
  sessionInfoCard: {
    backgroundColor: Colors.white,
    padding: responsiveWidth(4),
    borderRadius: 10,
    elevation: 4,
    shadowColor: Platform.OS === "ios" ? Colors.OFFWHITE : Colors.grey,
    shadowOpacity: 2,
    shadowOffset: { width: 1, height: 1 },
    marginBottom: responsiveHeight(2),
    shadowRadius: 2

  },
  sessionText: {
    textAlign: 'center',
    fontSize: responsiveFontSize(2.5),
    fontWeight: 'bold',
    marginBottom: responsiveHeight(2),
  },
  sessionDetails: {
    marginBottom: responsiveHeight(1),
  },
  sessionName: {
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
  },
  sessionType: {
    fontSize: responsiveFontSize(1.6),
    color: Colors.darkgrey,
    marginVertical: responsiveHeight(0.5),
  },
  sessionTime: {
    fontSize: responsiveFontSize(1.6),
    color: Colors.darkgrey,
  },
  completedButton: {
    backgroundColor: Colors.GREEN,
    height: responsiveHeight(3),
    width: responsiveWidth(22),
    borderRadius: 5,
    marginTop: responsiveHeight(1),
    justifyContent: 'center',
    alignItems: 'center'
  },
  completedButtonText: {
    color: Colors.Dark_Green,
    fontSize: responsiveFontSize(1.3),
    fontWeight: '600',
  },
  viewDetailsButton: {
    borderColor: Colors.blue, backgroundColor: Colors.white, borderWidth: 1.5,
    marginTop: responsiveHeight(1),
  },
  viewDetailsButtonText: {
    color: Colors.blue,
    fontWeight: '600'
  },
  feedbackContainer: {
    paddingVertical: responsiveHeight(2),
    backgroundColor: 'pink'
  },
  feedbackTitle: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: 'bold',
    marginBottom: responsiveHeight(1),
    color: Colors.black
  },
  heartRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',

  },
  heartIcon: {
    marginHorizontal: responsiveWidth(0.3),
  },
  feedbackInput: {
    borderColor: Colors.grey,
    borderWidth: 1,
    borderRadius: 5,
    padding: responsiveHeight(1),
    textAlignVertical: 'top',
    minHeight: responsiveHeight(10),
  },
  skipText: {
    color: Colors.blue,
    fontSize: responsiveFontSize(1.7),
    fontWeight: '600',
    marginTop: responsiveHeight(2),
    alignSelf: 'center'
  },
  inputTitle: { color: Colors.black, top: responsiveHeight(1.5), width: responsiveWidth(16), },
  input: {
    height: responsiveHeight(15),
    marginBottom: responsiveHeight(2),
  },
  inputView: {
    paddingBottom: responsiveHeight(8),
    fontWeight: '500'

  }
});

export default FeedbackAfterSession;
