import {StyleSheet} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

import Colors from './Colors';

export const CommonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 15,
  },
  authTitleVericalGap: {
    marginVertical: responsiveHeight(3),
  },
  containerwrap: {
    flex: 1,
    paddingHorizontal: responsiveWidth(5),
  },
  marginTop7: {
    marginTop: 7,
  }
});
