import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CustomButton = ({ text, onPress, estilo }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles[estilo]}>
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    customButton: {
        width: 200,
        marginTop: 13,
        marginBottom: 13,
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderRadius: 100,
        backgroundColor: '#ff6600',
        color: '#ffffff',
        fontWeight: 'bold',
        fontFamily: 'theBold',
        letterSpacing: 3,
        fontSize: 25,
        shadowColor: '#bb530e',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 5, 
        textAlign: 'center',
    },
    customButtonAzul: {
        width: 200,
        marginTop: 13,
        marginBottom: 13,
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderRadius: 100,
        backgroundColor: '#0a06f1',
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
    },
    customButtonAzulRedondo: {
        width: 60,
        height: 60,
        marginTop: 27,
        borderRadius: 100,
        backgroundColor: '#0e3ed9',
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
        lineHeight: 60, 
    },
    buttonText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 25,
        textAlign: 'center',
    },
});

export default CustomButton;
