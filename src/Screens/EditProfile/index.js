
import React, { useCallback, useState, useEffect } from 'react';
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
import { fetchProfile, updateProfile } from '../../redux/Reducers/profileReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import styles from './styles';

const EditProfile = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const [genderOptions, setGenderOptions] = useState([]);
    const [weightOptions, setWeightOptions] = useState([]);
    const [heightOptions, setHeightOptions] = useState([]);
    const [stateOptions, setStateOptions] = useState([]);
    const [selectedGender, setSelectedGender] = useState('');
    const [selectedWeight, setSelectedWeight] = useState('');
    const [selectedHeight, setSelectedHeight] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [modalVisible, setModalVisible] = useState({ gender: false, weight: false, height: false, state: false });
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
    const [clientCurrentWeight, setClientCurrentWeight] = useState('');
    const [phoneError, setPhoneError] = useState('');

    const { data, fetchLoading, fetchError } = useSelector(state => state.profile);

    const profile = data && data[0];


    useFocusEffect(
        useCallback(() => {
            dispatch(fetchProfile());
        }, [dispatch])
    );

    useEffect(() => {
        if (data && data.length > 0) {
            const profile = data[0];
            setFirstName(profile.firstName || '');
            setLastName(profile.lastName || '');
            setEmail(profile.email || '');
            setPhone(profile.phone || '');
            setAddress1(profile.address1 || '');
            setAddress2(profile.address2 || '');
            setCity(profile.city || '');
            setState(profile.state || '');
            setZip(profile.zip || '');
            setClientCurrentWeight(profile.clientCurrentWeight || '');
            setSelectedGender(capitalizeFirstLetter(profile.gender) || '');
            setSelectedWeight(profile.clientCurrentWeight || '');
            setSelectedHeight(profile.clientCurrentHeight || '');
            setSelectedState(profile.state || '');
        }
    }, [data]);



    const fetchOptions = async (url, setOptions) => {
        try {
            const response = await fetch(url, {
                headers: {
                    'X-Api-Key': 'e1693d9245c57be86afc22ad06eda84c9cdb74dae6d56a8a7f71a93facb1f42b',
                },
            });
            if (!response.ok) {
                throw new Error(`Failed to fetch options from ${url}`);
            }
            const data = await response.json();
            console.log(`${url} data:`, data);
            if (Array.isArray(data)) {
                setOptions(data);
            } else {
                console.error(`Fetched data from ${url} is not an array:`, data);
                setOptions([]);
            }
        } catch (error) {
            console.error(`Error fetching options from ${url}:`, error.message);
        }
    };



    const fetchStateOptions = async () => {
        try {
            const response = await fetch('https://eb1.taramind.com/states', {
                headers: {
                    'X-Api-Key': 'e1693d9245c57be86afc22ad06eda84c9cdb74dae6d56a8a7f71a93facb1f42b',
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch states');
            }
            const data = await response.json();
            console.log('States data:', data);
            if (Array.isArray(data)) {
                setStateOptions(data);
            } else {
                console.error('Fetched data is not an array:', data);
                setStateOptions([]);
            }
        } catch (error) {
            console.error('Error fetching states:', error.message);
        }
    };

    useEffect(() => {
        fetchOptions('https://eb1.taramind.com/getLookupMaster/mini-intake/gender', setGenderOptions);
        fetchOptions('https://eb1.taramind.com/getLookupMaster/intake/weight', setWeightOptions);
        fetchOptions('https://eb1.taramind.com/getLookupMaster/intake/height', setHeightOptions);
        fetchStateOptions();
    }, []);

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

    const handleGoBack = () => {
        navigation.goBack();
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
            firstName,
            lastName,
            email,
            phone,
            address1,
            address2,
            city,
            state,
            zip,
            clientCurrentWeight: selectedWeight || clientCurrentWeight,
            gender: selectedGender || capitalizeFirstLetter(data[0]?.gender),
        };

        dispatch(updateProfile(updatedProfile))
            .then(() => navigation.navigate('MyProfileScreen'))
            .catch((error) => console.error('Failed to update profile:', error));
    };

    function capitalizeFirstLetter(value) {
        if (typeof value !== 'string') return '';
        return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    }

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
                            <Text style={styles.profileName}>{`${firstName[0]?.toUpperCase() ?? ''}${lastName[0]?.toUpperCase() ?? ''}`}</Text>
                        </View>
                        <InputContainer
                            placeholder={firstName || 'First Name'}
                            title={'First Name'}
                            titleColor={styles.nametitleStyle}
                            value={firstName}
                            onChangeText={setFirstName}
                        />
                        <InputContainer
                            placeholder={lastName || 'Last Name'}
                            titleColor={styles.nametitleStyle}
                            value={lastName}
                            onChangeText={setLastName}
                            title={'Last Name'}
                        />
                        <InputContainer
                            placeholder={email || 'Email Address'}
                            title={'Email Address'}
                            titleColor={styles.emailTitle}
                            value={email}
                            onChangeText={setEmail}
                        />
                        <InputContainer
                            placeholder={phone || 'Phone Number'}
                            title={'Phone Number'}
                            titleColor={styles.phoneTitle}
                            value={phone}
                            onChangeText={setPhone}
                        />
                        {phoneError ? (
                            <Text style={styles.errorText}>{phoneError}</Text>
                        ) : null}
                        <InputContainer
                            placeholder={selectedGender || 'Gender'}
                            title={'Gender'}
                            titleColor={styles.genderStyle}
                            iconName={"chevron-down"}
                            onPress={() => toggleModal('gender')}
                        />
                        <InputContainer
                            placeholder={profile?.dob || 'MM/DD/YYYY'}
                            title={'Date Of Birthday'}
                            titleColor={styles.dobStyle}
                            editable={false}
                        />
                        <InputContainer
                            placeholder={selectedWeight || clientCurrentWeight || 'Weight (in pounds)'}
                            title={'Weight (in pounds)'}
                            titleColor={styles.weightStyle}
                            iconName={"chevron-down"}
                            onPress={() => toggleModal('weight')}
                            value={clientCurrentWeight}
                            onChangeText={setClientCurrentWeight}
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
                            placeholder={address1 || 'Street Address'}
                            title={'Street Address'}
                            titleColor={styles.streetsStyle}
                            value={address1}
                            onChangeText={setAddress1}
                        />
                        <InputContainer
                            placeholder={address2 || 'Street Address 2'}
                            titleColor={styles.streetsStyle}
                            title={'Street Address 2'}
                            value={address2}
                            onChangeText={setAddress2}
                        />
                        <InputContainer
                            placeholder={city || 'City'}
                            titleColor={styles.cityStyle}
                            title={'City'}
                            value={city}
                            onChangeText={setCity}
                        />
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <InputContainer
                                placeholder={selectedState || profile.state || 'State'}
                                title={'State'}
                                titleColor={styles.stateStyle}
                                inputStyle={styles.stateWidth}
                                iconName={"chevron-down"}
                                onPress={() => toggleModal('state')}
                                value={state}
                            />
                            <InputContainer
                                placeholder={profile.zip || 'Zip Code'}
                                title={'Zip Code'}
                                titleColor={styles.zipCodeStyle}
                                inputStyle={styles.widthStyle}
                                value={zip}
                            />
                        </View>

                    </ScrollView>
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
                                    <ScrollView showsVerticalScrollIndicator={false}>
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
                                    <ScrollView showsVerticalScrollIndicator={false}>
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
                        <Modal
                            visible={modalVisible.state}
                            transparent={true}

                        >
                            <View style={styles.modalContainer}>
                                <View style={styles.modalContent}>
                                    <ScrollView>

                                        {stateOptions.map((state) => (
                                            <TouchableOpacity key={state} onPress={() => handleSelect(state, 'state')}>
                                                <Text style={styles.optionText}>{state}</Text>
                                            </TouchableOpacity>
                                        ))}
                                    </ScrollView>
                                    <CustomButton title="Close" onPress={toggleModal('state')} buttonStyle={styles.closeButton} />

                                </View>
                            </View>
                        </Modal>
                    </>
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

            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};



export default EditProfile;


