import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import Colors from '../../Themes/Colors';
import { useNavigation } from '@react-navigation/native';


const ScoreContainer = () => {
    const navigation = useNavigation();
    return (

        <View style={styles.headerInfo}>
            <Text style={styles.therapistText}>Therapist: <Text style={styles.linkText}>Leena Joseph, LCSW</Text></Text>
            <View style={styles.row}>
                <Text style={styles.dateText}><Text style={styles.scoreText}>Date:</Text> 04/10/2024</Text>
                <Text style={styles.dateText}><Text style={styles.scoreText}>Score:</Text> 5</Text>
            </View>
        </View>

    );
};

const styles = StyleSheet.create({

    headerInfo: {
        paddingHorizontal: responsiveWidth(5),
        paddingVertical: responsiveHeight(2),
    },
    therapistText: {
        color: Colors.black,
        fontWeight: 'bold',
        fontSize: responsiveFontSize(1.8),
    },
    linkText: {
        color: Colors.blue,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: responsiveHeight(1.5),
        width: responsiveWidth(54),
    },
    dateText: {
        color: Colors.black,
        fontWeight: '600',
        fontSize: responsiveFontSize(1.6),
    },
    scoreText: {
        fontWeight: 'bold',
    },

});

export default ScoreContainer;
