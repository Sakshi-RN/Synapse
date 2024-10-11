import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    TouchableWithoutFeedback,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    Modal,
    TouchableOpacity,
} from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import Colors from '../../Themes/Colors';
import CustomHeader from '../../Components/CustomHeader';
import CustomButton from '../../Components/CustomButton';
import InputContainer from '../../Components/InputContainer';
import { useNavigation } from '@react-navigation/native';

const EditProfile = () => {
    const navigation = useNavigation();

    // State variables
    const [genderOptions, setGenderOptions] = useState([]);
    const [weightOptions, setWeightOptions] = useState([]);
    const [heightOptions, setHeightOptions] = useState([]);
    const [stateOptions, setStateOptions] = useState([]);
    const [selectedGender, setSelectedGender] = useState('');
    const [selectedWeight, setSelectedWeight] = useState('');
    const [selectedHeight, setSelectedHeight] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [modalVisible, setModalVisible] = useState({ gender: false, weight: false, height: false, state: false });

    // API Call functions
    const fetchGender = async () => {
        const response = await fetch('https://eb1.taramind.com/getLookupMaster/mini-intake/gender', {
            headers: {
                'X-Api-Key': 'e1693d9245c57be86afc22ad06eda84c9cdb74dae6d56a8a7f71a93facb1f42b',
            },
        });
        const data = await response.json();
        setGenderOptions(data[0].lookupMasterValueDesc.split(', '));
    };

    const fetchWeight = async () => {
        const response = await fetch('https://eb1.taramind.com/getLookupMaster/intake/weight', {
            headers: {
                'X-Api-Key': 'e1693d9245c57be86afc22ad06eda84c9cdb74dae6d56a8a7f71a93facb1f42b',
            },
        });
        const data = await response.json();
        setWeightOptions(data[0].lookupMasterValueDesc.split(', '));
    };

    const fetchHeight = async () => {
        const response = await fetch('https://eb1.taramind.com/getLookupMaster/intake/height', {
            headers: {
                'X-Api-Key': 'e1693d9245c57be86afc22ad06eda84c9cdb74dae6d56a8a7f71a93facb1f42b',
            },
        });
        const data = await response.json();
        setHeightOptions(data[0].lookupMasterValueDesc.split(', '));
    };

    const fetchStates = async () => {
        const response = await fetch('https://eb1.taramind.com/states', {
            headers: {
                'X-Api-Key': 'e1693d9245c57be86afc22ad06eda84c9cdb74dae6d56a8a7f71a93facb1f42b',
            },
        });
        const data = await response.json();
        setStateOptions(Object.keys(data));
    };

    useEffect(() => {
        fetchGender();
        fetchWeight();
        fetchHeight();
        fetchStates();
    }, []);

    // Handle modal visibility
    const toggleModal = (type) => {
        setModalVisible((prev) => ({ ...prev, [type]: !prev[type] }));
    };

    const handleSelect = (value, type) => {
        switch (type) {
            case 'gender':
                setSelectedGender(value);
                break;
            case 'weight':
                setSelectedWeight(value);
                break;
            case 'height':
                setSelectedHeight(value);
                break;
            case 'state':
                setSelectedState(value);
                break;
            default:
                break;
        }
        toggleModal(type);
    };

    const handleMyProfileScreen = () => {
        navigation.navigate('MyProfileScreen');
    };

    const handleGoBack = () => {
        navigation.goBack();
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <CustomHeader title={'Edit Profile'} />
                    <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                        <View style={styles.profileContainer}>
                            <Text style={styles.profileName}>NK</Text>
                        </View>
                        <InputContainer
                            placeholder={'Full Name'}
                            title={'Name'}
                            titleColor={styles.nametitleStyle}
                        />
                        <InputContainer
                            placeholder={'Email Address'}
                            title={'Email Address'}
                            titleColor={styles.emailTitle}
                        />
                        <InputContainer
                            placeholder={'Phone Number'}
                            title={'Phone Number'}
                            titleColor={styles.phoneTitle}
                        />
                        <InputContainer
                            placeholder={selectedGender || 'Male'}
                            title={'Gender'}
                            titleColor={styles.genderStyle}
                            iconName={"chevron-down"}
                            onPress={() => toggleModal('gender')}
                        />
                        <InputContainer
                            placeholder={'MM/DD/YYYY'}
                            title={'Date Of Birthday'}
                            titleColor={styles.dobStyle}
                        />
                        <InputContainer
                            placeholder={selectedWeight || 'Weight (in pounds)'}
                            title={'Weight (in pounds)'}
                            titleColor={styles.weightStyle}
                            iconName={"chevron-down"}
                            onPress={() => toggleModal('weight')}
                        />
                        <InputContainer
                            placeholder={selectedHeight || 'Height (in feet)'}
                            title={'Height (in feet)'}
                            titleColor={styles.heightStyle}
                            iconName={"chevron-down"}
                            onPress={() => toggleModal('height')}
                        />
                        <Text style={styles.name}>Address</Text>
                        <InputContainer
                            placeholder={'Street Address'}
                            title={'Street Address'}
                            titleColor={styles.streetsStyle}
                        />
                        <InputContainer
                            placeholder={'Address 2'}
                            title={'Address 2'}
                            titleColor={styles.addressStyle}
                        />
                        <InputContainer
                            placeholder={'City'}
                            title={'City'}
                            titleColor={styles.cityStyle}
                        />
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <InputContainer
                                placeholder={selectedState || 'State'}
                                title={'State'}
                                titleColor={styles.stateStyle}
                                inputStyle={styles.stateWidth}
                                iconName={"chevron-down"}
                                onPress={() => toggleModal('state')}
                            />
                            <InputContainer
                                placeholder={'Zip Code'}
                                title={'Zip Code'}
                                titleColor={styles.zipCodeStyle}
                                inputStyle={styles.widthStyle}
                            />
                        </View>
                    </ScrollView>
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
                            onPress={handleMyProfileScreen} />
                    </View>
                </View>
            </TouchableWithoutFeedback>

   <>
   <Modal transparent={true} visible={modalVisible.gender}>
           <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
        {genderOptions.map((gender) => (
            <TouchableOpacity key={gender} onPress={() => handleSelect(gender, 'gender')}>
                <Text style={styles.modalText}>{gender}</Text>
            </TouchableOpacity>
        ))}
        <CustomButton title="Close" onPress={() => toggleModal('gender')} buttonStyle={styles.closeButton} />
        </View>
    </View>
</Modal>

<Modal transparent={true} visible={modalVisible.weight}>
           <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                    <ScrollView showsVerticalScrollIndicator ={false}>
        {weightOptions.map((weight) => (
            <TouchableOpacity key={weight} onPress={() => handleSelect(weight, 'weight')}>
                <Text style={styles.modalText}>{weight}</Text>
            </TouchableOpacity>
        ))}
            </ScrollView>
        <CustomButton title="Close" onPress={() => toggleModal('weight')} buttonStyle={styles.closeButton} />
        </View>
    </View>
</Modal>

<Modal transparent={true} visible={modalVisible.height}>
           <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                    <ScrollView showsVerticalScrollIndicator ={false}>
        {heightOptions.map((height) => (
            <TouchableOpacity key={height} onPress={() => handleSelect(height, 'height')}>
                <Text style={styles.modalText}>{height}</Text>
            </TouchableOpacity>
        ))}
            </ScrollView>
        <CustomButton title="Close" onPress={() => toggleModal('height')} buttonStyle={styles.closeButton} />
        </View>
    </View>
</Modal>

<Modal transparent={true} visible={modalVisible.state}>
           <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <ScrollView showsVerticalScrollIndicator ={false}>
        {stateOptions.map((state) => (
            <TouchableOpacity key={state} onPress={() => handleSelect(state, 'state')}>
                <Text style={styles.modalText}>{state}</Text>
            </TouchableOpacity>
        ))}
        </ScrollView>
        <CustomButton title="Close" onPress={() => toggleModal('state')} buttonStyle={styles.closeButton} />
        </View>
    </View>
</Modal>

   </>
        </KeyboardAvoidingView>
    );
};

