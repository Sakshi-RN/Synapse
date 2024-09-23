import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity,Platform } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import Colors from '../../Themes/Colors';
import CustomHeader from '../../Components/CustomHeader';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { Advice, AppleWatch, CommunicationPreferences, HealthApp, PhoneBook, Policy, Starred, TaraMind, TermsOfUse, Video } from '../../Assets/svg';

const Connect = () => {
  const navigation = useNavigation();


  const handlePreferences = () => {
    navigation.navigate('Preferences');
}
const handleEmergencycontacts = () => {
  navigation.navigate('Emergencycontacts');
}
const handleMyProfileScreen = () => {
  navigation.navigate('MyProfileScreen');
}
    return (
        <View style={styles.container}>
            <CustomHeader title={'Connect'} />
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <Text style={styles.sectionTitle}>Connect</Text>
                <View style={styles.section}>
                    <TouchableOpacity style={styles.row} onPress={handlePreferences}>
                   <AppleWatch/>
                     <Text style={styles.rowText}>Apple Watch</Text>
                        <Icon name="chevron-right" size={16} color={Colors.black} />
                    </TouchableOpacity>
                    <View style={styles.line}/>
                    <TouchableOpacity style={styles.row} onPress={handleEmergencycontacts}>
                    <AppleWatch/>
                        <Text style={styles.rowText}>Fitbit</Text>
                        <Icon name="chevron-right" size={16} color={Colors.black} />
                    </TouchableOpacity>
                    <View style={styles.line}/>
                    <TouchableOpacity style={styles.row} onPress={handleEmergencycontacts}>
                       <HealthApp/>
                        <Text style={styles.rowText}>Apple Health App</Text>
                        <Icon name="chevron-right" size={16} color={Colors.black} />
                    </TouchableOpacity>
                </View>

            </ScrollView>
   
        </View>
    );
};

export default Connect;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        paddingBottom:responsiveHeight(13),
    },
    content: {
        flex: 1,
        paddingHorizontal: responsiveWidth(5),
        paddingTop:responsiveHeight(4)
    },
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: responsiveHeight(2),
        paddingHorizontal: responsiveWidth(5),
        backgroundColor:Colors.light_skyblue,
        paddingVertical:responsiveHeight(1.5),
        borderRadius:10,
        shadowColor:Platform.OS === 'ios' ? Colors.OFFWHITE:Colors.black, 
        shadowOffset: { width: 3, height: 5 }, 
        shadowOpacity:1, 
        shadowRadius:2, 
        elevation: 5,
    },
    avatarBox: {
        width: responsiveHeight(8),
        height: responsiveHeight(8),
        borderRadius: responsiveHeight(4),
        backgroundColor: Colors.blue,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        fontSize: responsiveFontSize(2.5),
        color: Colors.white,
        fontWeight: '500',
    },
    profileInfo: {
      width:responsiveWidth(52),
     marginHorizontal: responsiveWidth(4),
    },
    profileName: {
        fontSize: responsiveFontSize(2),
        fontWeight: 'bold',
        color: Colors.blue,
    },
    profilePhone: {
        fontSize: responsiveFontSize(1.8),
        color: Colors.blue,
    },
    section: {
       
        paddingHorizontal: responsiveWidth(5),
        elevation: 5,  
        shadowColor:Platform.OS === 'ios' ? Colors.OFFWHITE:Colors.black, 
        shadowOffset: { width: 3, height: 3 }, 
        shadowOpacity:1, 
        shadowRadius:2, 
        borderColor: Colors.light_skyblue,
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: Colors.white,
        marginBottom:responsiveHeight (2)
    },
    sectionTitle: {
        fontSize: responsiveFontSize(2),
        fontWeight: '700',
        color: Colors.blue,
        marginBottom: responsiveHeight(1),
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: responsiveHeight(2),
      
    },
    rowText: {
        fontSize: responsiveFontSize(1.8),
        color: Colors.black,
        flex: 1,
        marginLeft: responsiveWidth(3),
        fontWeight:'500'
    },
    versionText:{
      color:Colors.blue,
      marginTop:responsiveHeight(1)
    },
    line:{
      backgroundColor:Colors.light_skyblue,
    height:1,

      }
});
