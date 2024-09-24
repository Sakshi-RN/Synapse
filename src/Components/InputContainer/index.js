
import React from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import Colors from '../../Themes/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';

const InputContainer = ({
    placeholder,
    title,
    iconName,
    titleColor,
    showAsterisk = true,
    inputStyle,
    dynamicStyle,
    placeholderTextColor = Colors.OFFBLACK ,
    onPress,
    value
}) => {
    return (
        <View style={styles.container}>
            <View style={styles.reasonContainer} />
            <Text style={[styles.label, titleColor]}>
                <Text>{title}</Text>
                {showAsterisk && <Text style={styles.startStyle}>{' '}*</Text>}
            </Text>
            <View style={[styles.textInput,inputStyle]}>
                <TextInput
                    placeholder={placeholder}
                    placeholderTextColor={placeholderTextColor}       
                    style={dynamicStyle}
                    value={value}
                />
                <TouchableOpacity onPress={onPress}>
                    {iconName && (
                        <Icon
                            name={iconName}
                            size={17}
                            color={Colors.blue}
                        />
                    )}
                </TouchableOpacity>
            </View>

        </View>
    );
};
export default InputContainer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        justifyContent: 'space-between',
    },

    reasonContainer: {
        marginTop: 20,
    },
    label: {
        left: responsiveWidth(6),
        backgroundColor: Colors.white,
        paddingHorizontal: responsiveWidth(1),
        fontSize: responsiveFontSize(1.4),
        color: Colors.darkgrey,
        fontWeight: '500',
        width: responsiveWidth(33),
        position: 'absolute',
        zIndex: 1,
        top: responsiveHeight(1),
        height:responsiveHeight(3)
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
        alignItems: 'center'
    },
    startStyle: {
        color: Colors.red,
        fontWeight: '500',
        fontSize: responsiveFontSize(1.6),
    }
});


