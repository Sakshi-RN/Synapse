import React from 'react';
import { View, StyleSheet } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import Colors from '../../Themes/Colors';
import CustomHeader from '../../Components/CustomHeader';
import CustomButton from '../../Components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import ScoreContainer from '../../Container/ScoreContainer';
import Table from '../../Container/TableContainer'

const ACE = () => {
    const navigation = useNavigation();

    const handleGoBack = () => {
        navigation.goBack();
    };

    const questions = [
        'Did you feel that you didn’t have enough to eat, had to wear dirty clothes, or had no one to protect or take care of you?',
        'Did you lose a parent through divorce, abandonment, death or other reason?',
        "Did you live with anyone who was depressed, mentally ill or attempted suicide?",
        'Did you live with anyone who had a problem with drinking or using drugs, including prescription drugs?',
        "Did your parent or adults in your home ever hit, punch, beat, or threaten to harm each other?",
        "Did you live with anyone who went to jail or prison?",
        "Did a parent or adult in your home ever swear at you, insult you, or put you down?",
    ];

    const answers = [
        'No',
        'yes',
        'No',
        'yes',
        'No',
        'yes',
        'No',
      
    ];


    return (
        <View style={styles.container}>
            <CustomHeader title="ACE" />
            <ScoreContainer />
            <Table 
            questions={questions} 
            answers={answers} 
            answerWidth={styles.answerWidthStyle}
            Questionwidth={styles.questionWidthStyle}/>
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
        paddingBottom: responsiveHeight(13),
    },
 
    button: {
      paddingHorizontal: responsiveWidth(7),
        alignSelf: 'center',
        marginTop: responsiveHeight(2),
   },
    buttonText: {
        fontSize: responsiveFontSize(1.8),
        fontWeight: '600',
    },
    answerWidthStyle:{
        width:'25%',

    },
    questionWidthStyle:{
 width: '75%',

    }
});

export default ACE;

