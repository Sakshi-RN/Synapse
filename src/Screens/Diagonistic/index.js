import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import Colors from '../../Themes/Colors';
import CustomHeader from '../../Components/CustomHeader';
import CustomButton from '../../Components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import ScoreContainer from '../../Container/ScoreContainer';

const DiagnosticsScreen = () => {
    const navigation = useNavigation();

    const handleGoBack = () => {
        navigation.goBack();
    };

    // Mock data for diagnostics questions and answers
    const diagnosticsQuestions = [
        { question: "Please select your relationship to the patient", answer: "Self" },
        { question: "Was the patient mandated to this treatment program or did they volunteer?", answer: "Mandated by Court" },
        { question: "The patient understands that they are about to take a mental health assessment...", answer: "Agree with this statement" },
        { question: "Is the patient or has the patient been depressed or sad for most of the day, nearly everyday?", answer: "5" },
        { question: "At any time in the patient's life has he or she been depressed for a period of time lasting two weeks or more?", answer: "No" }
    ];

    return (
        <View style={styles.container}>
            <CustomHeader title="Diagnostics" />
            <ScoreContainer/>
            <ScrollView contentContainerStyle={styles.content}>
                {diagnosticsQuestions.map((item, index) => (
                    <View key={index} style={styles.questionContainer}>
                        <Text style={styles.questionText}>{`${index + 1}. ${item.question}`}</Text>
                        <Text style={styles.answerText}>{item.answer}</Text>
                    </View>
                ))}
            </ScrollView>
            <CustomButton
                buttonStyle={styles.button}
                textStyle={styles.buttonText}
                title="Back"
                onPress={handleGoBack}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    content: {
        paddingHorizontal: responsiveWidth(5),
        paddingTop: responsiveHeight(2),
    },
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
    questionContainer: {
        paddingVertical: responsiveHeight(2),
        borderBottomWidth: 1,
        borderBottomColor: Colors.lightGray,
    },
    questionText: {
        color: Colors.black,
        fontWeight: '500',
        fontSize: responsiveFontSize(1.6),
    },
    answerText: {
        color: Colors.black,
        fontSize: responsiveFontSize(1.6),
        fontWeight: '500',
        marginTop: responsiveHeight(1),
    },
    button: {
        marginHorizontal: responsiveWidth(5),
        marginBottom: responsiveHeight(3),
    },
    buttonText: {
        fontSize: responsiveFontSize(1.8),
        fontWeight: '600',
    },
});

export default DiagnosticsScreen;
