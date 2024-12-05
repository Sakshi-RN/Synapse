import { StyleSheet, Platform } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Colors from '../../Themes/Colors';
import { Fonts } from '../../Themes/fonts';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.bg_Color ,
        paddingBottom: responsiveHeight(14)  
    },
    content: {
        paddingHorizontal: responsiveWidth(3),
        flex: 1,
    },
    Button: {
        borderColor: Colors.blue,
        paddingHorizontal: responsiveWidth(14),
        borderWidth:1,
        backgroundColor:Colors.white
    },
    btnText: {
        color: Colors.blue,
      fontFamily: Fonts.Medium600,
    },
    joinButton: {
        paddingHorizontal: responsiveWidth(15),
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: responsiveWidth(5),
        marginVertical: responsiveHeight(2)
    },

    joinText: {
      fontFamily: Fonts.Medium600,
    },
    name: {
        fontSize: responsiveFontSize(1.8),
        fontFamily: Fonts.Bold800,
        color: Colors.blue,
        marginTop: responsiveHeight(2),
    },
    titleStyle: {
        fontSize: responsiveFontSize(1.6),
        color: Colors.black
    },
    profileContainer: {
        backgroundColor: Colors.blue,
        width: 60,
        height: 60,
        borderRadius: 30,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: responsiveHeight(2)
    },
    profileName: {
        color: Colors.white,
        fontFamily: Fonts.Light400,
        fontSize: responsiveFontSize(2.5)
    },
   
    widthStyle: {
        width: responsiveWidth(45),
    },
    stateWidth: {
        width: responsiveWidth(42)
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        paddingVertical: responsiveHeight(5)
    },
    modalContent: {
        width: responsiveWidth(90),
        backgroundColor: Colors.white,
        borderRadius: 10,
        padding: 8,
        alignItems: 'center',
        paddingVertical: responsiveHeight(5)
    },
    modalText: {
        fontSize: responsiveFontSize(2),
        fontFamily: Fonts.Semibold700,
        marginTop: responsiveHeight(3),
        textAlign: 'center',
        color: Colors.blue
    },
    closeButton: {
        marginTop: responsiveHeight(3),

    },
    itemText: {
        fontSize: responsiveFontSize(2),
        fontFamily: Fonts.Semibold700,
        marginTop: responsiveHeight(3),
        textAlign: 'center',
        color: Colors.black
    },
    errorText: {
        fontSize: responsiveFontSize(1.6),
      fontFamily: Fonts.Medium600,
        marginTop: responsiveHeight(1),
        color: Colors.red
    },
    centeredContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }

});


export default styles;
