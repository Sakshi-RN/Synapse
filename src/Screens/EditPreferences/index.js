import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert, TouchableOpacity, FlatList, Modal, Text } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Colors from '../../Themes/Colors';
import CustomHeader from '../../Components/CustomHeader';
import CustomButton from '../../Components/CustomButton';
import CommonInput from '../../Components/CommonInput';
import { useNavigation } from '@react-navigation/native';

const EditPreferences = () => {
    const navigation = useNavigation();
    const [languages, setLanguages] = useState([]);
    const [communicationMethods, setCommunicationMethods] = useState([]);
    const [genders, setGenders] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [selectedCommunicationMethod, setSelectedCommunicationMethod] = useState('');
    const [selectedGender, setSelectedGender] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [modalType, setModalType] = useState('');

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
        navigation.navigate('Preferences');
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
                    onPress={() => openModal('Language')} // Corrected case
                    value={selectedLanguage} // Set selected language
                />
                <CommonInput
                    placeholder={'Select Communication Method'}
                    title={'Please select preferred communication method'}
                    iconName={"chevron-down"}
                    onPress={() => openModal('Communication Method')} // Corrected case
                    value={selectedCommunicationMethod} // Set selected communication method
                />
                <CommonInput
                    placeholder={'Select Gender'}
                    title={'What is your preference for the gender of your therapist?'}
                    iconName={"chevron-down"}
                    onPress={() => openModal('Gender')} // Corrected case
                    value={selectedGender} // Set selected gender
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
                        onPress={handlePreferences} />
                </View>
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
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
        fontWeight: '700',
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
        fontWeight: '500',
    },
    joinText: {
        fontWeight: '500',
    },
    textStyle: {
        fontWeight: '400',
        color: Colors.black,
    },
});
