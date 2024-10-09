import * as LocalAuthentication from 'expo-local-authentication';
import React, { useEffect, useState } from 'react';
import { Button, Text, View, Alert, Platform } from 'react-native';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isHardwareAvailable, setIsHardwareAvailable] = useState(false);
  const [isFaceIdAvailable, setIsFaceIdAvailable] = useState(false);
  const [isBiometricsEnrolled, setIsBiometricsEnrolled] = useState(false);

  useEffect(() => {
    checkDeviceForHardware();
  }, []);

  const checkDeviceForHardware = async () => {
    try {
      const compatible = await LocalAuthentication.hasHardwareAsync(); // Checks if the device has biometric hardware
      const enrolled = await LocalAuthentication.isEnrolledAsync(); // Checks if biometrics are enrolled (face/fingerprint)
      const supportedTypes = await LocalAuthentication.supportedAuthenticationTypesAsync(); // Gets the supported types
      
      // console.log('Hardware Available:', compatible);
      // console.log('Biometrics Enrolled:', enrolled);
      // console.log('Supported Authentication Types:', supportedTypes);
  
      const isFaceIdAvailable = supportedTypes.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION);
      const isFingerprintAvailable = supportedTypes.includes(LocalAuthentication.AuthenticationType.FINGERPRINT);
      
      // console.log('Face ID Available:', isFaceIdAvailable);
      // console.log('Fingerprint Available:', isFingerprintAvailable);
  
      setIsHardwareAvailable(compatible);
      setIsFaceIdAvailable(isFaceIdAvailable);
      setIsBiometricsEnrolled(enrolled);
  
      if (!compatible) {
        Alert.alert('Error', 'This device is not compatible with biometric authentication.');
      } else if (!enrolled) {
        Alert.alert('Error', 'No biometrics are enrolled on this device.');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while checking for hardware support.');
      console.error(error);
    }
  };
  

  const handleAuthentication = async () => {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate with Biometrics',
        fallbackLabel: 'Use Passcode',
        cancelLabel: 'Cancel',
      });

     

      if (result.success) {
        setIsAuthenticated(true);
        Alert.alert('Success', 'You are authenticated!');
      } else {
        setIsAuthenticated(false);
        Alert.alert('Authentication Failed', 'Please try again.');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred during authentication.');
      console.error('Authentication Error:', error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {isHardwareAvailable && isBiometricsEnrolled ? (
        isAuthenticated ? (
          <Text>You are authenticated!</Text>
        ) : (
          <Button title="Authenticate" onPress={handleAuthentication} />
        )
      ) : (
        <Text>
          {isHardwareAvailable
            ? 'Biometric authentication is available but not enrolled.'
            : 'Biometric authentication is not available on this device.'}
        </Text>
      )}
    </View>
  );
}
