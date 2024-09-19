
import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import Colors from '../../Themes/Colors';
import CustomHeader from '../../Components/CustomHeader';
import CustomButton from '../../Components/CustomButton';
import * as Progress from 'react-native-progress';
import { useNavigation } from '@react-navigation/native';

// Survey Questions
const questions = [
       { id: 1, question: "If you checked off any problems, how difficult have these problems made it for you to do your work, take care of things at home, or get along with other people?", options: ["Not at all", "Somewhat difficult", "Very difficult", "Extremely difficult"] },

];


const SurveyLastQuestionare = () => {
    const navigation = useNavigation();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Tracks current question
    const [selectedAnswers, setSelectedAnswers] = useState({}); // Stores selected answers
    const [selectedOptions, setSelectedOptions] = useState(Array(questions.length).fill(null)); // Tracks selected options

 
 
    const handleGoBack = () => {
        navigation.goBack();
    };

    
    const handleAnswerSelect = (questionId, answerIndex) => {
        setSelectedAnswers({
            ...selectedAnswers,
            [questionId]: answerIndex, // Stores the selected option index for each question
        });
        setSelectedOptions(prevOptions => {
            const newOptions = [...prevOptions];
            newOptions[currentQuestionIndex] = answerIndex; // Updates the selected option
            return newOptions;
        });
    };


    const handleSubmit = () => {
        const currentQuestion = questions[currentQuestionIndex];

        // Ensure an answer is selected before proceeding
        if (selectedAnswers[currentQuestion.id] === undefined) {
            Alert.alert('Validation Error', 'Please select an answer before proceeding.');
            return;
        }
      else {
            setCurrentQuestionIndex(currentQuestionIndex + 1); // Move to the next question
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
                    title="Submit"
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
        marginVertical: responsiveHeight(2)
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
    submitButton: {
        backgroundColor: Colors.green,
        paddingHorizontal: responsiveWidth(6),
    },
    buttonText: {
        color: Colors.blue,
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
