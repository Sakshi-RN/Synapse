import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from "react-native-chart-kit";
import { responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';
import Colors from '../../Themes/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSurveyData, selectSurveyData, selectLoading, selectError } from '../../redux/Reducers/PHQReducer';
import Loader from '../../Components/Loader';

const chartConfig = {
    backgroundGradientFrom: "#FFFFFF",
    backgroundGradientTo: "#FFFFFF",
    color: (opacity = 1) => `rgba(34, 94, 168, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(34, 94, 168, ${opacity})`,
    strokeWidth: 2,
    propsForDots: {
        r: "3.5",
        strokeWidth: "1.2",
        stroke: "#354764",
        fill: "white",
    },
    propsForLabels: {
        fontSize: 11,
    },
};

const ScoreTrendChart = () => {
    const dispatch = useDispatch();
    const surveyData = useSelector(selectSurveyData);
    const fetchLoading = useSelector(selectLoading);
    const fetchError = useSelector(selectError);

    useEffect(() => {
        dispatch(fetchSurveyData());
    }, [dispatch]);

    const data = {
        labels: surveyData
            .map((item) => {
                if (!item.assessmentStartedDate) return 'N/A';
                const dateStr = item.assessmentStartedDate;
                const [month, day, year] = dateStr.split(" ")[0]?.split("/") || [];
                return month && day && year
                    ? `${month.padStart(2, '0')}/${day.padStart(2, '0')}/${year}`
                    : 'Invalid date';
            })
            .filter((label) => label !== 'N/A'),

        datasets: [
            {
                data: surveyData
                    .map((item) => {
                        const score = parseInt(item.assessmentScore, 10);
                        return isNaN(score) ? 0 : score;
                    })
                    .filter((score) => score !== Infinity),
                color: (opacity = 1) => `rgba(34, 94, 168, ${opacity})`,
                strokeWidth: 2,
            },
        ],
    };

    if (fetchLoading) {
        return (
            <View style={styles.centeredContainer}>
                <Loader />
            </View>
        );
    }

    if (fetchError) {
        return (
            <View style={styles.centeredContainer}>
                <Text style={styles.errorText}>Failed to load data. Please try again later.</Text>
            </View>
        );
    }

    return (
        <View style={styles.graphStyle}>
            <Text style={styles.title}>Score Trend</Text>
            <LineChart
                data={data}
                width={Dimensions.get('window').width - 40} 
                height={230}
                chartConfig={chartConfig}
                verticalLabelRotation={-35}
            />
            <Text style={styles.subtitle}>PHQ-9</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    graphStyle: {
        height: responsiveHeight(30),
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: responsiveHeight(3),
    },
    title: {
        fontWeight: '700',
        fontSize: responsiveFontSize(2),
        marginBottom: responsiveHeight(1),
    },
    subtitle: {
        color: Colors.blue,
        fontWeight: '600',
        fontSize: responsiveFontSize(1.8),
    },
    errorText: {
        color: Colors.red,
        fontSize: responsiveFontSize(2),
    },
    centeredContainer: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ScoreTrendChart;
