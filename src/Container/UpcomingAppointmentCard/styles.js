
import { StyleSheet,Platform} from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Colors from '../../Themes/Colors';
import { Fonts } from '../../Themes/fonts';

const styles = StyleSheet.create({
    name: {
        fontSize: responsiveFontSize(2),
        fontFamily: Fonts.Bold800,
        color: Colors.blue,
    },
    type: {
        fontSize: responsiveFontSize(1.3),
        color: Colors.newgrey,
        fontFamily: Fonts.Semibold700,
        marginTop: responsiveHeight(0.2),
    },
    rowStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: responsiveHeight(1.5),
    },
    JoinButton: {
        backgroundColor: '#274E6D',
        borderRadius: 8,
        paddingVertical: responsiveHeight(0.8),
        paddingHorizontal: responsiveWidth(15),
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: responsiveHeight(1.5),
    },
    JoinButtonText: {
        color: Colors.white,
        fontSize: responsiveFontSize(1.7),
        fontFamily: Fonts.Medium600,
    },
    calenderView: {
        backgroundColor: Colors.bg_Color,
        borderRadius: 8,
        paddingVertical: responsiveHeight(1),
        paddingHorizontal: responsiveWidth(4),
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: responsiveHeight(1.5),
    },
    calenderViewText: {
        color: Colors.blue,
        fontSize: responsiveFontSize(1.7),
        fontFamily: Fonts.Medium600,
    },
    upcomingButtonText: {
        color: Colors.Dark_Orange,
        fontSize: responsiveFontSize(1.2),
        fontFamily: Fonts.Semibold700,
    },
    upcomingButton: {
        backgroundColor: Colors.ORANGE,
        padding: 2,
        borderRadius: 5,
        marginTop: responsiveHeight(1),
        alignItems: 'center',
        width: responsiveWidth(18)
    },
    noAppointmenets: {
        fontSize: responsiveFontSize(1.8),
        fontFamily: Fonts.Bold800,
        color: Colors.blue,
        alignSelf: 'center',
        marginVertical: responsiveHeight(2)
    },
    commonContainer: {
        backgroundColor: Colors.white,
        paddingVertical: responsiveHeight(1.2),
        paddingHorizontal: responsiveWidth(2.9),
        borderRadius: 10,
        marginTop: responsiveHeight(1.5),
        shadowColor: Platform.OS === 'ios' ? Colors.OFFWHITE : Colors.black,
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 5,
    }

});
export default styles;
