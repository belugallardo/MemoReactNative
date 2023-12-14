import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';


const HomeUsuario = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { esarData } = route.params || {};

    const handleClick = () => {
        alert('Botón personalizado clickeado');
    };

    useEffect(() => {
        console.log("Valor de esarData", esarData);
    }, [esarData]);

    return (
        <View style={styles.container}>
            <Text>{esarData}</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.customButton} onPress={handleClick}>
                    <Text style={styles.buttonText}>RUTINAS</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.customButton} onPress={handleClick}>
                    <Text style={styles.buttonText}>COMUNICACION</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.customButton} onPress={handleClick}>
                    <Text style={styles.buttonText}>MI CARNET</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    // ... estilos previos
    container:{
    marginTop:30,

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
});

export default HomeUsuario;