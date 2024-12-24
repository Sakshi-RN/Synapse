import { StyleSheet, Platform } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Colors from '../../Themes/Colors';
import { Fonts } from '../../Themes/fonts';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.bg_Color,
        paddingBottom:responsiveHeight(12)

    },
    scrollContent: {
        paddingHorizontal: responsiveHeight(2),
        paddingTop: responsiveHeight(1),
        backgroundColor: Colors.bg_Color,
    },
    headerContainer: {
        paddingTop:  Platform.OS === 'ios' ? responsiveHeight(5):responsiveHeight(1),
        paddingHorizontal: responsiveWidth(8),
        height:  Platform.OS === 'ios' ? responsiveHeight(16):responsiveHeight(13),
        borderBottomWidth:2,
        borderBottomColor:Colors.Dark_Orange,
backgroundColor:Colors.blue,
borderBottomLeftRadius:18,
borderBottomRightRadius:18
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: responsiveHeight(6)
    },
    patientName: {
        color: Colors.white,
        fontSize: responsiveFontSize(2.1),
        marginTop: responsiveHeight(0.5),
        fontFamily: Fonts.Medium600
    },

    reportsTitle: {
        fontSize: responsiveFontSize(2),
        fontFamily: Fonts.Bold800,
        color: Colors.blue,
    },

    careTeamName: {
        fontSize: responsiveFontSize(1.1),
        fontFamily: Fonts.Medium600,
        textAlign: 'center',
        color: Colors.white
    },
    nameNewStyle: {
        fontSize: responsiveFontSize(0.7),
        marginTop: responsiveHeight(0.7),
        fontFamily: Fonts.Bold800,
        textAlign: 'center',
        color: Colors.white
    },
    careTeamRole: {
        fontSize: responsiveFontSize(0.6),
        color: Colors.white,
        fontWeight: '500',
        textAlign: 'center',
        marginTop: responsiveHeight(0.2)
    },
    actionView:{
        marginTop: responsiveHeight(1)
    },
    actionStyle: { flexDirection: 'row', alignItems: 'center' },
    appointmentStyle: { marginHorizontal: responsiveWidth(3) },
    consentRow: { flexDirection: 'row', alignItems: 'center', },
    devicebtnStyle:
        { marginLeft: responsiveWidth(3) },
    centeredContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    careTeamRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: responsiveFontSize(1.2)
    },
    careTeamBox: {
        paddingTop: responsiveHeight(1),
        paddingBottom: responsiveHeight(0.8),
        height:responsiveHeight(10.4),
        width: responsiveWidth(23),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#274E6D',
        borderRadius: 9,
        shadowColor: Platform.OS === 'ios' ? Colors.OFFWHITE : Colors.black,
        shadowOffset: { width: 3, height: 5 },
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 5,
        marginHorizontal:responsiveWidth(2.5),
        borderBottomColor:Colors.Dark_Orange,
        borderBottomWidth:2
    },
    conciregeView:{
        marginHorizontal:responsiveWidth(2),
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
