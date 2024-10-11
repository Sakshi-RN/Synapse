// StateList.js
import React, { useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity, Text } from 'react-native';
import styles from '../../Screens/EditProfile/styles';
import Loader from '../Loader'


const StateList = ({ onSelect }) => {
    const [statesList, setStatesList] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStatesData = async () => {
            try {
                const response = await fetch('https://eb1.taramind.com/states', {
                    headers: {
                        'X-Api-Key': 'e1693d9245c57be86afc22ad06eda84c9cdb74dae6d56a8a7f71a93facb1f42b',
                    },
                });
                const data = await response.json();
                setStatesList(data);
            } catch (error) {
                console.error('Error fetching states data:', error);
            }
            finally {
                setLoading(false); 
            }
        };

        fetchStatesData();
    }, []);
    if (loading) {
        return <Loader />;
    }
    return (
        <View>
            <FlatList
                scrollEnabled={false}
                data={Object.entries(statesList).map(([name, code]) => ({ name, code }))}
                keyExtractor={(item) => item.code}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => onSelect(item.name)}>
                        <Text style={styles.itemText}>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

export default StateList;
