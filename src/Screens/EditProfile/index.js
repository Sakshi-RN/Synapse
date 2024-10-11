
import React, { useCallback, useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableWithoutFeedback,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    Modal,
} from 'react-native';
import CustomHeader from '../../Components/CustomHeader';
import CustomButton from '../../Components/CustomButton';
import InputContainer from '../../Components/InputContainer';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import styles from './styles';
import { updateProfile } from '../../redux/Reducers/profileReducer';
import HeightList from '../../Components/HeightList';
import StateList from '../../Components/StateList';
import WeightList from '../../Components/WeightList';
import GenderList from '../../Components/GenderList';

const EditProfile = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

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
    const [zip, setZip] = useState('');
    const [clientCurrentWeight, setClientCurrentWeight] = useState('');
    const [phoneError, setPhoneError] = useState('');

    const { data } = useSelector(state => state.profile);
    const profile = data && data[0];

    useFocusEffect(
        useCallback(() => {
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
            setZip(profile.zip || '');
            setClientCurrentWeight(profile.clientCurrentWeight || '');
            setSelectedGender(capitalizeFirstLetter(profile?.gender) || '');
            setSelectedWeight(profile.clientCurrentWeight || '');
            setSelectedHeight(profile.clientCurrentHeight || '');
            setSelectedState(profile.state || '');
        }
    }, [data]);

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
            zip,
            clientCurrentWeight: selectedWeight || clientCurrentWeight,
            gender: selectedGender,
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
                            value={selectedWeight}
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
                                placeholder={selectedState || 'State'}
                                title={'State'}
                                titleColor={styles.stateStyle}
                                inputStyle={styles.stateWidth}
                                iconName={"chevron-down"}
                                value={selectedState}
                                onPress={() => toggleModal('state')}
                            />
                            <InputContainer
                                placeholder={zip || 'Zip Code'}
                                title={'Zip Code'}
                                titleColor={styles.zipCodeStyle}
                                inputStyle={styles.widthStyle}
                                value={zip}
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
                            onPress={handleSave} />
                    </View>

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible.gender}
                        onRequestClose={() => toggleModal('gender')}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalText}>Select Gender</Text>
                                <ScrollView showsVerticalScrollIndicator={false}>
                                <GenderList onSelect={(value) => handleSelect(value, 'gender')} />
                                </ScrollView>
                                <CustomButton title="Close" onPress={() => toggleModal('gender')} buttonStyle={styles.closeButton}/>
                            </View>
                        </View>
                    </Modal>

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible.weight}
                        onRequestClose={() => toggleModal('weight')}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalText}>Select Weight</Text>
                                <ScrollView showsVerticalScrollIndicator={false}>
                                <WeightList onSelect={(value) => handleSelect(value, 'weight')} />
                                </ScrollView>
                                <CustomButton title="Close" onPress={() => toggleModal('weight')} buttonStyle={styles.closeButton} />
                            </View>
                        </View>
                    </Modal>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible.height}
                        onRequestClose={() => toggleModal('height')}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalText}>Select Height</Text>
                                <ScrollView showsVerticalScrollIndicator={false}>
                                <HeightList onSelect={(value) => handleSelect(value, 'height')} />
                                </ScrollView>
                                <CustomButton title="Close" onPress={() => toggleModal('height')} buttonStyle={styles.closeButton}/>
                            </View>
                        </View>
                    </Modal>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible.state}
                        onRequestClose={() => toggleModal('state')}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalText}>Select State</Text>
                                <ScrollView showsVerticalScrollIndicator={false}>
                                <StateList onSelect={(value) => handleSelect(value, 'state')} />
                                </ScrollView>
                                <CustomButton title="Close" onPress={() => toggleModal('state')} buttonStyle={styles.closeButton}/>
                            </View>
                        </View>
                    </Modal>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

export default EditProfile;