export default EditProfile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        paddingBottom: Platform.OS === 'ios' ? responsiveHeight(14) : responsiveHeight(7)
    },
    content: {
        paddingHorizontal: responsiveWidth(5),
    },
    Button: {
        backgroundColor: Colors.light_skyblue,
        paddingHorizontal: responsiveWidth(16),
    },
    joinButton: {
        paddingHorizontal: responsiveWidth(16),
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: responsiveWidth(5),
        marginTop: responsiveHeight(2)
    },
    btnText: {
        color: Colors.blue,
        fontWeight: '500',
    },
    joinText: {
        fontWeight: '500',
    },
    name: {
        fontSize: responsiveFontSize(1.6),
        fontWeight: 'bold',
        color: Colors.black,
        marginTop: responsiveHeight(1),
    },
    titleStyle: {
        fontSize: responsiveFontSize(1.6),
        color: Colors.black
    },
    profileContainer: {
        backgroundColor: Colors.blue,
        width: 60,
        height: 60,
        borderRadius: 30,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: responsiveHeight(3)
    },
    profileName: {
        color: Colors.white,
        fontWeight: '400',
        fontSize: responsiveFontSize(2.5)
    },
    nametitleStyle: {
        width: responsiveWidth(14),
    },
    emailTitle: {
        width: responsiveWidth(26.5),
    },
    phoneTitle: {
        width: responsiveWidth(27),
    },
    genderStyle: {
        width: responsiveWidth(16),
    },
    dobStyle: {
        width: responsiveWidth(30),
    },
    weightStyle: {
        width: responsiveWidth(33),
    },
    heightStyle: {
        width: responsiveWidth(28),
    },
    streetsStyle: {
        width: responsiveWidth(27),
    },
    addressStyle: {
        width: responsiveWidth(20),
    },
    cityStyle: {
        width: responsiveWidth(10.5),
    },
    stateStyle: {
        width: responsiveWidth(12.5),
    },
    zipCodeStyle: {
        width: responsiveWidth(18),
    },
    widthStyle: {
        width: responsiveWidth(45),
    },
    stateWidth: {
        width: responsiveWidth(42)
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        paddingVertical:responsiveHeight(5)
    },
    modalContent: {
        width: responsiveWidth(90),
        backgroundColor: Colors.white,
        borderRadius: 10,
        padding: 8,
        alignItems: 'center',
        paddingVertical:responsiveHeight(5)
    },
    modalText: {
        fontSize: responsiveFontSize(2),
        fontWeight: '600',
        marginTop:responsiveHeight(3),
        textAlign:'center'
    },
    closeButton: {
        marginTop: responsiveHeight(3),

    },
});
