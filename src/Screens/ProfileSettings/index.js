import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity,Platform } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import Colors from '../../Themes/Colors';
import CustomHeader from '../../Components/CustomHeader';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { Advice, CommunicationPreferences, PhoneBook, Policy, Starred, TaraMind, TermsOfUse, Video } from '../../Assets/svg';

const ProfileSettings = () => {
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
            <CustomHeader title={'Profile & Settings'} />
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.profileSection}>
                    <View style={styles.avatarBox}>
                        <Text style={styles.avatarText}>NK</Text>
                    </View>
                    <View style={styles.profileInfo}>
                        <Text style={styles.profileName}>Nathan Klin</Text>
                        <Text style={styles.profileName}>(924) 234-2342</Text>
                    </View>
                    <TouchableOpacity onPress={handleMyProfileScreen}>
                    <Icon name="chevron-right" size={20} color={Colors.black} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.sectionTitle}>Preferences</Text>
                <View style={styles.section}>
                   
                    <TouchableOpacity style={styles.row} onPress={handlePreferences}>
                   <CommunicationPreferences/>
                     <Text style={styles.rowText}>Communication Preferences</Text>
                        <Icon name="chevron-right" size={20} color={Colors.black} />
                    </TouchableOpacity>
                    <View style={styles.line}/>
                    <TouchableOpacity style={styles.row} onPress={handleEmergencycontacts}>
                       <PhoneBook/>
                        <Text style={styles.rowText}>Emergency Contacts</Text>
                        <Icon name="chevron-right" size={20} color={Colors.black} />
                    </TouchableOpacity>
                </View>

                <Text style={styles.sectionTitle}>Therapy Tools</Text>
                <View style={styles.section}>
                    <TouchableOpacity style={styles.row} onPress={() => {}}>
                     <Starred/>
                        <Text style={styles.rowText}>Starred Messages</Text>
                    </TouchableOpacity>
                    <View style={styles.line}/>
                    <TouchableOpacity style={styles.row} onPress={() => {}}>
                        <Video/>
                        <Text style={styles.rowText}>Video Session Test</Text>
                        <Icon name="external-link" size={20} color={Colors.black} />
                    </TouchableOpacity>
                    <View style={styles.line}/>
                    <TouchableOpacity style={styles.row} onPress={() => {}}>
                        <Advice/>
                        <Text style={styles.rowText}>Advice</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.sectionTitle}>Support</Text>
                <View style={styles.section}>
                    <TouchableOpacity style={styles.row} onPress={() => {}}>
                        <Policy/>
                        <Text style={styles.rowText}>Privacy Policy</Text>
                        <Icon name="external-link" size={20} color={Colors.black} />
                    </TouchableOpacity>
                    <View style={styles.line}/>
                    <TouchableOpacity style={styles.row} onPress={() => {}}>
                      <TermsOfUse/>
                        <Text style={styles.rowText}>Terms Of Use</Text>
                        <Icon name="external-link" size={20} color={Colors.black} />
                    </TouchableOpacity>
                    <View style={styles.line}/>
                    <TouchableOpacity style={styles.row} onPress={() => {}}>
                        <Icon name="question-circle" size={20} color={Colors.black} />
                        <Text style={styles.rowText}>FAQ</Text>
                        <Icon name="external-link" size={20} color={Colors.black} />
                    </TouchableOpacity>
                    <View style={styles.line}/>
                    <TouchableOpacity style={styles.row} onPress={() => {}}>
                        <Icon name="sign-out" size={20} color={Colors.red} />
                        <Text style={[styles.rowText, { color: Colors.red }]}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <View style={{alignItems:'center',marginTop:responsiveHeight(2)}}>
            <TaraMind/>
              <Text style={styles.versionText}>© 2024 TARA Mind. v0.19.0.</Text>
            </View>
        </View>
    );
};

export default ProfileSettings;

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
        fontWeight: 'bold',
        color: Colors.black,
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
