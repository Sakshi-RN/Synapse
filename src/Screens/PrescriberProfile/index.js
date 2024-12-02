
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Text, Image, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Colors from '../../Themes/Colors';
import CustomHeader from '../../Components/CustomHeader';
import { Chat, MeetIcon, MapView } from '../../Assets/svg';
import Loader from '../../Components/Loader';
import images from '../../Themes/Images';



const PrescriberProfile = () => {
  const [activeTab, setActiveTab] = useState('About Me');
  const [providerData, setProviderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const tabs = ['About Me', 'Location'];
  const route = useRoute();
  const { providerID,facilityId } = route.params;

  useEffect(() => {
    const fetchProviderData = async () => {
      try {
        const response = await fetch(
          // `https://eb1.taramind.com/provider/details?providerId=${providerID}&facilityId=${facilityId}`,
         'https://eb1.taramind.com/provider/publicProfile?providerId=cd71e5f2-c73d-4e30-9fbf-f20adf54de0e&facilityId=64149d0a-c9e6-4761-b31a-d553d76ef6eb',
          {
            method: 'GET',
            headers: {
              'X-Api-Key': 'e1693d9245c57be86afc22ad06eda84c9cdb74dae6d56a8a7f71a93facb1f42b',
            },
          }
        );
        const data = await response.json();
        setProviderData(data[0]);
      } catch (error) {
        console.error('Error fetching provider data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProviderData();
  }, []);

  const renderContent = () => {
    if (activeTab === 'About Me') {
      return <AboutmeTab providerData={providerData} />;
    } else if (activeTab === 'Location') {
      return <LocationTab providerData={providerData} />;
    }
    return null;
  };

  const renderProfileCard = () => (
    <View style={styles.careTeamnCard}>
      {providerData?.profilePicture ? (
        <Image source={{ uri: providerData.profilePicture }} style={styles.icon} />
      ) : (
        <Image source={images.user} style={styles.icon} />
      )}
      <View style={styles.textContainer}>
        <Text style={styles.name}>{providerData?.firstName} {providerData?.lastName}</Text>
        <Text style={styles.mdText}>{providerData?.designation?.join(', ')}</Text>
        <Text style={styles.newdescription}>{providerData?.speciality?.join(' ')}</Text>
      </View>
      <TouchableOpacity>
        <Chat />
      </TouchableOpacity>
    </View>
  );

  const renderTab = ({ item: tab }) => (
    <TouchableOpacity
      onPress={() => setActiveTab(tab)}
      style={[styles.tabButton, activeTab === tab && styles.activeTab]}
    >
      <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.centeredContainer}>
        <Loader />
      </View>
    );
  }

  if (!providerData) {
    return <Text style={styles.errorText}>No provider data available.</Text>;
  }

  return (
    <View style={styles.container}>
      <CustomHeader title="Prescriber Profile" />
      <View style={styles.contentPadding}>
        {renderProfileCard()}
        <FlatList
          data={tabs}
          renderItem={renderTab}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.tabsContainer}
        />
        <ScrollView showsVerticalScrollIndicator={false} style={styles.flatListStyle}>
          {renderContent()}
        </ScrollView>
      </View>
    </View>
  );
};

const AboutmeTab = ({ providerData }) => (
  <>
    <View style={styles.careTeamnCardNew}>
      <Text style={styles.abTname}>
        {providerData?.firstName} {providerData?.lastName}
      </Text>
      <MeetIcon />
      <Text style={styles.virtualTYext}>Virtual</Text>
    </View>
    <Text style={styles.mdText}>{providerData?.designation?.join(', ')}</Text>
    <Text style={styles.specialitiesText}>Specialties</Text>
    <Text style={styles.description}>{providerData?.speciality?.join(' ')}</Text>
    <Text style={styles.specialitiesText}>Background</Text>
    <Text style={styles.description}>{providerData?.background}</Text>
  </>
);

const LocationTab = ({ providerData }) => (
  <>
    <Text style={[styles.specialitiesText, { marginTop: 0 }]}>Practice Place</Text>
    <Text style={styles.description}>{providerData?.address1}</Text>
    <Text style={styles.description}>{providerData?.address2}</Text>
    <MapView style={styles.map} />
  </>
);

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
    shadowOffset: { width: 4, height: 5 },
    shadowOpacity: 5,
    shadowRadius: 10,
    elevation: 5,
    marginTop: responsiveHeight(2.5),
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.skyblue,
    flexDirection: 'row',
  },
  icon: {
    width: responsiveWidth(18),
    height: responsiveWidth(18),
    borderRadius: 8,

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
  newdescription: {
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
    alignSelf: 'center',
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
    borderRadius: 6,
  },
  activeTabText: {
    color: Colors.blue,
    fontSize: responsiveFontSize(1.5),
    fontWeight: '700',
  },
  flatListStyle: {
    height: '100%',
  },
  errorText: {
    fontSize: responsiveFontSize(2),
    color: Colors.blue,
    textAlign: 'center',
    marginTop: responsiveHeight(40),
    fontWeight:'bold'
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  careTeamnCardNew: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  abTname: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: '700',
    color: Colors.blue,
    width: responsiveWidth(70),
  },
  specialitiesText: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: '700',
    color: Colors.blue,
    marginTop: responsiveHeight(1.5),
  },
  mdText: {
    fontSize: responsiveFontSize(1.3),
    color: Colors.darkgrey,
    marginTop: responsiveHeight(0.5),
    fontWeight: '500',
  },
  description: {
    fontSize: responsiveFontSize(1.4),
    color: Colors.darkgrey,
    marginTop: responsiveHeight(0.5),
    fontWeight: '500',
  },
  virtualTYext: {
    fontSize: responsiveFontSize(1.4),
    color: Colors.black,
    fontWeight: '800',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    marginTop: responsiveHeight(2),
  },
  specialitiesText: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: '700',
    color: Colors.blue,
    marginTop: responsiveHeight(1.5),
  },


});
