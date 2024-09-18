
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import Colors from '../../Themes/Colors';
import CustomHeader from '../../Components/CustomHeader';
import CustomButton from '../../Components/CustomButton';
import CommonStyle from '../../Components/CommonStyle';
import { useNavigation } from '@react-navigation/native';

import { ScrollView } from 'react-native-gesture-handler';

const InTake = () => {
    const navigation = useNavigation();

    const handleSurveyHistory = () => {
        navigation.navigate('SurveyHistory');
    };

    return (
        <View style={styles.container}>
            <CustomHeader title={'Intake'} />
            <Text style={styles.headingText}>Personal Information</Text>
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.containerBox}>
                    <View style={styles.containerView}>
                        <Text style={CommonStyle.nameTitleText}>Name</Text>
                        <Text style={styles.bodyText}>Nathan Klin</Text>

                    </View>
                    <View style={styles.line} />
                    <View style={styles.containerView}>
                        <Text style={CommonStyle.nameTitleText}>Email Address</Text>
                        <Text style={styles.bodyText}>Nathan.klin@gmail.com</Text>

                    </View>
                    <View style={styles.line} />
                    <View style={styles.containerView}>
                        <Text style={CommonStyle.nameTitleText}>Phone Number</Text>
                        <Text style={styles.bodyText}>(924) 234-2548</Text>
                    </View>
                    <View style={styles.line} />

                    <View style={styles.containerView}>
                        <Text style={CommonStyle.nameTitleText}>Address Line 1</Text>
                        <Text style={styles.bodyText}>Klin</Text>

                    </View>
                    <View style={styles.line} />
                    <View style={styles.containerView}>
                        <Text style={CommonStyle.nameTitleText}>Address Line 2</Text>
                        <Text style={styles.bodyText}>(924) 234-2548</Text>

                    </View>
                    <View style={styles.line} />
                    <View style={styles.containerView}>
                        <Text style={CommonStyle.nameTitleText}>City</Text>
                        <Text style={styles.bodyText}>Klin</Text>

                    </View>
                    <View style={styles.line} />
                    <View style={styles.containerView}>
                        <Text style={CommonStyle.nameTitleText}>State</Text>
                        <Text style={styles.bodyText}>(924) 234-2548</Text>

                    </View>
                    <View style={styles.line} />
                    <View style={styles.containerView}>
                        <Text style={CommonStyle.nameTitleText}>Zip Code</Text>
                        <Text style={styles.bodyText}>Klin</Text>
                    </View>
                    <View style={styles.line} />
                    <View style={styles.containerView}>
                        <Text style={CommonStyle.nameTitleText}>Date Of Birth</Text>
                        <Text style={styles.bodyText}>(924) 234-2548</Text>
                    </View>
                    <View style={styles.line} />
                    <View style={styles.containerView}>
                        <Text style={CommonStyle.nameTitleText}>Gender</Text>
                        <Text style={styles.bodyText}>(924) 234-2548</Text>
                    </View>
                    <View style={styles.line} />
                    <View style={styles.containerView}>
                        <Text style={CommonStyle.nameTitleText}>Weight (in pounds)</Text>
                        <Text style={styles.bodyText}>150lbs (68Kg)</Text>
                    </View>
                </View>


            </ScrollView>
            <CustomButton
                buttonStyle={styles.joinButton}
                textStyle={styles.joinText}
                title={'Back'}
                onPress={handleSurveyHistory} />


        </View>


    );
};

export default InTake;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        paddingBottom: responsiveHeight(14)
    },
    content: {
        flex: 1,
        paddingHorizontal: responsiveWidth(5),
        paddingTop: responsiveHeight(1),

    },

    joinButton: {
        paddingHorizontal: responsiveWidth(8),
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
        borderColor: Colors.skyblue,
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: Colors.white,
        marginBottom: responsiveHeight(4)
    },
    containerView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: responsiveWidth(3),
        paddingVertical: responsiveHeight(0.5),


    },
    nameTitleText: {
        fontSize: responsiveFontSize(1.8),
        fontWeight: '400',
        color: Colors.black,

    },
    bodyText: {
        fontSize: responsiveFontSize(1.6),
        color: Colors.blue,
        fontWeight: 'bold',

    },
    headingText: {
        fontSize: responsiveFontSize(2),
        color: Colors.blue,
        fontWeight: 'bold',
        marginTop: responsiveHeight(3),
        marginLeft: responsiveWidth(5)
    },



});

