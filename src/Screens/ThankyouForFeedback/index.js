// import React from 'react';
// import { View, Text, StyleSheet, Platform } from 'react-native';
// import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
// import Colors from '../../Themes/Colors';
// import CustomButton from '../../Components/CustomButton';
// import { useNavigation } from '@react-navigation/native';

// const ThankyouForFeedback = () => {
//   const navigation = useNavigation()

//   const handleHome = () => {
//     navigation.navigate('Home');
//   }




//   return (

//         <View style={styles.container}>
//           <Text style={styles.sessionText}>Thank you for the feedback!</Text>
//           <CustomButton title="Go to Dashboard" onPress={handleHome} />
//         </View>
 
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: responsiveWidth(3),
// justifyContent:'center',
//     backgroundColor: Colors.white
//   },
//   content: {
//     flex: 1,
//   },
//   avatarSection: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: responsiveHeight(2),
//   },
//   avatarImage: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//   },
//   avatarInitials: {
//     width: 70,
//     height: 70,
//     borderRadius: 35,
//     backgroundColor: '#E3E1E6',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginLeft: -20,
//   },
//   avatarText: {
//     fontSize: responsiveFontSize(2.5),
//     fontWeight: '700',
//     color: '#18273B',
//   },
//   sessionInfoCard: {
//     backgroundColor: Colors.white,
//     padding: responsiveWidth(4),
//     borderRadius: 10,
//     elevation: 4,
//     shadowColor: Platform.OS === "ios" ? Colors.OFFWHITE : Colors.grey,
//     shadowOpacity: 2,
//     shadowOffset: { width: 1, height: 1 },
//     marginBottom: responsiveHeight(2),
//     shadowRadius: 2

//   },
//   sessionText: {
//     textAlign: 'center',
//     fontSize: responsiveFontSize(2.5),
//     fontWeight: 'bold',
//     marginBottom: responsiveHeight(2),
//   },
//   sessionDetails: {
//     marginBottom: responsiveHeight(1),
//   },
//   sessionName: {
//     fontSize: responsiveFontSize(2),
//     fontWeight: 'bold',
//   },
//   sessionType: {
//     fontSize: responsiveFontSize(1.6),
//     color: Colors.darkgrey,
//     marginVertical: responsiveHeight(0.5),
//   },
//   sessionTime: {
//     fontSize: responsiveFontSize(1.6),
//     color: Colors.darkgrey,
//   },
//   completedButton: {
//     backgroundColor: Colors.GREEN,
//     height: responsiveHeight(3),
//     width: responsiveWidth(22),
//     borderRadius: 5,
//     marginTop: responsiveHeight(1),
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   completedButtonText: {
//     color: Colors.Dark_Green,
//     fontSize: responsiveFontSize(1.3),
//     fontWeight: '600',
//   },
//   viewDetailsButton: {
//     borderColor: Colors.blue, backgroundColor: Colors.white, borderWidth: 1.5,
//     marginTop: responsiveHeight(1),
//   },
//   viewDetailsButtonText: {
//     color: Colors.blue,
//     fontWeight: '600'
//   },
//   feedbackContainer: {
//     paddingVertical: responsiveHeight(2),
//     backgroundColor: 'pink'
//   },
//   feedbackTitle: {
//     fontSize: responsiveFontSize(1.8),
//     fontWeight: 'bold',
//     marginBottom: responsiveHeight(1),
//     color: Colors.black
//   },
//   heartRatingContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',

//   },
//   heartIcon: {
//     marginHorizontal: responsiveWidth(0.3),
//   },
//   feedbackInput: {
//     borderColor: Colors.grey,
//     borderWidth: 1,
//     borderRadius: 5,
//     padding: responsiveHeight(1),
//     textAlignVertical: 'top',
//     minHeight: responsiveHeight(10),
//   },
//   skipText: {
//     color: Colors.blue,
//     fontSize: responsiveFontSize(1.7),
//     fontWeight: '600',
//     marginTop: responsiveHeight(2),
//     alignSelf: 'center'
//   },
//   inputTitle: { color: Colors.black, top: responsiveHeight(1.5), width: responsiveWidth(16), },
//   input: {
//     height: responsiveHeight(15),
//     marginBottom: responsiveHeight(2),
//   },
//   inputView: {
//     paddingBottom: responsiveHeight(8),
//     fontWeight: '500'

//   }
// });

// export default ThankyouForFeedback;


import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Colors from '../../Themes/Colors';
import CustomButton from '../../Components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { ThankyouChecked } from '../../Assets/svg';

const ThankyouForFeedback = () => {
  const navigation = useNavigation();

  const handleHome = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
    <ThankyouChecked/>
      <Text style={styles.title}>Thank you for the feedback!</Text>
      <Text style={styles.description}>
      Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium.
      </Text>
      <CustomButton title="Go to Dashboard" onPress={handleHome} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(3),
    backgroundColor: Colors.white,
  },
  icon: {
    width: responsiveWidth(20),
    height: responsiveWidth(20),
    marginBottom: responsiveHeight(2),
  },
  title: {
    textAlign: 'center',
    fontSize: responsiveFontSize(2.5),
    fontWeight: 'bold',
    marginTop: responsiveHeight(2),
    color: Colors.black,
  },
  description: {
    textAlign: 'center',
    fontSize: responsiveFontSize(1.7),
    color: Colors.darkgrey,
    fontWeight:'600',
    marginTop: responsiveHeight(1),

  }
});

export default ThankyouForFeedback;
