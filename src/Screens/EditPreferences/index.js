
import React from 'react';
import { View, StyleSheet, } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Colors from '../../Themes/Colors';
import CustomHeader from '../../Components/CustomHeader';
import CustomButton from '../../Components/CustomButton';
import CommonInput from '../../Components/CommonInput';
import { useNavigation } from '@react-navigation/native';

const EditPreferences = () => {
    const navigation = useNavigation();

    
    const handlePreferences = () => {
      navigation.navigate('Preferences');
  }

  const handleGoBack = () => {
    navigation.goBack();
};
    return (
        <View style={styles.container}>
            <CustomHeader title={'Edit Preferences'} />
            <View style={styles.content}>
                <CommonInput
                    placeholder={'Select Language'}
                    title={'What language would you prefer your therapist to speak?'}
                    iconName={"chevron-down"}
                />
                <CommonInput
                    placeholder={'Select Communication Method'}
                    title={'Please select preferred communication method'}
                    iconName="chevron-down"
                />
                <CommonInput
                    placeholder={'Select Gender'}
                    title={'What is your preference for the gender of your therapist?'}
                    iconName={"chevron-down"}
                />

                <View style={styles.row}>
                    <CustomButton
                        buttonStyle={styles.Button}
                        textStyle={styles.btnText}
                        title={'Cancel'} 
                        onPress={handleGoBack}/>
                    <CustomButton
                        buttonStyle={styles.joinButton}
                        textStyle={styles.joinText}
                        title={'Save'}
                        onPress={handlePreferences} />
                </View>
            </View>
        </View>


    );
};

export default EditPreferences;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    content: {
        flex: 1,
        paddingHorizontal: responsiveWidth(5),
    },

    Button: {
        backgroundColor: Colors.light_skyblue,
        paddingHorizontal: responsiveWidth(15),
    },
    joinButton: {
        paddingHorizontal: responsiveWidth(17),
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

