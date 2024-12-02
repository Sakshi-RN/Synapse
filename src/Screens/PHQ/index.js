import React, { useEffect } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import Colors from '../../Themes/Colors';
import CustomHeader from '../../Components/CustomHeader';
import CustomButton from '../../Components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSurveyData, selectSurveyData, selectSurveyLoading } from '../../redux/Reducers/PHQReducer';
import Loader from '../../Components/Loader';
import { Fonts } from '../../Themes/fonts';

const PHQ = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
const selectSurveyData = (state) => state.phq.surveyData;
 const selectSurveyLoading = (state) => state.phq.fetchLoading;
 const selectSurveyError = (state) => state.phq.fetchError;
 const surveyData = useSelector(selectSurveyData);
 const loading = useSelector(selectSurveyLoading);
 const error = useSelector(selectSurveyError);
 


    useEffect(() => {
        dispatch(fetchSurveyData());
    }, [dispatch]);

    const handleViewSurvey = (item) => {
        navigation.navigate('PHQDetails', {
            therapistName: item.providerName,
            score: item.assessmentScore,
            date: item.assessmentStartedDate,
        });
    };

    const renderSurveyItem = ({ item }) => (
        <View style={styles.containerBox}>
            <View style={styles.containerView}>
                <Text style={styles.nameTitleText}>Survey Date</Text>
                <Text style={styles.bodyText}>{item.assessmentStartedDate}</Text>
            </View>
            <View style={styles.containerView}>
                <Text style={styles.nameTitleText}>Ordered by</Text>
                <Text style={styles.bodyText}>{item.providerName}</Text>
            </View>
            <View style={styles.containerView}>
                <Text style={styles.nameTitleText}>Score</Text>
                <Text style={styles.bodyText}>{item.assessmentScore}</Text>
            </View>
            <CustomButton
                buttonStyle={styles.surveyButton}
                textStyle={styles.joinText}
                title={'View Survey'}
                onPress={() => handleViewSurvey(item)}
            />
        </View>
    );

    return (
        <View style={styles.container}>
            <CustomHeader title={'Survey History'} />
            {loading ? (
                <View style={styles.centeredContainer}>
                    <Loader />
                </View>
            ) : surveyData.length > 0 ? (
                <FlatList
                    data={surveyData}
                    keyExtractor={(item) => item.ID}
                    renderItem={renderSurveyItem}
                    showsVerticalScrollIndicator={false}
                    style={styles.content}
                />
            ) : (
                <Text style={styles.noDataText}>No survey data available.</Text>
            )}
        </View>
    );
};

export default PHQ;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        paddingBottom: responsiveHeight(14),
    },
    content: {
        flex: 1,
        paddingHorizontal: responsiveWidth(5),
        paddingTop: responsiveHeight(3),
    },
    surveyButton: {
        alignSelf: 'flex-end',
        paddingHorizontal: responsiveWidth(12),
    },
    joinText: {
        fontFamily: Fonts.Semibold700,
    },
    containerBox: {
        elevation: 5,
        shadowColor: Colors.black,
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        borderColor: Colors.light_skyblue,
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: Colors.white,
        marginBottom: responsiveHeight(2),
    },
    containerView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: responsiveWidth(3),
        paddingVertical: responsiveHeight(1),
    },
    nameTitleText: {
        fontSize: responsiveFontSize(1.8),
        fontFamily: Fonts.Bold800,
        color: Colors.black,
    },
    bodyText: {
        fontSize: responsiveFontSize(1.6),
        color: Colors.blue,
        fontFamily: Fonts.Bold800,
        width: responsiveWidth(43),
    },
    noDataText: {
        textAlign: 'center',
        fontSize: responsiveFontSize(1.6),
        color: Colors.gray,
        marginTop: responsiveHeight(2),
    },
    centeredContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
