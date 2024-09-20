import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import Colors from '../../Themes/Colors';

const Table = ({ questions, answers, Questionwidth, answerWidth }) => {
    const data = questions.map((question, index) => ({
        key: index.toString(),
        question,
        answer: answers[index] || '',
    }));

    const renderItem = ({ item }) => (
        <View style={styles.row}>
            <View style={[styles.cell, Questionwidth]}>
                <Text style={styles.questionCellText}>{`${parseInt(item.key) + 1}. ${item.question}`}</Text>
            </View>
            <View style={[styles.questionCell, answerWidth]}>
                <Text style={styles.answerCellText}>{item.answer}</Text>
            </View>
        </View>
    );

    return (
        <FlatList
            showsVerticalScrollIndicator={false}
            style={styles.separator}
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.key}
        />

    );
};

const styles = StyleSheet.create({

    row: {
        flexDirection: 'row',
        backgroundColor: Colors.white,
        elevation: 5,
        shadowColor: Colors.blue,
        shadowOffset: { width: 1, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        backgroundColor: Colors.white,

    },
    cell: {
        justifyContent: 'center',
        paddingVertical: responsiveHeight(1),
        paddingHorizontal: responsiveWidth(2),
        borderWidth: 0.5,
        borderColor: Colors.light_skyblue,
        borderRadius: 2,
        width: '65%'
    },

    questionCell: {
        justifyContent: 'center',
        paddingVertical: responsiveHeight(1),
        paddingHorizontal: responsiveWidth(2),
        borderWidth: 0.5,
        borderColor: Colors.light_skyblue,
        borderRadius: 2,
        width: '34%'
    },
    questionCellText: {
        fontSize: responsiveFontSize(1.5),
        color: Colors.black,
        fontWeight: '600'

    },
    answerCellText: {
        fontSize: responsiveFontSize(1.6),
        color: Colors.blue,
        alignSelf: 'center',
        textAlign: 'center',
        fontWeight: 'bold'


    },

    separator: {
        marginHorizontal: responsiveWidth(6),
        marginBottom: responsiveHeight(3),
    },
});

export default Table;
