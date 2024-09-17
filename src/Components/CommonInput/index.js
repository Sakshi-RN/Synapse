
import React from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import Colors from '../../Themes/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';

const CommonInput = ({
    placeholder,
    title,
    iconName }) => {
    return (
        <View >
            <Text style={styles.label}>{title}</Text>
            <View style={styles.textInput}>
                <TextInput
                    placeholder={placeholder}
                    placeholderTextColor={Colors.OFFBLACK}
                />
                <TouchableOpacity>
                    {iconName && (
                        <Icon
                            name={iconName}
                            size={17}
                            color={Colors.OFFBLACK}
                        />
                    )}
                </TouchableOpacity>
            </View>

        </View>
    );
};
export default CommonInput;

const styles = StyleSheet.create({
    label: {
        backgroundColor: Colors.white,
        fontSize: responsiveFontSize(1.8),
        color: Colors.black,
        fontWeight: 'bold',
        marginTop: responsiveHeight(3)
    },
    textInput: {
        borderColor: Colors.darkgrey,
        borderWidth: 1.2,
        borderRadius: 2,
        height: responsiveHeight(6),
        fontSize: responsiveFontSize(1.8),
        color: Colors.black,
        fontWeight: '400',
        backgroundColor: Colors.white,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: responsiveWidth(3),
        alignItems: 'center',
        marginTop: responsiveHeight(1)
    },

});


