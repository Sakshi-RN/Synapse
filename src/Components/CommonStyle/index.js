import { StyleSheet } from 'react-native';
import Colors from '../../Themes/Colors';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const commonStyles = StyleSheet.create({

  container: {
    borderColor:Colors.light_skyblue,
   borderWidth:1,
   borderRadius:10
  },

  containerView:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    borderBottomColor:Colors.light_skyblue,
    borderBottomWidth:1,
    paddingHorizontal:responsiveWidth(3)
  },
 bottomView:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    paddingHorizontal:responsiveWidth(3)
  },
  titleText: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: '500',
    color:Colors.black,
    width:responsiveWidth(60),
    marginVertical:responsiveHeight(1),

  },
  nameTitleText: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: '400',
    color:Colors.black,
    marginVertical:responsiveHeight(1.5),

  },
  bodyText: {
    fontSize: responsiveFontSize(1.6),
    color:Colors.blue,
    fontWeight:'bold',
    marginVertical:responsiveHeight(1.5),

  },



 
});

export default commonStyles;
