import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Platform, Text, TouchableOpacity } from 'react-native';
import Colors from '../../Themes/Colors';
import CustomHeader from '../../Components/CustomHeader';
import { Calendar, Time } from '../../Assets/svg';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { useRoute } from '@react-navigation/native';
import moment from 'moment';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const ViewDetails = () => {
  const route = useRoute();
  const { appointment } = route.params; 
  const [currentLocation, setCurrentLocation] = useState(null);
  const formattedStartTime = moment(appointment.appointmentStartTime, 'HH:mm:ss').format('h:mm A');
  const formattedEndTime = moment(appointment.appointmentEndTime, 'HH:mm:ss').format('h:mm A');
  const formattedTime = `${formattedStartTime} - ${formattedEndTime}`;
  const formattedDate = moment(appointment.appointmentDate, 'MM/DD/YYYY', true).format('dddd, MMMM DD');

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

const coordinates = parseGeoPoint(appointment?.facility?.facilityGeoPoint);


  return (
    <View style={styles.container}>
      <CustomHeader title={'View Details'} />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.contentPadding}>
        <View style={styles.careTeamnCard}>
          <View style={styles.row}>
            <View style={styles.textContainer}>
              <Text style={styles.name}>Dr. {appointment?.facility?.facilityName}</Text>
              <Text style={styles.mdText}>{appointment?.appointmentType}</Text>
            </View>
            <TouchableOpacity style={styles.btn}>
              <Text style={styles.btnText}>{appointment?.appointmentStatus
                    ? appointment.appointmentStatus.charAt(0).toUpperCase() + appointment.appointmentStatus.slice(1)
                    : ''}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.blueRow}>
            <Calendar />
            <Text style={styles.timeText}>{formattedDate}</Text>
            <Time />
            <Text style={styles.timeText}>{formattedTime}</Text>
          </View>
          <Text style={[styles.details]}>Address</Text>
          <Text style={styles.description}>{appointment?.facility?.facilityAddress1} {appointment?.facility?.facilityCity} {appointment?.facility?.facilityState} {appointment?.facility?.facilityZip}</Text>
        </View>

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
                            title={appointment?.facility?.facilityName || "Facility Location"}
                            description={appointment?.facility?.facilityCity || "City"}
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
        {/* <CustomButton
        buttonStyle={styles.Button}
        title={'Do you need a ride?'} /> */}
      </ScrollView>
    </View>
  );
};

export default ViewDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: responsiveHeight(14),
    backgroundColor: Colors.backgroundColor,
  },

  Button: {
    alignSelf: 'center',
    marginTop: responsiveHeight(3),
    paddingHorizontal: responsiveWidth(8)
  },



  contentPadding: {
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(2),
    backgroundColor: Colors.white,
    shadowColor: Platform.OS === 'ios' ? Colors.grey : Colors.black,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 4,
    shadowRadius: 5,
    elevation: 5,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: Colors.OFFWHITE,
    marginHorizontal: responsiveWidth(3),
    marginTop: responsiveHeight(3)
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  textContainer: {
    width: responsiveWidth(65)
  },
  name: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: '700',
    color: Colors.black,
  },
  details: {
    fontSize: responsiveFontSize(1.6),
    fontWeight: '700',
    color: Colors.black,
    marginTop: responsiveHeight(1.5)
  },

  mdText: {
    fontSize: responsiveFontSize(1.2),
    color: Colors.darkgrey,
    fontWeight: '600',
    width: responsiveWidth(47),
    marginTop: responsiveHeight(0.5)

  },
  description: {
    fontSize: responsiveFontSize(1.3),
    color: Colors.darkgrey,
    fontWeight: '500',
    width: responsiveWidth(80),
    marginTop:responsiveHeight(0.5)

  },
  btn: {
    backgroundColor: Colors.GREEN,
    width: responsiveWidth(20),
    height: responsiveHeight(3),
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnText: {
    color: Colors.Dark_Green,
    fontSize: responsiveFontSize(1.2),
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row'
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: responsiveHeight(1),
    justifyContent: 'space-between',

  },
  blueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E4EEF1',
    paddingVertical: responsiveHeight(1),
    paddingHorizontal: responsiveWidth(3),
    marginTop: responsiveHeight(1.5),
    borderRadius: 6
  },
  timeText: {
    fontSize: responsiveFontSize(1.2),
    color: Colors.black,
    fontWeight: '700',
    width: responsiveWidth(38),
    marginLeft: responsiveWidth(2),

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
