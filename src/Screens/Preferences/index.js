
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Colors from '../../Themes/Colors';
import CustomHeader from '../../Components/CustomHeader';
import CustomButton from '../../Components/CustomButton';
import CommonStyle from '../../Components/CommonStyle';
import commonStyles from '../../Components/CommonStyle';
import { useNavigation } from '@react-navigation/native';

const Preferences = () => {
    const navigation = useNavigation();

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
                        <Text style={CommonStyle.titleText}>What language would you prefer your therapist to speak?</Text>
                        <Text style={commonStyles.bodyText}>English</Text>
                    </View>
                    <View style={commonStyles.containerView}>
                        <Text style={CommonStyle.titleText}>Please select preferred communication method</Text>
                        <Text style={commonStyles.bodyText}>Email</Text>
                    </View>
                    <View style={commonStyles.bottomView}>
                        <Text style={CommonStyle.titleText}>What is your preference for the gender of your therapist?</Text>
                        <Text style={commonStyles.bodyText}>Male</Text>
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
    }
});

