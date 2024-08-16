import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';
import Colors from '../../Themes/Colors';

const RotatedText = ({ text }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.rotatedText}>{text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    rotatedText: {
        transform: [{ rotate: '-90deg' }],
        fontSize: responsiveFontSize(1.8),
        color: Colors.grey,
        textAlign: 'center',
        width: responsiveHeight(20), // Adjust based on the content
    },
});

export default RotatedText;
