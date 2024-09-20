import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import Colors from '../../Themes/Colors';
import CustomHeader from '../../Components/CustomHeader';
import CustomButton from '../../Components/CustomButton';
import { useNavigation } from '@react-navigation/native';

const ACEScreen = () => {
    const navigation = useNavigation();

    const handleGoBack = () => {
        navigation.goBack();
    };

    // Mock data for ACE questions and answers
    const aceQuestions = [
        { question: "Did you feel that you didn't have enough to eat, had to wear dirty clothes, or had no one to protect or take care of you?", answer: "No" },
        { question: "Did you lose a parent through divorce, abandonment, death or other reason?", answer: "Yes" },
        { question: "Did you live with anyone who was depressed, mentally ill or attempted suicide?", answer: "Yes" },
        { question: "Did you live with anyone who had a problem with drinking or using drugs, including prescription drugs?", answer: "No" },
        { question: "Did your parent or adults in your home ever hit, punch, beat, or threaten to harm each other?", answer: "Yes" },
        { question: "Did you live with anyone who went to jail or prison?", answer: "No" },
        { question: "Did a parent or adult in your home ever swear at you, insult you, or put you down?", answer: "Yes" }
    ];

    return (
        <View style={styles.container}>
            <CustomHeader title="ACE" />
            <View style={styles.headerInfo}>
                <Text style={styles.therapistText}>Therapist: <Text style={styles.linkText}>Leena Joseph, LCSW</Text></Text>
                <View style={styles.row}>
                    <Text style={styles.dateText}><Text style={styles.scoreText}>Date:</Text> 04/10/2024</Text>
                    <Text style={styles.dateText}><Text style={styles.scoreText}>Score:</Text> 5</Text>
                </View>
            </View>
            <ScrollView contentContainerStyle={styles.content}>
                {aceQuestions.map((item, index) => (
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
        marginTop: responsiveHeight(1),
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

export default ACEScreen;
