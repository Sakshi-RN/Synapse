
import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import Colors from '../../Themes/Colors';
import CustomHeader from '../../Components/CustomHeader';
import CustomButton from '../../Components/CustomButton';
import CommonStyle from '../../Components/CommonStyle';
import { useNavigation } from '@react-navigation/native';
import LCSWImage from '../../Assets/Images/LCSW.png';

import { ScrollView } from 'react-native-gesture-handler';

const Survey = () => {
    const navigation = useNavigation();

    const handleSurveyHistory = () => {
        navigation.navigate('SurveyHistory');
    };

    return (
        <View style={styles.container}>
            <CustomHeader title={'Survey'} />
            <View style={styles.content}>
                <Text style={styles.headingText}>Your Mental Health Assessment</Text>
                <Text style={styles.bodyText}>Please complete the following question about you and how are feeling to the best of your ability. Your honest answers are important in determining the treatment plan that is right for you.</Text>
                <Image source={LCSWImage} style={styles.img} />
                <Text style={styles.nameTitleText}>Leena Joseph, LCSW</Text>

                <CustomButton
                    buttonStyle={styles.joinButton}
                    textStyle={styles.joinText}
                    title={'Get Started'}
                    onPress={handleSurveyHistory} />
            </View>

        </View>


    );
};

export default Survey;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        paddingBottom: responsiveHeight(14)
    },
    content: {
        flex: 1,
        alignItems: 'center',
        paddingTop: responsiveHeight(1),
        paddingTop: responsiveHeight(4)

    },

    joinButton: {
        paddingHorizontal: responsiveWidth(5),
        marginTop: responsiveHeight(3)

    },


    joinText: {
        fontWeight: '500',
    },


    nameTitleText: {
        fontSize: responsiveFontSize(1.7),
        color: Colors.black,
        fontWeight: '700',
        marginTop: responsiveHeight(2)

    },
    bodyText: {
        fontSize: responsiveFontSize(1.6),
        color: Colors.black,
        fontWeight: '500',
        textAlign: 'center',
        lineHeight: 18,
        width: '90%',
        marginTop: responsiveHeight(2)

    },
    img: {
        height: 140,
        width: 140,
        marginTop: responsiveHeight(3)

    },
    headingText: {
        fontSize: responsiveFontSize(2.7),
        color: Colors.blue,
        fontWeight: '600',
        lineHeight: 24,
        width: '60%',
        textAlign: 'center',
    },


});

