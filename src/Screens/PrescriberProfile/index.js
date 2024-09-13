import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, FlatList, Text, Image, TouchableOpacity, Platform, Modal, ScrollView } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Colors from '../../Themes/Colors';
import CustomHeader from '../../Components/CustomHeader';
import LCSWImage from '../../Assets/Images/LCSW.png';
import { Chat } from '../../Assets/svg';
import CustomButton from '../../Components/CustomButton';
import AboutmeTab from '../../Container/AboutmeTab';
import LocationTab from '../../Container/LocationTab';
import ReviewTab from '../../Container/ReviewTab';


const PrescriberProfile = () => {
  const [activeTab, setActiveTab] = useState('About Me');
  const navigation = useNavigation();
  const tabs = ['About Me', 'Location', 'Review',];

  const renderContent = () => {
    switch (activeTab) {
      case 'About Me':
        return <AboutmeTab />;
      case 'Location':
        return <LocationTab />;
      case 'Review':
        return <ReviewTab />;
      default:
        return null;
    }
  };
  const profileCard = () => (
    <View style={styles.careTeamnCard}>
      <Image source={LCSWImage} style={styles.icon} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>Samuel Rush</Text>
        <Text style={styles.mdText}>MD</Text>
        <Text style={styles.description}>Treatment-resistant depression, Anxiety disorders, OCD, Chronic illness, and Cognitive disorders/TBI</Text>
      </View>
      <TouchableOpacity>
        <Chat />
      </TouchableOpacity>
    </View>
  );


  const renderTab = ({ item: tab }) => {
    return (
      <TouchableOpacity
        onPress={() => setActiveTab(tab)}
        style={[styles.tabButton, activeTab === tab && styles.activeTab]}
      >
        <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
      </TouchableOpacity>
    )
  }

  const renderFlatlist = () => {
    return (
      <FlatList
        data={tabs}
        renderItem={renderTab}
        keyExtractor={(item) => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabsContainer}
      />
    )
  }

  return (
    <View style={styles.container}>
      <CustomHeader title={'Prescriber Profile'} />
      <View style={styles.contentPadding}>
        {profileCard()}
        {renderFlatlist()}
        <ScrollView showsVerticalScrollIndicator={false} style={styles.flatListStyle}>
        {renderContent()}
        </ScrollView>
        <CustomButton
          buttonStyle={styles.Button}
          title={'Ask a Question'} />
      </View>
    </View>
  );
};

export default PrescriberProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: responsiveHeight(14),
    backgroundColor: Colors.white,
  },
  contentPadding: {
    marginHorizontal: responsiveWidth(5),
    flex: 1,

  },
  careTeamnCard: {
    paddingHorizontal: responsiveWidth(3),
    paddingVertical: responsiveHeight(1.5),
    backgroundColor: Colors.white,
    shadowColor: Platform.OS === 'ios' ? Colors.grey : Colors.black,
    shadowOffset: {
      width: 4,
      height: 5,
    },
    shadowOpacity: 5,
    shadowRadius: 10,
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
    borderRadius: 8
  },
  textContainer: {
    marginLeft: responsiveWidth(3),
    width: responsiveWidth(55),

  },
  name: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: '700',
    color: Colors.blue,
  },
  mdText: {
    fontSize: responsiveFontSize(1.3),
    color: Colors.darkgrey,
    marginTop: responsiveHeight(0.5),
    fontWeight: '700',
  },
  description: {
    fontSize: responsiveFontSize(1.1),
    color: Colors.darkgrey,
    marginTop: responsiveHeight(0.5),
    fontWeight: '500',
    width: responsiveWidth(60),
  },
  Button: {
    marginHorizontal: responsiveWidth(5),
    marginTop: responsiveHeight(3),
  },
  tabsContainer: {
    marginTop: responsiveHeight(3),
    height: responsiveHeight(10),
  },
  tabButton: {
    paddingHorizontal: responsiveWidth(8),
    height: responsiveHeight(3),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,

  },
  tabText: {
    fontSize: responsiveFontSize(1.3),
    color: Colors.darkgrey,
    fontWeight: '700',
  },
  activeTab: {
    backgroundColor: Colors.skyblue,
    paddingHorizontal: responsiveWidth(8),
    height: responsiveHeight(3),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6
  },
  activeTabText: {
    color: Colors.blue,
    fontSize: responsiveFontSize(1.5),
    fontWeight: '700',
  },
  flatListStyle: {
    height: '100%'

}


});
