
import React from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import Colors from '../../Themes/Colors';
import CustomHeader from '../../Components/CustomHeader';
import CustomButton from '../../Components/CustomButton';
import { useNavigation } from '@react-navigation/native';

const PHQ = () => {
    const navigation = useNavigation();

    const handleEditProfile = () => {
        navigation.navigate('Survey');
    };

    const renderSurveyItem = ({ item }) => (
        <View style={styles.containerBox}>
            <View style={styles.containerView}>
                <Text style={styles.nameTitleText}>Survey Date</Text>
                <Text style={styles.bodyText}>04/10/2024 08:08</Text>
            </View>

            <View style={styles.containerView}>
                <Text style={styles.nameTitleText}>Ordered by</Text>
                <Text style={styles.bodyText}>Leena Joseph, LCSW</Text>
            </View>

            <View style={styles.containerView}>
                <Text style={styles.nameTitleText}>Score</Text>
                <Text style={styles.bodyText}>11</Text>
            </View>

            <CustomButton
                buttonStyle={styles.surveyButton}
                textStyle={styles.joinText}
                title={'View Survey'}
                onPress={handleEditProfile}
            />
        </View>
    );

    return (
        <View style={styles.container}>
            <CustomHeader title={'PHQ - 9'} />
            <View style={styles.content}>
                <FlatList
                    data={[1,2,3]}
                    keyExtractor={item => item.id}
                    renderItem={renderSurveyItem}
                    showsVerticalScrollIndicator={false}
                />
            </View>
            <CustomButton
                buttonStyle={styles.joinButton}
                textStyle={styles.joinText}
                title={'Start Survey'}
                onPress={handleEditProfile}
            />
        </View>
    );
};

export default PHQ;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        paddingBottom: responsiveHeight(14)
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
    joinButton: {
        paddingHorizontal: responsiveWidth(5),
        alignSelf: 'center'
    },
    joinText: {
        fontWeight: '500',
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
        fontWeight: 'bold',
        color: Colors.black,
    },
    bodyText: {
        fontSize: responsiveFontSize(1.6),
        color: Colors.blue,
        fontWeight: 'bold',
        width: responsiveWidth(43),
    },
});
