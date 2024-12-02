
import React from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import Colors from '../../Themes/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Fonts } from '../../Themes/fonts';

const InputContainer = ({
    placeholder,
    title,
    iconName,
    inputStyle,
    placeholderTextColor = Colors.OFFBLACK,
    value,
    editable,
    onChangeText,
    onPress,
}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{title}</Text> 
            {/* <Text style={[styles.label, titleColor]}>
                <Text>{title}</Text>
                {showAsterisk && <Text style={styles.startStyle}>{' '}*</Text>}
            </Text> */}
            <View style={[styles.textInput, inputStyle]}>
                <TextInput
                    placeholder={placeholder}
                    placeholderTextColor={placeholderTextColor}
                    style={[styles.input, !editable && styles.disabledInput]}
                    value={value}
                    editable={editable}
                    onChangeText={onChangeText}
                />
                <TouchableOpacity onPress={onPress}>
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
        fontSize: responsiveFontSize(1.6),
        color: Colors.black,
        fontWeight: 'bold',
        marginTop: responsiveHeight(1)
    },
    textInput: {
        borderColor: Colors.grey,
        borderWidth: 1.2,
        borderRadius: 2,
        height: responsiveHeight(6),
        backgroundColor: Colors.white,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: responsiveWidth(3),
        alignItems: 'center',
        marginTop: responsiveHeight(1),
        
    },
    startStyle: {
        color: Colors.red,
        fontFamily: Fonts.Medium600,
        fontSize: responsiveFontSize(1.6),
    },
    disabledInput: {
        color:Colors.darkgrey,
     fontFamily: Fonts.Semibold700,
        fontSize: responsiveFontSize(1.5),
    },
    input: {
        fontFamily: Fonts.Light400,
        color: Colors.black,
        fontSize: responsiveFontSize(1.6),
    },
});


