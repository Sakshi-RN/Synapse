
import React from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import Colors from '../../Themes/Colors';
import CustomHeader from '../../Components/CustomHeader';
import CustomButton from '../../Components/CustomButton';
import CommonStyle from '../../Components/CommonStyle';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { Signature } from '../../Assets/svg';

const TreatmentSummary = () => {
    const navigation = useNavigation();
    const data = [
        { id: '1', text: 'Based on this evaluation, this individual IS deemed appropriate for ketamine-assisted therapy treatment at this time.' },
        { id: '2', text: 'Based on this evaluation and the client\'s ACE score, it is recommended that this client receive the standard protocol.' },
        { id: '3', text: 'Checking this box is my request to have diagnosis-specific rating scales sent electronically by synapse to the patient automatically, at predetermined intervals.' },
        { id: '4', text: 'The critical role of these rating scales in their treatment was discussed with the client, and they were instructed to promptly fill out all rating scales sent to them throughout and after their treatment course. The client has been informed that the first set will be sent for completion before the first preparation therapy session.' },
        { id: '5', text: 'Client will schedule a preparation therapy session with this therapist.' },
        { id: '6', text: 'Client has been instructed to contact this therapist with any pressing concerns between therapy sessions.' },
        { id: '7', text: 'Document any additional recommendations, instructions, or concerns.' }
    ];


    const handleGoBack = () => {
        navigation.goBack();
    };

    const renderHealthDetails = () => {
        return (
            <View style={styles.containerBox}>
                <View style={styles.containerView}>
                    <Text style={CommonStyle.nameTitleText}>Client Name</Text>
                    <Text style={styles.bodyText}>Nathan Klin</Text>

                </View>
                <View style={styles.line} />
                <View style={styles.containerView}>
                    <Text style={CommonStyle.nameTitleText}>Gender</Text>
                    <Text style={styles.bodyText}>Male</Text>

                </View>
                <View style={styles.line} />
                <View style={styles.containerView}>
                    <Text style={CommonStyle.nameTitleText}>Date Of Birth</Text>
                    <Text style={styles.bodyText}>(924) 234-2548</Text>
                </View>
                <View style={styles.line} />

                <View style={styles.containerView}>
                    <Text style={CommonStyle.nameTitleText}>Weight (in pounds)</Text>
                    <Text style={styles.bodyText}>Klin</Text>

                </View>
                <View style={styles.line} />
                <View style={styles.containerView}>
                    <Text style={CommonStyle.nameTitleText}>Height</Text>
                    <Text style={styles.bodyText}>(924) 234-2548</Text>

                </View>
                <View style={styles.line} />
                <View style={styles.containerView}>
                    <Text style={CommonStyle.nameTitleText}>Insurance</Text>
                    <Text style={styles.bodyText}>Klin</Text>

                </View>
                <View style={styles.line} />
                <View style={styles.containerView}>
                    <Text style={CommonStyle.nameTitleText}>Coverage Start Date</Text>
                    <Text style={styles.bodyText}>(924) 234-2548</Text>

                </View>
                <View style={styles.line} />
                <View style={styles.containerView}>
                    <Text style={CommonStyle.nameTitleText}>Coverage End Date</Text>
                    <Text style={styles.bodyText}>Klin</Text>
                </View>
                <View style={styles.line} />
                <View style={styles.containerView}>
                    <Text style={CommonStyle.nameTitleText}>Prescriber</Text>
                    <Text style={styles.bodyText}>(924) 234-2548</Text>
                </View>
                <View style={styles.line} />
                <View style={styles.containerView}>
                    <Text style={CommonStyle.nameTitleText}>Protocol</Text>
                    <Text style={styles.bodyText}>(924) 234-2548</Text>
                </View>
            </View>
        )
    }

    const renderContent = () => {
        return (
            <View style={styles.flatlistContent}>
                <Text style={styles.headingText}>Clinical Diagnosis List</Text>
                <Text style={styles.synopsisText}>Synopsis of client’s pre-treatment condition</Text>
                <Text style={styles.danielText}>Daniel Klin is a 35 years-old male who was evaluated for appropriateness for ketamine-assisted therapy treatment.</Text>
                <Text style={styles.headingText}>Treatment Recommendations</Text>
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <Text style={styles.itemText}>{`${item.id}. ${item.text}`}</Text>
                    )}
                />
                <Signature style={styles.signTextStyle}/>
                <Text style={styles.nameText}>Samuel Rush</Text>
                <Text style={styles.nameTitleText}>04/11/2024 12:10PM</Text>
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <CustomHeader title={'Treatment Summary'} />
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {renderHealthDetails()}
                {renderContent()}
            </ScrollView>
            <CustomButton
                buttonStyle={styles.joinButton}
                title={'Back'}
                onPress={handleGoBack}
            />
        </View>
    );
};

export default TreatmentSummary;

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


    joinButton: {
        paddingHorizontal: responsiveWidth(8),
        alignSelf: 'center'
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
    line: {
        backgroundColor: Colors.light_skyblue,
        height: 1,

    },
    headingText: {
        fontSize: responsiveFontSize(2.5),
        fontWeight: 'bold',
        color: Colors.black,
        marginTop: responsiveHeight(2)
    },
    itemText: {
        fontSize: responsiveFontSize(1.4),
        fontWeight: '500',
        color: Colors.black,
        marginTop: responsiveHeight(1),
        lineHeight: 15
    },
    synopsisText: {
        fontSize: responsiveFontSize(1.7),
        fontWeight: '700',
        color: Colors.black,
        marginTop: responsiveHeight(1)
    },
    danielText: {
        fontSize: responsiveFontSize(1.5),
        fontWeight: '400',
        color: Colors.blue,
        marginTop: responsiveHeight(1),
        lineHeight: 16
    },
    nameText: {
        fontSize: responsiveFontSize(1.7),
        fontWeight: '700',
        color: Colors.black,

    },
    signTextStyle:{
        marginTop: responsiveHeight(3),
    },
    flatlistContent:{
        paddingBottom:responsiveWidth(13)
    }



});

