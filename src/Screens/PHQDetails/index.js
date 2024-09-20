import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import Colors from '../../Themes/Colors';
import CustomHeader from '../../Components/CustomHeader';
import CustomButton from '../../Components/CustomButton';
import { useNavigation } from '@react-navigation/native';

const PHQDetails = () => {
    const navigation = useNavigation();

    const handleGoBack = () => {
        navigation.goBack();
    };

    // Mock data for questions and responses
    const questions = [
        "Little interest or pleasure in doing things?",
        "Feeling down, depressed, or hopeless?",
        "Trouble falling or staying asleep, or sleeping too much?",
        "Feeling tired or having little energy?",
        "Poor appetite or overeating?",
        "Feeling bad about yourself — or that you are a failure or have let yourself or your family down?",
        "Trouble concentrating on things, such as reading the newspaper or watching television?",
        "Moving or speaking so slowly that other people could have noticed? Or the opposite — being so fidgety or restless?",
        "Thoughts that you would be better off dead, or of hurting yourself?",
    ];

    const answers = [0, 2, 2, 3, 2, 1, 0, 0, 1];
    const getAnswerColor = (answer) => {
        switch (answer) {
            case 0:
                return Colors.green;
            case 1:
                return Colors.fade_Yellow;
            case 2:
                return Colors.newOrange;
            case 3:
                return Colors.fade_red;
            default:
                return Colors.gray;
        }
    };

    const renderQuestion = (question, index) => {
        const answer = answers[index];

        return (
            <View key={index} style={styles.questionContainer}>
                <View style={styles.containerView}>
                    <Text style={styles.questionText}>{`${index + 1}. ${question}`}</Text>
                    <View style={[styles.answerBox, { borderColor: getAnswerColor(answer) }]}>
                        <Text style={[styles.answerText, { color: getAnswerColor(answer) }]}>
                            {answer === 0 ? '0' : answer === 1 ? '1' : answer === 2 ? '2' : '3'}
                        </Text>
                    </View>
                </View>
            </View>
        );
    };

    const renderOptions = () => {
        return (
            <View>
                <View style={styles.row}>
                    <View style={[styles.answerBox, { borderColor: Colors.green }]}>
                        <Text style={[styles.answerText, { color: Colors.green }]}>0</Text>
                    </View>
                    <Text style={[styles.dateText, styles.optionsTextRow]}>{' '}{' '}Not at all</Text>
                    <View style={[styles.answerBox, { borderColor: Colors.newOrange }]}>
                        <Text style={[styles.answerText, { color: Colors.newOrange }]}>2</Text>
                    </View>
                    <Text style={styles.dateText}>{' '}{' '}More than half the days</Text>
                </View>
                <View style={styles.row}>
                    <View style={[styles.answerBox, { borderColor: Colors.fade_Yellow }]}>
                        <Text style={[styles.answerText, { color: Colors.fade_Yellow }]}>1</Text>
                    </View>
                    <Text style={[styles.dateText, styles.optionsTextRow]}>{' '}{' '}Several days</Text>
                    <View style={[styles.answerBox, { borderColor: Colors.fade_red }]}>
                        <Text style={[styles.answerText, { color: Colors.fade_red }]}>3</Text>
                    </View>
                    <Text style={styles.dateText}>{' '}{' '}Nearly every day</Text>
                </View>
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <CustomHeader title={'PHQ - 9'} />
            <View style={styles.headerInfo}>
                <Text style={styles.therapistText}>
                    Therapist: <Text style={styles.linkText}>Leena Joseph, LCSW</Text>
                </Text>
                <View style={styles.row}>
                    <Text style={styles.dateText}><Text style={styles.scoreText}>Date:</Text><Text> 04/10/2024</Text></Text>
                    <Text style={styles.dateText}><Text style={styles.scoreText}>Score:</Text><Text> 11</Text></Text>
                </View>
                {renderOptions()}
            </View>
            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                {questions.map((question, index) => renderQuestion(question, index))}
            </ScrollView>
            <CustomButton
                buttonStyle={styles.joinButton}
                textStyle={styles.joinText}
                title={'Back'}
                onPress={handleGoBack}
            />
        </View>
    );
};

export default PHQDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        paddingBottom: responsiveHeight(2),
    },
    content: {
        paddingHorizontal: responsiveWidth(7),
        paddingTop: responsiveHeight(3),
        paddingBottom: responsiveHeight(5),
    },
    headerInfo: {
        paddingHorizontal: responsiveWidth(7),
        paddingTop: responsiveHeight(2),
    },
    therapistText: {
        color: Colors.black,
        marginBottom: responsiveHeight(0.5),
        fontWeight: 'bold'
    },
    linkText: {
        color: Colors.blue,
    },
    dateText: {
        color: Colors.black,
        fontWeight: '600',
        fontSize: responsiveFontSize(1.6),

    },
    scoreText: {
        fontWeight: 'bold'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: responsiveHeight(2),
        width: responsiveWidth(54),

    },

    optionsTextRow: {
        width: responsiveWidth(34)
    },
    questionContainer: {
        elevation: 5,
        shadowColor: Colors.blue,
        shadowOffset: { width: 1, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        borderColor: Colors.light_skyblue,
        borderWidth: 0.5,
        borderRadius: 2,
        backgroundColor: Colors.white,
    },
    questionText: {
        color: Colors.black,
        width: responsiveWidth(70),
        fontWeight: '500',
        fontSize: responsiveFontSize(1.6),

    },
    answerBox: {
        width: 21,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1.2,
        borderRadius: 5,
    },
    answerText: {
        fontSize: responsiveFontSize(1.5),
        fontWeight: '400',
    },
    joinButton: {
        paddingHorizontal: responsiveWidth(7),
        alignSelf: 'center',
        marginTop: responsiveHeight(2),
        marginBottom: responsiveHeight(2),
    },
    joinText: {
        fontWeight: '500',
    },
    containerView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: responsiveWidth(3),
        paddingVertical: responsiveHeight(2),
    }

});
