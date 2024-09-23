import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Calling, Camera, DownloadSave, Mic } from '../../Assets/svg';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Colors from '../../Themes/Colors';
import { useNavigation } from '@react-navigation/native';


const VideoCall = () => {
    const navigation = useNavigation();
    const handleFeedback = () => {
        navigation.navigate('Feedback');
    }
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
      <Text style={styles.prflTetx}>NK</Text>
      </View>
      <Text style={styles.message}>
        Therapist will be joining in few more minutes
      </Text>
      <View style={styles.controls}>
        <TouchableOpacity onPress={handleFeedback}>
        <Calling/>
        </TouchableOpacity>
        <TouchableOpacity>
        <Mic/>
            </TouchableOpacity>
            <TouchableOpacity>
            <Camera/>
            </TouchableOpacity>
            <TouchableOpacity>
            <DownloadSave/>
            </TouchableOpacity>     
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
   paddingHorizontal:responsiveWidth(5),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:Colors.white
  },
  avatarContainer: {
  width:100,
  height:100,
  borderRadius:50,
  backgroundColor:'#E3E1E6',
  justifyContent:'center',
  alignItems:'center'
  },

  message: {
    fontSize:responsiveFontSize(2.4),
    fontWeight: '700',
    color:Colors.black,
    marginTop:responsiveHeight(2.5),
    textAlign: 'center',
  },
  controls: {
    position: 'absolute',
    bottom:responsiveHeight(3),
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
  },
  prflTetx: {
    fontSize:responsiveFontSize(3),
    fontWeight: '700',
    color: '#18273B'
  },

});

export default VideoCall;
