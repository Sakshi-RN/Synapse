import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Loader from '../Loader';


export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    const requestLocationPermission = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      setMapReady(true);
    };

    requestLocationPermission();
  }, []);

  if (!mapReady) {
    return (
  <Loader/>
    );
  }

  return (
<View style={styles.container}>
      <MapView 
        style={styles.map}
        region={location}
      >
        {location && (
          <Marker
            coordinate={{ latitude: location.latitude, longitude: location.longitude }}
            title={"Your Location"}
            description={"This is where you are"}
          />
        )}
      </MapView>
      </View>
  );
}

const styles = StyleSheet.create({
  container:{
    height:responsiveWidth(90),
  },
  map: {
    width: '100%',
    height:responsiveWidth(90),
    marginTop: responsiveHeight(2),
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
