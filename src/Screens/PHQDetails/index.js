
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import Colors from '../../Themes/Colors';
import CustomHeader from '../../Components/CustomHeader';
import CustomButton from '../../Components/CustomButton';
import ScoreContainer from '../../Container/ScoreContainer';
import Loader from '../../Components/Loader';
import { Fonts } from '../../Themes/fonts';
import commonStyles from '../../Components/CommonStyle';

const PHQDetails = ({ navigation }) => {
  const [assessmentData, setAssessmentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const fetchPhqData = async () => {
    try {
      const response = await fetch('https://eb1.taramind.com/getPhq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Api-Key': 'e1693d9245c57be86afc22ad06eda84c9cdb74dae6d56a8a7f71a93facb1f42b',
        },
        body: JSON.stringify({
          clientId: 'a3ed224c-48d9-11ef-9c86-02f35b8058b3',
        clientAssessmentDetailsPrimaryId: "8045a3c4-7ca6-11ef-9c86-02f35b8058b3"
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to fetch assessment data');
      }
      const data = await response.json();
      setAssessmentData(data[0]);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhqData();
  }, []);

  const questions = [
    "Little interest or pleasure in doing things?",
    "Feeling down, depressed, or hopeless?",
    "Trouble falling or staying asleep, or sleeping too much?",
    "Feeling tired or having little energy?",
    "Poor appetite or overeating?",
    "Feeling bad about yourself — or that you are a failure or have let yourself or your family down?",
    "Trouble concentrating on things, such as reading the newspaper or watching television?",
    "Moving or speaking so slowly that other people could have noticed or the opposite - being so figety or restless that you have been moving around a lot more than usual",
    "Thoughts that you would be better off dead, or of hurting yourself?",
  ];

  const answers = assessmentData ? [
    assessmentData.littleInterestOrPleasure,
    assessmentData.downDepressedHopeless,
    assessmentData.troubleSleeping,
    assessmentData.feelingTired,
    assessmentData.poorApetite,
    assessmentData.feelingBadAboutSelf,
    assessmentData.troubleConcentrating,
    assessmentData.unusualSpeechMovement,
    assessmentData.thoughtsSelfHarm
  ] : [];


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
              {answer}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const renderOptions = () => {
    return (
      <View style={{ paddingHorizontal: responsiveWidth(4) }}>
        <View style={styles.row}>
          <View style={[styles.answerBox, { borderColor: Colors.green }]}>
            <Text style={[styles.answerText, { color: Colors.green }]}>0</Text>
          </View>
          <Text style={[styles.dateText, styles.optionsTextRow]}>  Not at all</Text>
          <View style={[styles.answerBox, { borderColor: Colors.newOrange }]}>
            <Text style={[styles.answerText, { color: Colors.newOrange }]}>2</Text>
          </View>
          <Text style={styles.dateText}>  More than half the days</Text>
        </View>
        <View style={styles.row}>
          <View style={[styles.answerBox, { borderColor: Colors.fade_Yellow }]}>
            <Text style={[styles.answerText, { color: Colors.fade_Yellow }]}>1</Text>
          </View>
          <Text style={[styles.dateText, styles.optionsTextRow]}>  Several days</Text>
          <View style={[styles.answerBox, { borderColor: Colors.fade_red }]}>
            <Text style={[styles.answerText, { color: Colors.fade_red }]}>3</Text>
          </View>
          <Text style={styles.dateText}>  Nearly every day</Text>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
        <View style={styles.centeredContainer}>
            <Loader />
        </View>
    );
  }

  if (error) {
    return <Text style={styles.errorText}>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      <CustomHeader title={'PHQ - 9'} />
      <View style={commonStyles.newConatiner}>
      <ScoreContainer score={assessmentData ? assessmentData.phqScore : "N/A"} />
      {renderOptions()}
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
    </View>
  );
};

export default PHQDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg_Color,
    paddingBottom: responsiveHeight(11),
  },
  content: {
    paddingTop: responsiveHeight(2.5),
    paddingBottom: responsiveHeight(5),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: responsiveHeight(1.5),
    width: responsiveWidth(54),
  },
  optionsTextRow: {
    width: responsiveWidth(34)
  },
  questionContainer: {
    borderColor: Colors.light_skyblue,
    borderWidth:0.8,
    paddingHorizontal:responsiveWidth(2)
  },
  questionText: {
    color: Colors.black,
    width: responsiveWidth(70),
    fontFamily: Fonts.Medium600,
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
    fontFamily: Fonts.Light400,
  },
  joinButton: {
    paddingHorizontal: responsiveWidth(7),
    alignSelf: 'center',
    marginTop: responsiveHeight(2),
    marginBottom: responsiveHeight(2),
  },
  joinText: {
    fontFamily: Fonts.Semibold700,
  },
  containerView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: responsiveWidth(3),
    paddingVertical: responsiveHeight(2),
  },
  dateText: {
    color: Colors.black,
    fontFamily: Fonts.Semibold700,
    fontSize: responsiveFontSize(1.6),
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
},
});
