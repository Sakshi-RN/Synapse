
import React, { useCallback, useState, useEffect } from 'react';
import { View, StyleSheet, Alert, TouchableOpacity, FlatList, Modal, Text } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Colors from '../../Themes/Colors';
import CustomHeader from '../../Components/CustomHeader';
import CustomButton from '../../Components/CustomButton';
import CommonInput from '../../Components/CommonInput';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { updateProfile, fetchProfile } from '../../redux/Reducers/profileReducer';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../Components/Loader';
import { Fonts } from '../../Themes/fonts';

const EditEmergencyContacts = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [relationships, setRelationships] = useState([]);
    const [selectedRelation, setSelectedRelation] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const [phoneError, setPhoneError] = useState('');

    const { data, error } = useSelector(state => state.profile);
    const profile = data && data[0];

    useFocusEffect(
        useCallback(() => {
            dispatch(fetchProfile());
        }, [dispatch])
    );

    useEffect(() => {
        if (profile) {
            setFirstName(profile.emergencyContactFirstName || '');
            setLastName(profile.emergencyContactLastName || '');
            setSelectedRelation(profile.emergencyContactRelation || '');
            setPhone(profile.emergencyContactPhone || '');
        }
    }, [profile]);

    useEffect(() => {
        fetchRelationships();
    }, []);

    const fetchRelationships = async () => {
        const headers = {
            'X-Api-Key': 'e1693d9245c57be86afc22ad06eda84c9cdb74dae6d56a8a7f71a93facb1f42b',
        };

        try {
            const response = await fetch('https://eb1.taramind.com/getLookupMaster/intake/relationship', { headers });
            const data = await response.json();
            setRelationships(data[0].lookupMasterValueDesc.split(', '));
        } catch (error) {
            Alert.alert('Error', 'Failed to fetch data. Please try again.');
        }
    };

    const handleSave = () => {
        const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
        if (!phoneRegex.test(phone)) {
            setPhoneError('Phone number must be in the format (XXX) XXX-XXXX');
            return;
        } else {
            setPhoneError('');
        }
        const updatedProfile = {
            clientId: profile.clientID,
            emergencyContactFirstName: firstName,
            emergencyContactLastName: lastName,
            emergencyContactPhone: phone,
            emergencyContactRelation: selectedRelation || profile.emergencyContactRelation,
        };

        setLoading(true);
        dispatch(updateProfile(updatedProfile))
            .then(() => {
                setLoading(false); 
                navigation.goBack();
            })
            .catch((error) => {
                setLoading(false);
                Alert.alert('Error', 'Failed to update profile. Please try again.');
            });
    };

    const handleGoBack = () => {
        navigation.goBack();
    };

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const renderDropdownItem = (item) => (
        <TouchableOpacity
            key={item}
            onPress={() => {
                setSelectedRelation(item);
                closeModal(); 
            }}
            style={styles.dropdownItem}
        >
          <Text style={styles.textStyle}>{item}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <CustomHeader title={'Edit Emergency Contacts'} />
            <View style={styles.content}>
                <CommonInput
                    placeholder={'First Name'}
                    title={'Emergency Contact First Name'}
                    value={firstName}
                    onChangeText={setFirstName}
                />
                <CommonInput
                    placeholder={'Last Name'}
                    title={'Emergency Contact Last Name'}
                    value={lastName}
                    onChangeText={setLastName}
                />
                <CommonInput
                    placeholder={'Phone Number'}
                    title={'Emergency Contact Phone Number'}
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                />
                {phoneError ? (
                    <Text style={styles.errorText}>{phoneError}</Text>
                ) : null}

                <CommonInput
                    placeholder={'Select Relation'}
                    title={'What is your Emergency contact relation to you?'}
                    iconName={"chevron-down"}
                    onPress={openModal} 
                    value={selectedRelation}
                />
                <View style={styles.row}>
                    <CustomButton
                        buttonStyle={styles.Button}
                        textStyle={styles.btnText}
                        title={'Cancel'}
                        onPress={handleGoBack} />
                    <CustomButton
                        buttonStyle={styles.joinButton}
                        textStyle={styles.joinText}
                        title={'Save'}
                        onPress={handleSave} />
                </View>
            </View>
            {loading && (
                <View style={styles.centeredContainer}>
                    <Loader />
                </View>
            )}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Select Relation</Text>
                        <FlatList
                            data={relationships}
                            renderItem={({ item }) => renderDropdownItem(item)}
                            keyExtractor={(item) => item}
                        />
                        <CustomButton title="Close" onPress={closeModal} buttonStyle={styles.closeButton} />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default EditEmergencyContacts;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    content: {
        flex: 1,
        paddingHorizontal: responsiveWidth(5),
    },
    dropdownItem: {
        padding:6,
        alignItems:'center'
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    },
    modalContent: {
        width: responsiveWidth(90),
        backgroundColor: Colors.white,
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize:responsiveFontSize(2),
        fontFamily: Fonts.Semibold700,
        marginBottom: 10,
    },
    closeButton: {

        marginTop:responsiveHeight(3),
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
        marginTop: responsiveHeight(3),
    },
    btnText: {
        color: Colors.blue,
        fontFamily: Fonts.Medium600,
    },
    joinText: {
        fontFamily: Fonts.Semibold700,
    },
    textStyle:{
        fontFamily: Fonts.Light400,
        color:Colors.black
    },
    centeredContainer: {
        flex: 1,
        marginTop: responsiveHeight(5)
    },
    errorText: {
        fontSize: responsiveFontSize(1.6),
        fontFamily: Fonts.Medium600,
        marginTop: responsiveHeight(1),
        color: Colors.red
    },
});
