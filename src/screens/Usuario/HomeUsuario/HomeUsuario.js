import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

const HomeUsuario = ({navigation}) => {
    const route = useRoute();
   

    const handleClick = () => {
        alert('Botón personalizado clickeado');
    };
    const goHomeTutor =()=>{
        navigation.navigate('LoginTutor')
    }


    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.customButtonTutor} onPress={goHomeTutor}>
                    <FontAwesome style={styles.buttonTextTutor} name="user" />
            </TouchableOpacity>
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
        marginTop: 150,
        alignItems: 'center',
    },
    customButtonTutor:{
        width: 40,
        height: 80,
        backgroundColor: '#2372d9',
        borderBottomRightRadius: 30,
        alignItems:'center',
        
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