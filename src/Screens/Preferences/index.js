
import React, { useCallback } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Colors from '../../Themes/Colors';
import CustomHeader from '../../Components/CustomHeader';
import CustomButton from '../../Components/CustomButton';
import CommonStyle from '../../Components/CommonStyle';
import commonStyles from '../../Components/CommonStyle';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { fetchProfile } from '../../redux/Reducers/profileReducer';
import Loader from '../../Components/Loader';

const Preferences = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { data, fetchLoading } = useSelector(state => state.profile);
    useFocusEffect(
        useCallback(() => {
            dispatch(fetchProfile());
        }, [dispatch])
    );
    if (fetchLoading) {
        return (
            <View style={styles.centeredContainer}>
                <Loader />
            </View>
        );
    }
    const profile = data && data[0];

    const handleEditPreferences = () => {
        navigation.navigate('EditPreferences');
    };
    const handleGoBack = () => {
        navigation.goBack();
    };
    return (
        <View style={styles.container}>
            <CustomHeader title={'Preferences'} />
            <View style={styles.content}>
                <View style={CommonStyle.container}>
                    <View style={commonStyles.containerView}>
                        <Text style={CommonStyle.titleText}>Preferred language for providers</Text>
                        <Text style={commonStyles.bodyText}>{profile?.preferredLanguage}</Text>
                    </View>
                    <View style={commonStyles.containerView}>
                        <Text style={CommonStyle.titleText}>Preferred communication method</Text>
                        <Text style={commonStyles.bodyText}>{profile?.commChannel?.join(', ') || 'N/A'}</Text>
                    </View>
                    <View style={commonStyles.bottomView}>
                        <Text style={CommonStyle.titleText}>Preferred gender for therapist</Text>
                        <Text style={commonStyles.bodyText}>{profile?.genderProviderPreference}</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <CustomButton
                        buttonStyle={styles.Button}
                        textStyle={styles.btnText}
                        title={'Back'}
                        onPress={handleGoBack} />
                    <CustomButton
                        buttonStyle={styles.joinButton}
                        textStyle={styles.joinText}
                        title={'Edit Info'}
                        onPress={handleEditPreferences}
                    />
                </View>
            </View>
        </View>


    );
};

export default Preferences;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    content: {
        flex: 1,
        paddingHorizontal: responsiveWidth(5),
        paddingTop: responsiveHeight(3)
    },

    Button: {
        backgroundColor: Colors.light_skyblue,
        paddingHorizontal: responsiveWidth(15),
    },
    joinButton: {
        paddingHorizontal: responsiveWidth(15),
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: responsiveHeight(3)

    },

    btnText: {
        color: Colors.blue,
        fontWeight: '500',
    },
    joinText: {
        fontWeight: '500',
    },
    centeredContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

