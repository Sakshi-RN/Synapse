import React, { useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity, Text } from 'react-native';
import styles from '../../Screens/EditProfile/styles';
import Loader from '../Loader'


const WeightList = ({ onSelect }) => {
    const [weightList, setWeightList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWeightData = async () => {
            try {
                const response = await fetch('https://eb1.taramind.com/getLookupMaster/intake/weight', {
                    headers: {
                        'X-Api-Key': 'e1693d9245c57be86afc22ad06eda84c9cdb74dae6d56a8a7f71a93facb1f42b',
                    },
                });
                const data = await response.json();
                if (data.length > 0) {
                    const weightString = data[0].lookupMasterValueDesc;
                    const weightArray = weightString.split(', ').map(weight => weight.trim());
                    setWeightList(weightArray);
                }
            } catch (error) {
                console.error('Error fetching weight data:', error);
            }
            finally {
                setLoading(false); 
            }
        };

        fetchWeightData();
    }, []);

    if (loading) {
        return <Loader />;
    }

    return (
        <View>
            <FlatList
                scrollEnabled={false}
                data={weightList}
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

export default WeightList;
