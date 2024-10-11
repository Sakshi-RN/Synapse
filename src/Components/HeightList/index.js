import React, { useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity, Text } from 'react-native';
import styles from '../../Screens/EditProfile/styles';
import Loader from '../Loader'

const HeightList = ({ onSelect }) => {
    const [heightList, setHeightList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHeightData = async () => {
            try {
                const response = await fetch('https://eb1.taramind.com/getLookupMaster/intake/height', {
                    headers: {
                        'X-Api-Key': 'e1693d9245c57be86afc22ad06eda84c9cdb74dae6d56a8a7f71a93facb1f42b',
                    },
                });
                const data = await response.json();
                if (data.length > 0) {
                    const heightsString = data[0].lookupMasterValueDesc;
                    const heightsArray = heightsString.split(', ').map(height => height.trim());
                    setHeightList(heightsArray);
                }
            } catch (error) {
                console.error('Error fetching height data:', error);
            }
            finally {
                setLoading(false); 
            }
        };

        fetchHeightData();
    }, []);
    if (loading) {
        return <Loader />;
    }
    return (
        <View>
            <FlatList
                scrollEnabled={false}
                data={heightList}
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

export default HeightList;
