import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert, TouchableOpacity, FlatList, Modal, Text } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Colors from '../../Themes/Colors';
import CustomHeader from '../../Components/CustomHeader';
import CustomButton from '../../Components/CustomButton';
import CommonInput from '../../Components/CommonInput';
import { useNavigation } from '@react-navigation/native';

const EditEmergencyContacts = () => {
    const navigation = useNavigation();
    const [relationships, setRelationships] = useState([]);
    const [selectedRelation, setSelectedRelation] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

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
            // Split the description by commas to get the individual relationship options
            setRelationships(data[0].lookupMasterValueDesc.split(', '));
        } catch (error) {
            Alert.alert('Error', 'Failed to fetch data. Please try again.');
        }
    };

    const handleEmergencyContacts = () => {
        navigation.navigate('Emergencycontacts');
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
                />
                <CommonInput
                    placeholder={'Last Name'}
                    title={'Emergency Contact Last Name'}
                />
                <CommonInput
                    placeholder={'Phone Number'}
                    title={'Emergency Contact Phone Number'}
                />
                <CommonInput
                    placeholder={'Select Relation'}
                    title={'What is your Emergency contact relation to you?'}
                    iconName={"chevron-down"}
                    onPress={openModal} // Open modal on press
                    value={selectedRelation} // Display selected relation
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
                        onPress={handleEmergencyContacts} />
                </View>
            </View>

            {/* Modal for selecting relationships */}
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
                        <CustomButton title="Close" onPress={closeModal} buttonStyle={styles.closeButton}  />
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
        fontWeight: '700',
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
        fontWeight: '500',
    },
    joinText: {
        fontWeight: '500',
    },
    textStyle:{
        fontWeight: '400',
        color:Colors.black
    }
});
