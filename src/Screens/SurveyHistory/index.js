import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import Colors from '../../Themes/Colors';
import { Intake, PHQ, Ace, Diagonstic } from '../../Assets/svg';
import { ScrollView } from 'react-native-gesture-handler';
import LCSWImage from '../../Assets/Images/graph.png';
import CustomHeader from '../../Components/CustomHeader';



const HomeScreen = () => {
    const navigation = useNavigation();

    const handleInTake = () => {
        navigation.navigate('InTake');
    }
    const handlePhq = () => {
        navigation.navigate('PHQ');
    }


    const handleDiagonistic = () => {
        navigation.navigate('Diagonistic');
    }
    const handleACE = () => {
        navigation.navigate('ACE');
    }

    const actionConatiner = () => {
        return (
            <View>
                <View style={styles.row}>
                    <TouchableOpacity onPress={handleInTake}>
                        <Intake />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handlePhq}>
                        <PHQ />
                    </TouchableOpacity>
                </View>
                <View style={styles.secondRow}>
                    <TouchableOpacity onPress={handleDiagonistic}>
                        <Diagonstic />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleACE}>
                        <Ace />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <CustomHeader title={'Survey History'} />
            <ScrollView >
                <View style={styles.graphSyle}>
                    <Image source={LCSWImage} />
                </View>

                {actionConatiner()}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center'
    },
    secondRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: responsiveHeight(1),
        alignSelf: 'center'
    },
    graphSyle: {
        height: responsiveHeight(25),
        alignSelf: 'center',
        marginTop: responsiveHeight(4),
        marginBottom: responsiveHeight(9)
    },

});

export default HomeScreen;
