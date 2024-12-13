
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Text, Image, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Colors from '../../Themes/Colors';
import CustomHeader from '../../Components/CustomHeader';
import { Chat, MeetIcon } from '../../Assets/svg';
import Loader from '../../Components/Loader';
import images from '../../Themes/Images';
import { Fonts } from '../../Themes/fonts';
import commonStyles from '../../Components/CommonStyle';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const PrescriberProfile = () => {
  const [activeTab, setActiveTab] = useState('About Me');
  const [providerData, setProviderData] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const tabs = ['About Me', 'Location'];
  const route = useRoute();
  const { providerID, facilityID } = route.params;

  useEffect(() => {
    const fetchProviderData = async () => {
      try {
        const response = await fetch(
          `https://eb1.taramind.com/provider/publicProfile?providerId=${providerID}&facilityId=${facilityID}`,
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


  useEffect(() => {
    const requestLocationPermission = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    };

    requestLocationPermission();
  }, []);
  const renderContent = () => {
    if (activeTab === 'About Me') {
      return <AboutmeTab providerData={providerData} />;
    } else if (activeTab === 'Location') {
      return <LocationTab providerData={providerData} />;
    }
    return null;
  };


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
      <ScrollView showsVerticalScrollIndicator={false} style={[commonStyles.newConatiner, {
        paddingHorizontal: responsiveWidth(4),
      }]}>
        <View style={styles.newRow}>
          <Text style={styles.name}>{providerData?.firstName} {providerData?.lastName}</Text>
          <Chat />
        </View>
        <Text style={styles.mdText}>{providerData?.designation?.join(', ')}</Text>
        <Text style={styles.newdescription}>{providerData?.speciality?.join(' ')}</Text>
        <View style={styles.lineStyle} />
        <FlatList
          data={tabs}
          renderItem={renderTab}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.tabsContainer}
        />
        {renderContent()}
      </ScrollView>
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

const LocationTab = ({ providerData, currentLocation }) => {
  const parseGeoPoint = (geoPoint) => {
    if (!geoPoint) return null;
    const match = geoPoint.match(/POINT\s*\(([-\d.]+)\s+([-\d.]+)\)/);
    if (match) {
        return {
            longitude: parseFloat(match[1]),
            latitude: parseFloat(match[2]),
        };
    }
    return null;
};

const coordinates = parseGeoPoint(providerData?.geo_point);

  return (
    <View style={{ bottom: responsiveHeight(2) }}>
      <Text style={[styles.specialitiesText, { marginTop: 0 }]}>Practice Place</Text>
      <Text style={styles.description}>
        {providerData?.address1}{' '}
        {providerData?.address2}{' '}
        {providerData?.facilityCity}{' '}
        {providerData?.facilityState}{' '}
        {providerData?.facilityZip}{' '}
        {providerData?.facilityCountry}
      </Text>
      {coordinates || currentLocation ? (
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: coordinates?.latitude || currentLocation?.latitude || 0,
                        longitude: coordinates?.longitude || currentLocation?.longitude || 0,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}
                >
                    {coordinates && (
                        <Marker
                            coordinate={coordinates}
                            title={providerData?.facilityName || "Facility Location"}
                            description={providerData?.facilityCity || "City"}
                            pinColor="red"
                        />
                    )}
                    {currentLocation && (
                        <Marker
                            coordinate={currentLocation}
                            title="Your Location"
                            description="This is where you are"
                            pinColor="blue"
                        />
                    )}
                </MapView>
            ) : (
                <Text style={styles.errorText}>Location data not available</Text>
            )}
        </View>
  );
};

export default PrescriberProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: responsiveHeight(14),
    backgroundColor: Colors.bg_Color
  },

  lineStyle: {
    marginTop: responsiveHeight(1),
    height: 1,
    backgroundColor: Colors.lightgrey,
  },

  name: {
    fontSize: responsiveFontSize(1.8),
    fontFamily: Fonts.Semibold700,
    color: Colors.blue,
  },
  mdText: {
    fontSize: responsiveFontSize(1.3),
    color: Colors.newgrey,
    marginTop: responsiveHeight(0.5),
    fontFamily: Fonts.Semibold700,
  },
  newdescription: {
    fontSize: responsiveFontSize(1.2),
    color: Colors.newgrey,
    marginTop: responsiveHeight(0.8),
    fontFamily: Fonts.Medium600,
    width: responsiveWidth(72),

  },
  Button: {
    marginHorizontal: responsiveWidth(5),
    marginTop: responsiveHeight(3),
  },
  tabsContainer: {
    marginTop: responsiveHeight(3),
    height: responsiveHeight(7),
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
    color: Colors.newgrey,
    fontFamily: Fonts.Semibold700,
  },
  activeTab: {
    backgroundColor: Colors.blue,
    paddingHorizontal: responsiveWidth(8),
    height: responsiveHeight(3),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  activeTabText: {
    color: Colors.white,
    fontSize: responsiveFontSize(1.5),
    fontFamily: Fonts.Semibold700,
  },
  errorText: {
    fontSize: responsiveFontSize(2),
    color: Colors.blue,
    textAlign: 'center',
    marginTop: responsiveHeight(40),
    fontFamily: Fonts.Bold800
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
    fontFamily: Fonts.Semibold700,
    color: Colors.blue,
    width: responsiveWidth(65),
  },
  specialitiesText: {
    fontSize: responsiveFontSize(1.8),
    fontFamily: Fonts.Semibold700,
    color: Colors.blue,
    marginTop: responsiveHeight(1.5),
  },
  mdText: {
    fontSize: responsiveFontSize(1.3),
    color: Colors.newgrey,
    marginTop: responsiveHeight(0.5),
    fontFamily: Fonts.Medium600,
  },
  description: {
    fontSize: responsiveFontSize(1.4),
    color: Colors.newgrey,
    marginTop: responsiveHeight(0.5),
    fontFamily: Fonts.Medium600,
    width: responsiveWidth(87),

  },
  virtualTYext: {
    fontSize: responsiveFontSize(1.5),
    color: Colors.black,
    fontFamily: Fonts.Bold800,
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
    fontFamily: Fonts.Semibold700,
    color: Colors.blue,
    marginTop: responsiveHeight(1.5),
  },
  newRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: responsiveHeight(2)
  },
  map: {
    width: '100%',
    height: responsiveWidth(90),
    marginTop: responsiveHeight(2),
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

});
