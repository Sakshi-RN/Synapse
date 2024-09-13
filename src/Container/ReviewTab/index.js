import React from 'react';
import { View, StyleSheet, Text, Image, FlatList } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Colors from '../../Themes/Colors';
import { Star } from '../../Assets/svg';
import LCSWImage from '../../Assets/Images/LCSW.png';


const ReviewTab = () => {
  const staticData = [1, 2, 3];

  const renderReviewCard = () => (
    <View style={styles.reviewCard}>
      <View style={styles.row}>
        <Image source={LCSWImage} style={styles.icon} />
        <View style={styles.textContainer}>
          <Text style={styles.name}>Name</Text>
          <Text style={styles.mdText}>Location</Text>
          <View style={styles.starView}>
            {[...Array(5)].map((_, index) => (
              <Star key={index} />
            ))}
          </View>
        </View>
      </View>
      <Text style={styles.description}>
        Lorem ipsum dolor sit amet consectetur. Aliquam feugiat blandit donec elit sed suscipit. Egestas gravida fermentum facilisi vehicula. Facilisi quis suspendisse egestas tincidunt. Sed diam risus tincidunt faucibus sit ut vel. Tellus lobortis id a congue velit risus dolor. Massa arcu blandit proin eu convallis mi scelerisque in proin.
      </Text>
    </View>
  );
  return (
    <FlatList
      data={staticData}
      renderItem={renderReviewCard}
      keyExtractor={(item, index) => index.toString()}
      showsVerticalScrollIndicator={false}
      scrollEnabled={false}
    />


  );
};

export default ReviewTab;

const styles = StyleSheet.create({

  reviewCard: {
    paddingHorizontal: responsiveWidth(3),
    paddingVertical: responsiveHeight(2),
    backgroundColor: Colors.white,
    marginTop: responsiveHeight(1),
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: Colors.skyblue,
  },
  icon: {
    width: 30,
    height: 30,
    borderRadius: 15
  },
  textContainer: {
    marginLeft: responsiveWidth(3),
    width: responsiveWidth(68),

  },
  name: {
    fontSize: responsiveFontSize(1.5),
    fontWeight: '500',
    color: Colors.black,
  },
  mdText: {
    fontSize: responsiveFontSize(1.3),
    color: Colors.darkgrey,
    fontWeight: '500',
  },
  description: {
    fontSize: responsiveFontSize(1.4),
    color: Colors.OFFBLACK,
    marginTop: responsiveHeight(1),
    fontWeight: '500',
    width: responsiveWidth(80),

  },
  Button: {
    marginHorizontal: responsiveWidth(5),
    marginTop: responsiveHeight(3),
  },
  tabsContainer: {
    marginTop: responsiveHeight(3),
    height: responsiveHeight(7),
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
    borderRadius: 6
  },
  activeTabText: {
    color: Colors.blue,
    fontSize: responsiveFontSize(1.5),
    fontWeight: '700',
  },
  row: { flexDirection: 'row' },

  starView: { flexDirection: 'row', justifyContent: 'space-between', width: responsiveWidth(22) }

});
