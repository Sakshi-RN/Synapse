

import React, { useCallback } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import Colors from '../../Themes/Colors';
import CustomHeader from '../../Components/CustomHeader';
import CustomButton from '../../Components/CustomButton';
import CommonStyle from '../../Components/CommonStyle';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { fetchProfile } from '../../redux/Reducers/profileReducer'; 
import Loader from '../../Components/Loader';


const MyProfileScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { data, fetchLoading, fetchError } = useSelector(state => state.profile);

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

    if (fetchError) {
        return (
            <View style={styles.centeredContainer}>
            <Text style={styles.errorText}>Failed to load data. Please try again later.</Text>
        </View>
        );
    }


    const profile = data && data[0];

    if (!profile) {
        return (
            <View style={styles.centeredContainer}>
            <Text style={styles.errorText}>No profile data available.</Text>
        </View>
        );
    }

    const handleEditProfile = () => {
        navigation.navigate('EditProfile');
    };

    const handleGoBack = () => {
        navigation.goBack();
    };
    function capitalizeFirstLetter(value) {
        if (typeof value !== 'string') return '';
        return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    }

  

function parseDate(dobString) {
    const parts = dobString.split('/');
    return new Date(`${parts[2]}-${parts[0]}-${parts[1]}`); 
}


function formatDate(dobString) {
    const birthDate = parseDate(dobString);
    if (isNaN(birthDate.getTime())) {
        return 'Invalid Date';
    }

    const options = { month: 'short' };  
    const month = birthDate.toLocaleString('en-US', options);
    const day = String(birthDate.getDate()).padStart(2, '0'); 
    const year = birthDate.getFullYear(); 

    return `${month}-${day}-${year}`; 
}

    
    function calculateAge(birthDateString) {
        if (!birthDateString) {
            return 'N/A'; 
        }
    
        const birthDate = parseDate(birthDateString);
        if (isNaN(birthDate.getTime())) {
            return 'Invalid Date'; 
        }
    
        const currentDate = new Date();
        let age = currentDate.getFullYear() - birthDate.getFullYear();
        const monthDifference = currentDate.getMonth() - birthDate.getMonth();
    
        if (
            monthDifference < 0 ||
            (monthDifference === 0 && currentDate.getDate() < birthDate.getDate())
        ) {
            age--;
        }
    
        return age;
    }
    
    const age = calculateAge(profile.dob);
  
    return (
        <View style={styles.container}>
            <CustomHeader title={'My Profile'} />
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.containerBox}>
                    <View style={styles.containerView}>
                        <Text style={CommonStyle.nameTitleText}>Name</Text>
                        <Text style={styles.bodyText}>{`${profile.firstName} ${profile.lastName}`}</Text>
                    </View>
                    <View style={styles.line} />

                    <View style={styles.containerView}>
                        <Text style={CommonStyle.nameTitleText}>Email Address</Text>
                        <Text style={[styles.bodyText,{width:responsiveWidth(45),textAlign:'center'}]}>{profile.email}</Text>
                    </View>
                    <View style={styles.line} />

                    <View style={styles.containerView}>
                        <Text style={CommonStyle.nameTitleText}>Phone Number</Text>
                        <Text style={styles.bodyText}>{profile.phone}</Text>
                    </View>
                    <View style={styles.line} />

                    <View style={styles.containerView}>
                        <Text style={CommonStyle.nameTitleText}>Address Line 1</Text>
                        <Text style={styles.bodyText}>{profile.address1}</Text>
                    </View>
                    <View style={styles.line} />

                    <View style={styles.containerView}>
                        <Text style={CommonStyle.nameTitleText}>Address Line 2</Text>
                        <Text style={styles.bodyText}>{profile.address2 || 'N/A'}</Text>
                    </View>
                    <View style={styles.line} />

                    <View style={styles.containerView}>
                        <Text style={CommonStyle.nameTitleText}>City</Text>
                        <Text style={styles.bodyText}>{profile.city}</Text>
                    </View>
                    <View style={styles.line} />

                    <View style={styles.containerView}>
                        <Text style={CommonStyle.nameTitleText}>State</Text>
                        <Text style={styles.bodyText}>{profile.state}</Text>
                    </View>
                    <View style={styles.line} />

                    <View style={styles.containerView}>
                        <Text style={CommonStyle.nameTitleText}>Zip Code</Text>
                        <Text style={styles.bodyText}>{profile.zip}</Text>
                    </View>
                    <View style={styles.line} />

                    <View style={styles.containerView}>
                        <Text style={CommonStyle.nameTitleText}>Date Of Birth</Text>
                        <Text style={styles.bodyText}>{formatDate(profile.dob)}</Text>
                    </View>
                    <View style={styles.line} />
                    <View style={styles.containerView}>
                        <Text style={CommonStyle.nameTitleText}>Age</Text>
                        <Text style={styles.bodyText}>{age}</Text> 
                    </View>
                    <View style={styles.line} />
                    <View style={styles.containerView}>
                        <Text style={CommonStyle.nameTitleText}>Gender</Text>
                        <Text style={styles.bodyText}>{capitalizeFirstLetter(profile?.gender)}</Text>
                    </View>
                    <View style={styles.line} />

                    <View style={styles.containerView}>
                        <Text style={CommonStyle.nameTitleText}>Weight (in pounds)</Text>
                        <Text style={styles.bodyText}>{profile.clientCurrentWeight} lbs</Text>
                    </View>
                </View>
            </ScrollView>

            <View style={styles.row}>
                <CustomButton
                    buttonStyle={styles.Button}
                    textStyle={styles.btnText}
                    title={'Back'} 
                    onPress={handleGoBack}
                />
                <CustomButton
                    buttonStyle={styles.joinButton}
                    textStyle={styles.joinText}
                    title={'Edit Info'}
                    onPress={handleEditProfile} 
                />
            </View>
        </View>
    );
};

export default MyProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        paddingBottom: responsiveHeight(14),
    },
    content: {
        flex: 1,
        paddingHorizontal: responsiveWidth(5),
        paddingTop: responsiveHeight(3),
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
        marginTop: responsiveHeight(3),
        marginHorizontal: responsiveWidth(5),
    },
    btnText: {
        color: Colors.blue,
        fontWeight: '500',
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
        marginBottom: responsiveHeight(4),
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
        // backgroundColor:'red',
      
    },
    line: {
        backgroundColor: Colors.light_skyblue,
        height: 1,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.white,
    },
    errorText: {
        color: Colors.red,
        fontSize: responsiveFontSize(2),
    },
    centeredContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

});
