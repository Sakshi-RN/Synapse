
import React from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import Colors from '../../Themes/Colors';

const JoinSession = () => {
    return (
        <View style={styles.container}>
            <View style={styles.reasonContainer} />
            <Text style={styles.label}>Write your reason</Text>
            <TextInput
                style={styles.textInput}
                placeholder="Write your reason here"
                placeholderTextColor={Colors.black}
            />
        </View>
    );
};

export default JoinSession;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        justifyContent: 'space-between',
    },

    reasonContainer: {
        marginTop: 20,
    },
    label: {
        left: responsiveWidth(6),
        backgroundColor: Colors.white,
        paddingHorizontal: responsiveWidth(1),
        fontSize: responsiveFontSize(1.6),
        color: Colors.black,
        fontWeight: '500',
        width: responsiveWidth(33),
        position: 'absolute',
        zIndex: 1,
        top: responsiveHeight(1),
    },
    textInput: {

        borderColor: Colors.darkgrey,
        borderWidth: 1.5,
        borderRadius: 2,
        padding: responsiveHeight(1.5),
        fontSize: responsiveFontSize(1.8),
        color: Colors.black,
        fontWeight: '400',
        marginHorizontal: responsiveWidth(3),
        backgroundColor: Colors.white,
    },
});

