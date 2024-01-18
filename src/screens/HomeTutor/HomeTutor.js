import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import backImage from '../../../assets/back.png';
import logoutImage from '../../../assets/logout.png';

const HomeTutor = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { esarData } = route.params || {};

    const handleClick = () => {
        alert('Botón personalizado clickeado');
    };

    useEffect(() => {
        console.log("Valor de esarData", esarData);
    }, [esarData]);

    const goToTareas = () => {
        navigation.navigate('Tareas'); 
      };

    return (
        <View style={styles.container}>
            <Text>{esarData}</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.customButton} onPress={handleClick}>
                    <Text style={styles.buttonText}>MANUAL DE USO</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.customButton} onPress={handleClick}>
                    <Text style={styles.buttonText}>AVATAR</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.customButton} onPress={handleClick}>
                    <Text style={styles.buttonText}>MI CARNET</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.customButton} onPress={goToTareas}>
                    <Text style={styles.buttonText} estilo="customButton" >SEMANA</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.customButton} onPress={handleClick}>
                    <Text style={styles.buttonText}>COMUNICACION</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.customButton} onPress={handleClick}>
                    <Text style={styles.buttonText}>AJUSTES</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.blueButtonContainer}>
                <TouchableOpacity style={styles.blueButton} onPress={() => navigation.navigate('Home')}>
                    <Image source={backImage} style={styles.imageStyle} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.blueButton} onPress={() => navigation.navigate('Home')}>
                    <Image source={logoutImage} style={styles.imageStyle} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({

    customButton: {
        width: 300,
        marginTop: 19,
        marginBottom: 0,
        paddingVertical: 15,
        borderRadius: 100,
        backgroundColor: '#ff6600',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 25,
        letterSpacing: 3,
    },
    blueButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 35,
    },
    blueButton: {
        width: 30,
        height: 60,
        marginTop: 1,
        borderRadius: 100,
        backgroundColor: '#0a06f1',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageStyle: {
        width: 70,
        height: 70,
    },
    buttonContainer: {
        marginTop: 100
    }
});

export default HomeTutor;

