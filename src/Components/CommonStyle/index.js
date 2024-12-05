import { StyleSheet } from 'react-native';
import Colors from '../../Themes/Colors';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { Fonts } from '../../Themes/fonts';

const commonStyles = StyleSheet.create({

  containerView:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    borderBottomColor:Colors.light_skyblue,
    borderBottomWidth:1,
    paddingHorizontal:responsiveWidth(3),
    paddingVertical:responsiveHeight(1)
  },
 bottomView:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    paddingHorizontal:responsiveWidth(3)
  },
  titleText: {
    fontSize: responsiveFontSize(1.8),
    fontFamily: Fonts.Medium600,
    color:Colors.black,
    width:responsiveWidth(60),
    marginVertical:responsiveHeight(1),

  },
  nameTitleText: {
    fontSize: responsiveFontSize(1.8),
    fontFamily: Fonts.Light400,
    color:Colors.black,
    marginVertical:responsiveHeight(1.5),

  },
  bodyText: {
    fontSize: responsiveFontSize(1.6),
    color:Colors.blue,
    fontFamily: Fonts.Bold800,
    marginVertical:responsiveHeight(1.5),

  },

  newConatiner:  {flex:1, 
    backgroundColor:Colors.white ,
   marginTop:responsiveHeight(2.8),
   marginHorizontal:responsiveWidth(3),
   borderRadius:9

}

 
});

export default commonStyles;
