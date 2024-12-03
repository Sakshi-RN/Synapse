import { StyleSheet, Platform } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Colors from '../../Themes/Colors';
import { Fonts } from '../../Themes/fonts';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.bg_Color
    },
    scrollContent: {
        paddingHorizontal: responsiveHeight(2),
        paddingTop: responsiveHeight(1),
        backgroundColor: Colors.bg_Color
    },
    headerContainer: {
        paddingTop: responsiveHeight(6),
        paddingHorizontal: responsiveWidth(8),
        height: responsiveHeight(19),
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
        marginTop: responsiveHeight(1.6),
        fontFamily: Fonts.Medium600
    },
    patientDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: responsiveHeight(1),
        width: '45%'
    },
    patientDetail: {
        color: Colors.white,
        fontWeight: '500',
        fontSize: responsiveFontSize(1.8),
        lineHeight: 20
    },
    slide: {
        paddingHorizontal: responsiveWidth(5),
        paddingVertical: responsiveHeight(1.5),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Colors.white,
        shadowColor: Platform.OS === 'ios' ? Colors.grey : Colors.black,
        shadowOffset: { width: 1, height: 3 },
        shadowOpacity: 4,
        shadowRadius: 4,
        elevation: 5,
        alignSelf: 'center',
        borderRadius: 8,
        width: '100%',
        marginTop: responsiveHeight(2)
    },
    slideText: {
        color: Colors.blue,
        fontSize: responsiveFontSize(1.5),
        width: responsiveWidth(44),
        fontWeight: '400',

    },
    designationText: {
        color: Colors.blue,
        fontSize: responsiveFontSize(1.5),
        fontWeight: '400',
    },
    seemoreText: {
        textDecorationLine: 'underline'
    },
    slideTextSecondary: {
        color: Colors.black,
        fontWeight: '600',
        fontSize: responsiveFontSize(1.4),
        width: responsiveWidth(17),

    },
    slideTextHighlight: {
        color: Colors.black,
        fontWeight: '700',
        fontSize: responsiveFontSize(2.2)
    },
    blueContainer: {
        borderWidth: 1.5,
        borderColor: Colors.blue,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
        padding: 5,
        justifyContent: 'center',
    },
    blueviewContainer: {
        borderWidth: 1.5,
        borderColor: Colors.blue,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
        paddingVertical: responsiveWidth(2),
        justifyContent: 'center',
        paddingHorizontal: responsiveWidth(2)

    },
    startsurveytext: {
        color: Colors.black,
        fontWeight: '600',
        fontSize: responsiveFontSize(1.5),
    },
    line: {
        height: 20,
        width: 1,
        backgroundColor: Colors.grey,
        marginLeft: responsiveWidth(-3)
    },
    reportsContainer: {
        padding: responsiveWidth(4)
    },
    reportsTitle: {
        fontSize: responsiveFontSize(2),
        fontFamily: Fonts.Bold800,
        color: Colors.blue,
    },
    reportDate: {
        fontSize: responsiveFontSize(1.5),
        color: Colors.white,
        fontWeight: '500'
    },
    reportTitle: {
        fontSize: responsiveFontSize(1.8),
        fontWeight: '700',
        color: Colors.white,
        marginTop: responsiveHeight(0.5)
    },
    leenatext: {
        fontSize: responsiveFontSize(1.5),
        fontWeight: '600',
        color: Colors.white,
        marginTop: responsiveHeight(0.5)
    },
    reportAuthor: {
        fontSize: responsiveFontSize(1.5),
        color: Colors.black
    },
    reportStats: {
        fontSize: responsiveFontSize(1.3),
        fontWeight: '600',
        color: Colors.white,
        marginTop: responsiveHeight(0.5)
    },
    countText: {
        fontSize: responsiveFontSize(2),
        fontWeight: '700',
        color: Colors.white,
        marginTop: responsiveHeight(0.5)
    },
    careTeamContainer: {
        padding: responsiveWidth(4)
    },

    careTeamName: {
        fontSize: responsiveFontSize(1.2),
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
    samuelName: {
        fontSize: responsiveFontSize(1.2),
        color: Colors.black,
        fontWeight: '500',
        width: responsiveWidth(20),
        textAlign: 'center',
        backgroundColor: 'green'
    },

    ConcergeName: {
        fontSize: responsiveFontSize(1.2),
        color: Colors.black,
        fontWeight: '500',
        width: responsiveWidth(22),
        textAlign: 'center',
    },
    careTeamRole: {
        fontSize: responsiveFontSize(0.6),
        color: Colors.white,
        fontWeight: '500',
        textAlign: 'center',
        marginTop: responsiveHeight(0.2)
    },
    actionsContainer: {
        padding: responsiveWidth(4)
    },
    actionsTitle: {
        fontSize: responsiveFontSize(2),
        fontWeight: '600',
        marginTop: responsiveHeight(2),
        color: Colors.blue
    },
    actionButton: {
        flex: 1,
        alignItems: 'center',
        margin: responsiveWidth(2),
        backgroundColor: Colors.blue
    },
    actionIcon: {
        width: 40,
        height: 40,
        marginBottom: responsiveHeight(1)
    },
    actionName: {
        fontSize: responsiveFontSize(1.5),
        textAlign: 'center'
    },
    dot: {
        backgroundColor: Colors.OFFWHITE,
        width: 10,
        height: 10,
        borderRadius: 5,
        marginLeft: 3,
        marginRight: 3,
        top: Platform.OS === 'ios' ? responsiveHeight(3) : responsiveHeight(4)

    },
    activeDot: {
        backgroundColor: Colors.blue,
        width: 10,
        height: 10,
        borderRadius: 5,
        marginLeft: 3,
        marginRight: 3,
        top: Platform.OS === 'ios' ? responsiveHeight(3) : responsiveHeight(4)

    },
    reportContainer:
    {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    actionView:
    {
        marginTop: responsiveHeight(1)
    },
    swiperView: { top: responsiveHeight(-4), height: responsiveHeight(12), backgroundColor: 'red' },
    surveyBtnStyle: { marginBottom: responsiveHeight(1) },
    actionStyle: { flexDirection: 'row', alignItems: 'center' },
    appointmentStyle: { marginHorizontal: responsiveWidth(3) },
    consentRow: { flexDirection: 'row', alignItems: 'center', },
    devicebtnStyle:
        { marginLeft: responsiveWidth(3) },
    phqConatiner: { flexDirection: 'row', marginTop: responsiveHeight(1), width: '40%', justifyContent: 'space-between' },
    downloadBtnStyle: { marginTop: responsiveHeight(3) },
    centeredContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rowNew: { flexDirection: 'row', alignItems: 'center' },
    careTeamRow: {
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-evenly',
        marginTop: responsiveFontSize(1.2)
    },
    careTeamBox: {
        paddingTop: responsiveHeight(1),
        paddingBottom: responsiveHeight(0.8),
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
        marginHorizontal:responsiveWidth(2.5)
    },
    conciregeView:{
        marginHorizontal:responsiveWidth(2)
    },
    therapistRoleText: {
        color: Colors.blue,
        fontSize: responsiveFontSize(1.1),
        width: responsiveWidth(45),
        fontWeight: '600',
    },
    newContainer: {
        flexDirection: 'row',
        marginLeft: responsiveWidth(0.5),
        marginTop: responsiveHeight(0.5)
    },
    phase: {
        justifyContent: 'center',
        alignItems: 'center',
        transform: [{ skewX: '-20deg' }],
        height: responsiveHeight(9.5),
        width: responsiveWidth(11),
        borderWidth: 0.5,
        borderColor: Colors.lightgrey,


    },
    text: {
        transform: [{ rotate: '274deg' }],
        fontWeight: '600',
        fontSize: responsiveFontSize(1.1),
        color: Colors.white,
        marginBottom: responsiveHeight(0.5),
        alignSelf: 'center',
        width: responsiveWidth(17),
        top: (-0.5)

    },
    firstPhase: {
        transform: [{ rotate: '274deg' }],
        fontWeight: '600',
        fontSize: responsiveFontSize(1.1),
        color: Colors.white,
        marginBottom: responsiveHeight(0),
        alignSelf: 'center',
        width: responsiveWidth(10)
    },
    icon: {
        width: 60,
        height: 60,
        borderRadius: 30,
        alignSelf: 'center'

    },
    iconContainer: {
        width: 60,
        height: 60,
        alignSelf: 'center'
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
