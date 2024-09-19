import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import Colors from '../../Themes/Colors';
import CustomHeader from '../../Components/CustomHeader';
import CustomButton from '../../Components/CustomButton';
import * as Progress from 'react-native-progress';
import { useNavigation } from '@react-navigation/native';

const questions = [
    { id: 1, question: "1.  Little interest or pleasure in doing things?", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
    { id: 2, question: "2.  Feeling down, depressed, or hopeless?", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
    { id: 3, question: "3.  Trouble falling or staying asleep, or sleeping too much?", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
    { id: 4, question: "4.  Feeling tired or having little energy?", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
    { id: 5, question: "5.  Poor appetite or overeating?", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
    { id: 6, question: "6.  Feeling bad about yourself?", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
    { id: 7, question: "7.  Trouble concentrating on things?", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
    { id: 8, question: "8.  Moving or speaking so slowly that others notice?", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
    { id: 9, question: "9.  Thoughts that you would be better off dead?", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
    { id: 9, question: "10.  Thoughts that you would be better off dead?", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
];

const SurveyLastQuestionare = () => {
    const navigation = useNavigation();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [selectedOptions, setSelectedOptions] = useState(Array(questions.length).fill(null));
    const [progress, setProgress] = useState(0); 

    const handleAnswerSelect = (questionId, answerIndex) => {
        setSelectedAnswers({
            ...selectedAnswers,
            [questionId]: answerIndex,
        });
        setSelectedOptions(prevOptions => {
            const newOptions = [...prevOptions];
            newOptions[currentQuestionIndex] = answerIndex;
            return newOptions;
        });
    };

    const handleNext = () => {
        const currentQuestion = questions[currentQuestionIndex];

        if (selectedAnswers[currentQuestion.id] === undefined) {
            Alert.alert('Please select an answer');
            return;
        }

        if (currentQuestionIndex === questions.length - 1) {
            navigation.navigate('SurveyLastQuestionare');
        } else {
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        }
    };

    const handleBack = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prevIndex => prevIndex - 1);
        }
    };

    useEffect(() => {

        const progressValue = 0.1 + (currentQuestionIndex / (questions.length - 1)) * 0.9;
        setProgress(progressValue);
    }, [currentQuestionIndex]);

    const ProgressBar = () => {
        return (
            <>
                <Progress.Bar
                    progress={progress}
                    width={responsiveWidth(80)}
                    color={Colors.blue}
                    unfilledColor={Colors.light_skyblue}
                    borderWidth={0}
                    height={responsiveHeight(1.2)}
                    style={styles.progressBar}
                    animated // Enable animation
                />
                <Text style={styles.progressText}>{`${Math.round(progress * 100)}%`}</Text>
            </>
        );
    };

    const QuestionAnswer = () => {
        return (
            <>
                <Text style={styles.questionText}>
                    {questions[currentQuestionIndex].question}
                </Text>

                <View style={styles.optionsContainer}>
                    {questions[currentQuestionIndex].options.map((option, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.optionButton,
                                selectedOptions[currentQuestionIndex] === index && styles.selectedOption,
                                index === 0 && styles.firstOption,
                                index === questions[currentQuestionIndex].options.length - 1 && styles.lastOption
                            ]}
                            onPress={() => handleAnswerSelect(questions[currentQuestionIndex].id, index)}
                        >
                            <Text
                                style={[
                                    styles.optionText,
                                    selectedOptions[currentQuestionIndex] === index && styles.selectedOptionText
                                ]}
                            >
                                {option}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </>
        );
    };

    const ButtonRow = () => {
        return (
            <>
                <View style={styles.navigationButtons}>
                    {currentQuestionIndex > 0 && (
                        <CustomButton
                            buttonStyle={styles.backButton}
                            textStyle={styles.buttonText}
                            title="Back"
                            onPress={handleBack}
                        />
                    )}
                    <CustomButton
                        buttonStyle={styles.nextButton}
                        title="Next"
                        onPress={handleNext}
                    />
                </View>
                <Text style={styles.saveText}>Save and Complete Later</Text>
            </>
        );
    };

    return (
        <View style={styles.container}>
            <CustomHeader title={'Survey Questionnaire'} />
            <ProgressBar />
            <QuestionAnswer />
            <ButtonRow />
        </View>
    );
};

export default SurveyLastQuestionare;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        paddingBottom: responsiveHeight(14),

    },
    progressBar: {
        alignSelf: 'center',
        marginTop: responsiveHeight(4),
        borderRadius: 20
    },
    progressText: {
        fontSize: responsiveFontSize(2),
        fontWeight: '500',
        alignSelf: 'center',
        marginTop: responsiveHeight(1),
        color: Colors.black
    },
    questionText: {
        fontSize: responsiveFontSize(1.8),
        fontWeight: '500',
        color: Colors.black,
        marginHorizontal: responsiveWidth(10),
        marginTop: responsiveHeight(4)
    },
    navigationButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
        marginVertical: responsiveHeight(2)
    },
    nextButton: {
        backgroundColor: Colors.blue,
        paddingHorizontal: responsiveWidth(8),
    },

    backButton: {
        backgroundColor: Colors.light_skyblue,
        paddingHorizontal: responsiveWidth(8),
        marginHorizontal: responsiveWidth(5)
    },
    submitButton: {
        backgroundColor: Colors.green,
        paddingHorizontal: responsiveWidth(6),
    },
    buttonText: {
        color: Colors.blue,
    },
    saveText: {
        color: Colors.grey,
        alignSelf: 'center',
        fontWeight: '500',
        fontSize: responsiveFontSize(1.8),
        marginLeft: responsiveWidth(2)

    },

    optionsContainer: {
        marginHorizontal: responsiveWidth(10),
        marginTop: responsiveHeight(2),
        borderColor: Colors.lightgrey,
        borderWidth: 1,
        borderRadius: 12,
        backgroundColor: Colors.white,
        overflow: 'hidden',
    },
    optionButton: {
        paddingVertical: responsiveHeight(2),
        paddingHorizontal: responsiveWidth(4),
        backgroundColor: Colors.white,
        justifyContent: 'center',
        borderTopWidth: 1,

        borderColor: Colors.lightgrey,
    },
    selectedOption: {
        backgroundColor: Colors.blue,
    },
    optionText: {
        fontSize: responsiveFontSize(1.8),
        fontWeight: '500',
        color: Colors.black,
    },
    selectedOptionText: {
        color: Colors.white,
    },
    firstOption: {
        borderTopWidth: 0,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    lastOption: {
        borderBottomWidth: 0,
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
    }
});
