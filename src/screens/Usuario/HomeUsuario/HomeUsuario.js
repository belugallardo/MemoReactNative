import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const HomeUsuario = ({ navigation }) => {
    const goMiCarnet = () => {
        navigation.navigate('MiCarnet')
    };
    const goHomeTutor = () => {
        navigation.navigate('LoginTutor')
    }
    const goRutinaUsuario = () => {
        navigation.navigate('Bienvenido')
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.customButtonTutor} onPress={goHomeTutor}>
                <FontAwesome style={styles.buttonTextTutor} name="user" />
            </TouchableOpacity>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.customButton} onPress={goRutinaUsuario}>
                    <Text style={styles.buttonText}>RUTINAS</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.customButton} onPress={goMiCarnet}>
                    <Text style={styles.buttonText}>MI CARNET</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
    },
    customButton: {
        width: 300,
        marginTop: 19,
        marginBottom: 0,
        paddingVertical: 15,
        paddingHorizontal: 19,
        borderRadius: 100,
        backgroundColor: '#efb810',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 25,
        letterSpacing: 3,
    },
    buttonContainer: {
        marginTop: 200,
        alignItems: 'center',
    },
    customButtonTutor: {
        width: 40,
        height: 80,
        backgroundColor: '#2372d9',
        borderBottomRightRadius: 30,
        alignItems: 'center',

    },
    buttonTextTutor: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 32,
        letterSpacing: 3,
        paddingTop: 20,
    },
});

export default HomeUsuario;