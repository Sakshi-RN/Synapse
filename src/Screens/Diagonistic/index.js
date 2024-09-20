import React from 'react';
import { View, StyleSheet } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import Colors from '../../Themes/Colors';
import CustomHeader from '../../Components/CustomHeader';
import CustomButton from '../../Components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import ScoreContainer from '../../Container/ScoreContainer';
import Table from '../../Container/TableContainer'

const Diagnostics = () => {
    const navigation = useNavigation();

    const handleGoBack = () => {
        navigation.goBack();
    };

    const questions = [
        'Please select your relationship to the patient',
        'Was the patient mandated to this treatment program or did they volunteer?',
        "The patient understands that they are about to take a mental health assessment and that the outcome of this assessment is dependent on their honest and complete answers to the following questions. They understand that their healthcare provider may use this information and other information to help them to make a diagnosis and that given false, misleading, or incomplete information may affect the outcome. They agree to give accurate, truthful and complete answers to the CLINICOM questions.",
        'The patient understands that they are about to take a mental health assessment...',
        "At any time in the patient's life has he or she been depressed for a period of time lasting two weeks or more?"
    ];

    const answers = [
        'Self',
        'Mandated by Court',
        'Agree with this statement',
        "5",
        "No"
    ];


    return (
        <View style={styles.container}>
            <CustomHeader title="Diagnostics" />
            <ScoreContainer />
            <Table questions={questions} answers={answers} />
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
});

export default Diagnostics;

