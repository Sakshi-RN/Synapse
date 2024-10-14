import { StyleSheet, Platform } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Colors from '../../Themes/Colors';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        paddingBottom: Platform.OS === 'ios' ? responsiveHeight(14) : responsiveHeight(7)
    },
    content: {
        paddingHorizontal: responsiveWidth(5),
    },
    Button: {
        backgroundColor: Colors.light_skyblue,
        paddingHorizontal: responsiveWidth(16),
    },
    joinButton: {
        paddingHorizontal: responsiveWidth(16),
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: responsiveWidth(5),
        marginTop: responsiveHeight(2)
    },
    btnText: {
        color: Colors.blue,
        fontWeight: '500',
    },
    joinText: {
        fontWeight: '500',
    },
    name: {
        fontSize: responsiveFontSize(1.6),
        fontWeight: 'bold',
        color: Colors.black,
        marginTop: responsiveHeight(1),
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
        marginTop: responsiveHeight(3)
    },
    profileName: {
        color: Colors.white,
        fontWeight: '400',
        fontSize: responsiveFontSize(2.5)
    },
    nametitleStyle: {
        width: responsiveWidth(20.5),
    },
    emailTitle: {
        width: responsiveWidth(26.5),
    },
    phoneTitle: {
        width: responsiveWidth(27),
    },
    genderStyle: {
        width: responsiveWidth(16),
    },
    dobStyle: {
        width: responsiveWidth(30),
    },
    weightStyle: {
        width: responsiveWidth(33),
    },
    heightStyle: {
        width: responsiveWidth(28),
    },
    streetsStyle: {
        width: responsiveWidth(27),
    },
    addressStyle: {
        width: responsiveWidth(20),
    },
    cityStyle: {
        width: responsiveWidth(10.5),
    },
    stateStyle: {
        width: responsiveWidth(12.5),
    },
    zipCodeStyle: {
        width: responsiveWidth(18),
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
        fontWeight: '700',
        marginTop: responsiveHeight(3),
        textAlign: 'center',
        color: Colors.blue
    },
    closeButton: {
        marginTop: responsiveHeight(3),

    },
    itemText: {
        fontSize: responsiveFontSize(2),
        fontWeight: '600',
        marginTop: responsiveHeight(3),
        textAlign: 'center',
        color: Colors.black
    },
    errorText: {
        fontSize: responsiveFontSize(1.6),
        fontWeight: '500',
        marginTop: responsiveHeight(1),
        color: Colors.red
    },
    centeredContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

});


export default styles;
