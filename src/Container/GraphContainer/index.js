import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { LineChart } from "react-native-chart-kit";
import { responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';
import Colors from '../../Themes/Colors';

const screenWidth = Dimensions.get("window").width;

const chartConfig = {
    backgroundGradientFrom: "#FFFFFF",
    backgroundGradientTo: "#FFFFFF",
    color: (opacity = 1) => `rgba(34, 94, 168,${opacity})`, 
    labelColor: (opacity = 1) => `rgba(34, 94, 168,${opacity})`,
    strokeWidth: 2,
    propsForDots: {
        r: "3.5",
        strokeWidth: "1.2",
        stroke: "#354764", 
        fill: "white",  
    },
};

const data = {
    labels: ["05/09/2024", "05/10/2024", "05/10/2024", "05/10/2024"], 

    datasets: [
        {
            data: [30, 25, 20, 15],
            color: (opacity = 0.2) => `rgba(34, 94, 168, ${opacity})`, 
            strokeWidth: 2 
        }
    ],

};

const ScoreTrendChart = () => (
    <View style={styles.graphStyle}>
        <Text style={styles.title}>Score Trend</Text>
        <LineChart
            data={data}
            width={screenWidth}
            height={220}
            chartConfig={chartConfig}
        />
        <Text style={styles.subtitle}>PHQ-9</Text>
    </View>
);

const styles = StyleSheet.create({
    graphStyle: {
        height: responsiveHeight(25),
        alignItems: 'center',
        marginBottom: responsiveHeight(9),
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontWeight: '700',
        fontSize: responsiveFontSize(1.8),
        marginTop: responsiveHeight(13),
        marginBottom: responsiveHeight(1)
    },
    subtitle: {
        color: Colors.blue,
        fontWeight: '400',
        fontSize: responsiveFontSize(1.5),
    },
});

export default ScoreTrendChart;

