import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import Colors from '../../Themes/Colors';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';


const ScoreContainer = () => {
    const route = useRoute();
    const { therapistName = 'N/A', score = 'N/A', date = 'N/A' } = route.params || {};
    // Function to format date in dd/mm/yyyy format and exclude the time
    const formatSurveyDate = (dateStr) => {
        if (!dateStr) return 'N/A';

        // Extract just the date part before the space
        const [datePart] = dateStr.split(" ");
        const [month, day, year] = datePart.split("/");

        return (day && month && year)
            ? `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`
            : 'Invalid date';
    };
    const formattedDate = formatSurveyDate(date);
    return (
        <View style={styles.headerInfo}>
            <Text style={styles.therapistText}>
                Therapist: <Text style={styles.linkText}>{therapistName}</Text>
            </Text>
            <View style={styles.row}>
                <Text style={styles.dateText}>
                    <Text style={styles.scoreText}>Date:</Text> {formattedDate}
                </Text>
                <Text style={styles.dateText}>
                    <Text style={styles.scoreText}>Score:</Text> {score}
                </Text>
            </View>
        </View>

    );
};

const styles = StyleSheet.create({

    headerInfo: {
        paddingHorizontal: responsiveWidth(4),
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
