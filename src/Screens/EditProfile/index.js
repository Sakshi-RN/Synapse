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
import { updateProfile, fetchProfile } from '../../redux/Reducers/profileReducer';
import HeightList from '../../Components/HeightList';
import StateList from '../../Components/StateList';
import WeightList from '../../Components/WeightList';
import GenderList from '../../Components/GenderList';
import Loader from '../../Components/Loader';

const EditProfile = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [isEditable, setIsEditable] = useState({
        firstName: false,
        lastName: false,
        email: false,
        phone: false,
        address1: false,
        address2: false,
        city: false,
        zip: false,
    });
    const toggleEditable = (field) => {
        console.log('Toggling edit for:', field); // Log the field being toggled
        setIsEditable((prev) => {
            const updated = { ...prev, [field]: !prev[field] };
            console.log('Updated isEditable:', updated); // Log the updated state
            return updated;
        });
    };


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
            setFirstName(profile.firstName || '');
            setLastName(profile.lastName || '');
            setEmail(profile.email || '');
            setPhone(profile.phone || '');
            setAddress1(profile.address1 || '');
            setAddress2(profile.address2 || '');
            setCity(profile.city || '');
            setZip(profile.zip || '');
            setClientCurrentWeight(profile.clientCurrentWeight || '');
            setSelectedGender(capitalizeFirstLetter(profile.gender) || '');
            setSelectedWeight(profile.clientCurrentWeight || '');
            setSelectedHeight(profile.clientCurrentHeight || '');
            setSelectedState(profile.state || '');
        }
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
            state: selectedState,
            zip,
            clientCurrentWeight: selectedWeight || clientCurrentWeight,
            gender: selectedGender || capitalizeFirstLetter(profile.gender),
            clientCurrentHeight: selectedHeight || profile.clientCurrentHeight,
        };

        setLoading(true);
        dispatch(updateProfile(updatedProfile))
            .then(() => {
                setLoading(false);
                handleGoBack();
            })
            .catch((error) => {
                setLoading(false);
                console.error('Failed to update profile:', error);
            });

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
                            <Text style={styles.profileName}>
                                {`${firstName.charAt(0)?.toUpperCase() || ''}${lastName.charAt(0)?.toUpperCase() || ''}`}
                            </Text>
                        </View>

                        {loading && (
                            <View style={styles.centeredContainer}>
                                <Loader />
                            </View>
                        )}
                        <InputContainer
                            placeholder="First Name"
                            title={'First Name'}
                            value={firstName}
                            onChangeText={setFirstName}
                            keyboardType="default"
                            autoCapitalize="words"
                            iconName={"edit"}
                            editable={isEditable.firstName}
                            onPress={() => toggleEditable('firstName')}

                        />
                        <InputContainer
                            placeholder="Last Name"
                            title={'Last Name'}
                            value={lastName}
                            onChangeText={setLastName}
                            keyboardType="default"
                            autoCapitalize="words"
                            iconName={"edit"}
                            editable={isEditable.lastName}
                            onPress={() => toggleEditable('lastName')}
                        />
                        <InputContainer
                            placeholder="Email Address"
                            title={'Email Address'}
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            iconName={"edit"}
                            editable={isEditable.email}
                            onPress={() => toggleEditable('email')}
                        />
                        <InputContainer
                            placeholder="(XXX) XXX-XXXX"
                            title={'Phone Number'}
                            value={phone}
                            onChangeText={setPhone}
                            keyboardType="phone-pad"
                            iconName={"edit"}
                            editable={isEditable.phone}
                            onPress={() => toggleEditable('phone')}

                        />
                        {phoneError ? (
                            <Text style={styles.errorText}>{phoneError}</Text>
                        ) : null}
                        <InputContainer
                            placeholder="Select Gender"
                            title={'Gender'}
                            iconName={"chevron-down"}
                            value={selectedGender}
                            onPress={() => toggleModal('gender')}
                            editable={false}
                        />
                        <InputContainer
                            placeholder={profile?.dob || 'MM/DD/YYYY'}
                            title={'Date Of Birth'}
                            titleColor={styles.dobStyle}
                            editable={false}
                        />
                        <InputContainer
                            placeholder="Select Weight"
                            title={'Weight (in pounds)'}
                            iconName={"chevron-down"}
                            value={selectedWeight}
                            onPress={() => toggleModal('weight')}
                            editable={false}
                        />
                        <InputContainer
                            placeholder="Select Height"
                            title={'Height (in feet)'}
                            iconName={"chevron-down"}
                            value={selectedHeight}
                            onPress={() => toggleModal('height')}
                            editable={false}
                        />
                        <Text style={styles.name}>Address</Text>
                        <InputContainer
                            placeholder="Street Address"
                            title={'Street Address'}
                            value={address1}
                            onChangeText={setAddress1}
                            keyboardType="default"
                            autoCapitalize="sentences"
                            iconName={"edit"}
                            editable={isEditable.address1}
                            onPress={() => toggleEditable('address1')}
                        />
                        <InputContainer
                            placeholder="Street Address 2"
                            title={'Street Address 2'}
                            value={address2}
                            onChangeText={setAddress2}
                            keyboardType="default"
                            autoCapitalize="sentences"
                            iconName={"edit"}
                            editable={isEditable.address2}
                            onPress={() => toggleEditable('address2')}
                        />
                        <InputContainer
                            placeholder="City"
                            title={'City'}
                            value={city}
                            onChangeText={setCity}
                            keyboardType="default"
                            autoCapitalize="words"
                            iconName={"edit"}
                            editable={isEditable.city}
                            onPress={() => toggleEditable('city')}
                        />
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <InputContainer
                                placeholder="Select State"
                                title={'State'}
                                inputStyle={styles.stateWidth}
                                iconName={"chevron-down"}
                                value={selectedState}
                                onPress={() => toggleModal('state')}
                                editable={false}
                            />
                            <InputContainer
                                placeholder="Zip Code"
                                title={'Zip Code'}
                                inputStyle={styles.widthStyle}
                                value={zip}
                                onChangeText={setZip}
                                keyboardType="numeric"
                                iconName={"edit"}
                                editable={isEditable.zip}
                                onPress={() => toggleEditable('zip')}

                            />
                        </View>
                    </ScrollView>
                    <View style={styles.row}>
                        <CustomButton
                            buttonStyle={styles.Button}
                            textStyle={styles.btnText}
                            title={'Cancel'}
                            onPress={handleGoBack}
                        />
                        <CustomButton
                            buttonStyle={styles.joinButton}
                            textStyle={styles.joinText}
                            title={'Save'}
                            onPress={handleSave}
                            loading={loading}
                        />
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
                                <CustomButton
                                    title="Close"
                                    onPress={() => toggleModal('gender')}
                                    buttonStyle={styles.closeButton}
                                />
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
                                <CustomButton
                                    title="Close"
                                    onPress={() => toggleModal('weight')}
                                    buttonStyle={styles.closeButton}
                                />
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
                                <CustomButton
                                    title="Close"
                                    onPress={() => toggleModal('height')}
                                    buttonStyle={styles.closeButton}
                                />
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
                                <CustomButton
                                    title="Close"
                                    onPress={() => toggleModal('state')}
                                    buttonStyle={styles.closeButton}
                                />
                            </View>
                        </View>
                    </Modal>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

export default EditProfile;