import React, { useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity, Text } from 'react-native';
import styles from '../../Screens/EditProfile/styles';
import Loader from '../Loader';

const GenderList = ({ onSelect }) => {
    const [genderList, setGenderList] = useState([]);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const fetchGenderData = async () => {
            try {
                const response = await fetch('https://eb1.taramind.com/getLookupMaster/mini-intake/gender', {
                    headers: {
                        'X-Api-Key': 'e1693d9245c57be86afc22ad06eda84c9cdb74dae6d56a8a7f71a93facb1f42b',
                    },
                });
                const data = await response.json();
                if (data.length > 0) {
                    const genderString = data[0].lookupMasterValueDesc; 
                    const genderArray = genderString.split(', ').map(gender => gender.trim());
                    setGenderList(genderArray);
                }
            } catch (error) {
                console.error('Error fetching gender data:', error);
            } finally {
                setLoading(false); 
            }
        };

        fetchGenderData();
    }, []);

    if (loading) {
        return <Loader />; 
    }

    return (
        <View>
            <FlatList
                scrollEnabled={false}
                data={genderList}
                keyExtractor={(item) => item} 
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => onSelect(item)}>
                        <Text style={styles.itemText}>{item}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

export default GenderList;
