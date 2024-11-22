import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { View, StyleSheet, Text, FlatList,Platform } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import Colors from '../../Themes/Colors';
import { useFocusEffect } from '@react-navigation/native';
import Loader from '../../Components/Loader';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Fonts } from '../../Themes/fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';


const TreatmentSummary = () => {
    const { fetchLoading, fetchError } = useSelector(state => state.profile);
    const [additionalData, setAdditionalData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);



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


    const fetchAdditionalData = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const clientId =await AsyncStorage.getItem('authclientID')
            if (!clientId) {
                Alert.alert('Error', 'No clientID found');
                return rejectWithValue('No clientID found');
            }
            const response = await fetch('https://eb1.taramind.com/getTreatmentPlan', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Api-Key': 'e1693d9245c57be86afc22ad06eda84c9cdb74dae6d56a8a7f71a93facb1f42b'
                },
                body: JSON.stringify({ clientId }),
            });

            const result = await response.json();
            if (response.ok) {
                setAdditionalData(result);
            } else {
                throw new Error('Failed to fetch profile data');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            fetchAdditionalData();
        }, [fetchAdditionalData])
    );

    const treatment = additionalData && additionalData[0];
    const diagnosticDeterminationArray = JSON.parse(treatment?.diagnosticDetermination || '[]');

    const renderContent = () => {
        return (
            <View style={styles.flatlistContent}>
                <Text style={styles.headingText}>Clinical Diagnosis List</Text>
                <FlatList
            data={diagnosticDeterminationArray}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
                <View style={styles.itemContainer}>
                    <Text style={styles.itemText}>{index + 1}. {item}</Text>
                </View>
            )}
        />
                <Text style={styles.headingText}>Synopsis of pre-treatment condition</Text>
                <Text style={styles.danielText}>{treatment?.clinicalSynopsis}</Text>
                <Text style={styles.headingText}>Treatment Recommendations</Text>
                <Text style={styles.itemText}>
                    <Text>1. Based on this evaluation, this individual</Text>
                    {treatment?.treatmentRecoKATagreement === true ? (
                        <Text style={styles.newText}> IS deemed appropriate for ketamine-assisted therapy treatment at this time</Text>
                    ) : null}
                </Text>
                {treatment?.treatmentRecoKATagreement === true ? (
                    <Text style={styles.itemText}>2. Based on this evaluation and the client’s ACE score, it is recommended that this client receive the {treatment?.treatmentRecoStdorTrauma} protocol.</Text>
                ) : null}
                {treatment?.treatmentRecoKATagreement === true ? (
                    <>
                        <View style={styles.row}>
                            <Text style={[styles.itemText, { marginTop: 0, }]}>3. </Text>
                            {treatment?.treatmentRecoElectronicAssmt === true ? (
                                <>
                                    <Icon name="check-square" size={18} color={Colors.grey} />
                                    <Text>{' '}</Text>
                                </>
                            ) : null}
                            <Text style={[styles.itemText, { marginTop: 0, }]}>Checking this box is my request to have diagnosis-specific</Text>
                        </View>
                        <Text style={[styles.itemText, { marginTop: 0, }]}>rating scales sent electronically by synapse to the patient automatically, at predetermined intervals.</Text>
                    </>
                ) : null}
                <Text style={styles.itemText}>4. The critical role of these rating scales in their treatment was discussed with the client, and they were instructed to promptly fill out all rating scales sent to them throughout and after their treatment course. The client has been informed that the first set will be sent for completion before the first preparation therapy session</Text>
                <Text style={styles.itemText}>5. Client will schedule a preparation therapy session with this therapist</Text>
                <Text style={styles.itemText}>6. Client has been instructed to contact this therapist with any pressing concerns between therapy sessions.</Text>
                <Text style={styles.itemText}>7. Document any additional recommendations, instructions, or concerns</Text>
                <Text style={styles.synopsisText}>{treatment?.treatmentRecoAddnlComment}</Text>
                <Text style={styles.signTextStyle}>{treatment?.signature}</Text>
                <Text style={styles.nameTitleText}>{treatment?.signedDateTime}</Text>
            </View>
        )
    }

    return (
        <View>
            {renderContent()}
        </View>
    );
};

export default TreatmentSummary;



const styles = StyleSheet.create({

    content: {
        flex: 1,
        paddingHorizontal: responsiveWidth(5),
        paddingTop: responsiveHeight(3)
    },

    nameTitleText: {
        fontSize: responsiveFontSize(1.8),
        fontWeight: '400',
        color: Colors.black,
        marginTop: responsiveHeight(2),
        bottom: Platform.OS === 'ios' ?responsiveHeight(-0.5) : responsiveHeight(-2)
    },

    line: {
        backgroundColor: Colors.light_skyblue,
        height: 1
    },
    headingText: {
        fontSize: responsiveFontSize(2),
        fontWeight: '600',
        color: Colors.black,
        marginTop: responsiveHeight(2)
    },
    itemText: {
        fontSize: responsiveFontSize(1.4),
        fontWeight: '400',
        color: Colors.black,
        marginTop: responsiveHeight(1),
        lineHeight: 15
    },
    synopsisText: {
        fontSize: responsiveFontSize(1.5),
        fontWeight: '600',
        color: '#457EA3',
        marginTop: responsiveHeight(0.3)
    },
    danielText: {
        fontSize: responsiveFontSize(1.5),
        fontWeight: '400',
        color: Colors.blue,
        marginTop: responsiveHeight(1),
        lineHeight: 16
    },

    signTextStyle: {
        marginTop: responsiveHeight(2),
        fontSize: responsiveFontSize(3.2),
        color: '#457EA3',
        fontFamily: Fonts.regular
    },
    flatlistContent: {
        paddingBottom: responsiveWidth(13)
    },
    errorText: {
        color: Colors.red,
        fontSize: responsiveFontSize(2),
    },
    centeredContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    newText: {
        fontWeight: '600',
        fontSize: responsiveFontSize(1.3)
    },
    row: {
        flexDirection: 'row',
        marginTop: responsiveHeight(1)
    }
});

