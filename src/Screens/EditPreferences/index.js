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

const EditPreferences = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [languages, setLanguages] = useState([]);
    const [communicationMethods, setCommunicationMethods] = useState([]);
    const [genders, setGenders] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [selectedCommunicationMethod, setSelectedCommunicationMethod] = useState('');
    const [selectedGender, setSelectedGender] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [modalType, setModalType] = useState('');
    const [loading, setLoading] = useState(false);

    const { data, error } = useSelector(state => state.profile);
    const profile = data && data[0];

    useFocusEffect(
        useCallback(() => {
            dispatch(fetchProfile());
        }, [dispatch])
    );

    useEffect(() => {
        if (profile) {
            setSelectedCommunicationMethod(profile.commChannel[0] || '');
            setSelectedGender(profile.genderProviderPreference[0] || '');
            setSelectedLanguage(profile.preferredLanguage || '');
        }
    }, [profile]);
    
    useEffect(() => {
        fetchOptions();
    }, []);

    const fetchOptions = async () => {
        const headers = {
            'X-Api-Key': 'e1693d9245c57be86afc22ad06eda84c9cdb74dae6d56a8a7f71a93facb1f42b',
        };

        try {
            const languageResponse = await fetch('https://eb1.taramind.com/getLookupMaster/mini-intake/language', { headers });
            const languageData = await languageResponse.json();
            setLanguages(languageData[0].lookupMasterValueDesc.split(', '));

            const communicationResponse = await fetch('https://eb1.taramind.com/getLookupMaster/mini-intake/communication', { headers });
            const communicationData = await communicationResponse.json();
            setCommunicationMethods(communicationData[0].lookupMasterValueDesc.split(', '));

            const genderResponse = await fetch('https://eb1.taramind.com/getLookupMaster/mini-intake/genderpreference', { headers });
            const genderData = await genderResponse.json();
            setGenders(genderData[0].lookupMasterValueDesc.split(', '));
        } catch (error) {
            Alert.alert('Error', 'Failed to fetch data. Please try again.');
        }
    };

    const handlePreferences = () => {
        const updatedProfile = {
            clientId: profile.clientID,
            preferredLanguage: selectedLanguage || profile.preferredLanguage,
            commChannel: [selectedCommunicationMethod || profile.commChannel[0]],
            genderProviderPreference: [selectedGender || profile.genderProviderPreference[0]],
         
        };

        setLoading(true);
        dispatch(updateProfile(updatedProfile))
            .then(() => {
                setLoading(false); 
                navigation.navigate('Preferences');
            })
            .catch((error) => {
                setLoading(false);
                Alert.alert('Error', 'Failed to update profile. Please try again.');
            });
    };

    const handleGoBack = () => {
        navigation.goBack();
    };

    const openModal = (type) => {
        setModalType(type);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const renderDropdownItem = (item) => (
        <TouchableOpacity
            key={item}
            onPress={() => {
                if (modalType === 'Language') {
                    setSelectedLanguage(item);
                } else if (modalType === 'Communication Method') {
                    setSelectedCommunicationMethod(item);
                } else if (modalType === 'Gender') {
                    setSelectedGender(item);
                }
                closeModal();
            }}
            style={styles.dropdownItem}
        >
            <Text style={styles.textStyle}>{item}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <CustomHeader title={'Edit Preferences'} />
            <View style={styles.content}>
                <CommonInput
                    placeholder={'Select Language'}
                    title={'What language would you prefer your therapist to speak?'}
                    iconName={"chevron-down"}
                    onPress={() => openModal('Language')}
                    value={selectedLanguage}
                />
                <CommonInput
                    placeholder={'Select Communication Method'}
                    title={'Please select preferred communication method'}
                    iconName={"chevron-down"}
                    onPress={() => openModal('Communication Method')}
                    value={selectedCommunicationMethod}
                />
                <CommonInput
                    placeholder={'Select Gender'}
                    title={'What is your preference for the gender of your therapist?'}
                    iconName={"chevron-down"}
                    onPress={() => openModal('Gender')}
                    value={selectedGender}
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
                        onPress={handlePreferences}
                    />
                </View>
                {loading && (
                    <View style={styles.centeredContainer}>
                        <Loader />
                    </View>
                )}
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>{`Select ${modalType}`}</Text>
                        <FlatList
                            data={modalType === 'Language' ? languages : modalType === 'Communication Method' ? communicationMethods : genders}
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
    dropdownItem: {
        padding: 6,
        alignItems: 'center',
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
        fontSize: responsiveFontSize(2),
        fontFamily: Fonts.Semibold700,
        marginBottom: 10,
    },
    closeButton: {
        marginTop: responsiveHeight(2),
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
    textStyle: {
        fontFamily: Fonts.Light400,
        color: Colors.black,
    },
    centeredContainer: {
        flex: 1,
        marginTop: responsiveHeight(5)
    },
});
