import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Colors from '../../Themes/Colors';
import { MeetIcon } from '../../Assets/svg';

const AboutmeTab = () => {

  return (
    <>
      <View style={styles.careTeamnCard}>
        <Text style={styles.name}>Samuel Rush</Text>
        <MeetIcon />
        <Text style={styles.virtualTYext}>Virtual</Text>
      </View>
      <Text style={styles.mdText}>MD</Text>
      <Text style={styles.specialitiesText}>Specialties</Text>
      <Text style={styles.description}>Treatment-resistant depression, Anxiety disorders, OCD, Chronic illness, and Cognitive disorders/TBI</Text>
      <Text style={styles.specialitiesText}>Background</Text>
      <Text style={styles.description}>
        Samuel Rush, LPCC, LCSW, and LSW is a licensed psychotherapist practicing in California, Florida, New Jersey, and New York, who has 5 years of experience treating depression, anxiety, PTSD and other trauma-related issues.Samuel Rush successfully passed the thorough screening process required to join our network, has the training and experience needed to deliver safe and effective psychedelic-assisted therapy and comes recommended by multiple professional colleagues to do so.
        Samuel Rush has special interest in treating Treatment-resistant depression, Anxiety disorders, OCD, Chronic illness, and Cognitive disorders/TBI, Samuel Rush is experienced at performing preparation and integration therapy sessions via videoconferencing to clients after they have received ketamine
      </Text>
    </>
  );
};

export default AboutmeTab;

const styles = StyleSheet.create({

  careTeamnCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  name: {
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
  }




});
