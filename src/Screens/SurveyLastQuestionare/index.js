import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import Colors from '../../Themes/Colors';
import CustomHeader from '../../Components/CustomHeader';
import CustomButton from '../../Components/CustomButton';
import { useNavigation } from '@react-navigation/native';


const questions = [
    { id: 1, question: "If you checked off any problems, how difficult have these problems made it for you to do your work, take care of things at home, or get along with other people?", options: ["Not at all", "Somewhat difficult", "Very difficult", "Extremely difficult"] }
];

const SurveyLastQuestionare = () => {
    const navigation = useNavigation();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({}); 
    const [selectedOptions, setSelectedOptions] = useState(Array(questions.length).fill(null)); 


    const handleGoBack = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        } else {
            navigation.goBack();
        }
    };

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

    const handleSubmit = () => {
        const currentQuestion = questions[currentQuestionIndex];
        if (selectedAnswers[currentQuestion.id] === undefined) {
            Alert.alert('Please select an answer before proceeding.');
        
            return;
        }

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1); 
        } else {
            // Alert.alert('Survey Completed', 'Your answers have been submitted.');
            navigation.navigate('PHQ');
        }
    };

    return (
        <View style={styles.container}>
            <CustomHeader title={'Survey Questionnaire'} />
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

            <View style={styles.navigationButtons}>
                <CustomButton
                    buttonStyle={styles.backButton}
                    textStyle={styles.buttonText}
                    title="Back"
                    onPress={handleGoBack}
                />
                <CustomButton
                    buttonStyle={styles.nextButton}
                    title={currentQuestionIndex === questions.length - 1 ? "Submit" : "Next"}
                    onPress={handleSubmit}
                />
            </View>
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

    questionText: {
        fontSize: responsiveFontSize(1.7),
        fontWeight: '600',
        color: Colors.black,
        marginHorizontal: responsiveWidth(10),
        marginTop: responsiveHeight(4)
    },
    navigationButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: responsiveHeight(2.5)
    },
    nextButton: {
        backgroundColor: Colors.blue,
        paddingHorizontal: responsiveWidth(6),
    },
    backButton: {
        backgroundColor: Colors.light_skyblue,
        paddingHorizontal: responsiveWidth(8),
        marginHorizontal: responsiveWidth(5)
    },
    buttonText: {
        color: Colors.blue,
    },
    optionsContainer: {
        marginHorizontal: responsiveWidth(10),
        marginTop: responsiveHeight(4),
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
