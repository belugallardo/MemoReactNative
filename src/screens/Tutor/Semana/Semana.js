import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useEffect } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import backImage from '../../../../assets/back.png';
import logoutImage from '../../../../assets/logout.png';
import { ScrollView } from 'react-native-gesture-handler';

const Semana = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { esarData } = route.params || {};


    useEffect(() => {
        console.log("Valor de esarData", esarData);
    }, [esarData]);

    const goToDia = (dia) => {
        navigation.navigate('Dia', { dia });
    };


    return (
        <View>
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.buttonContainer}>

                        <TouchableOpacity style={styles.customButton} onPress={() => goToDia('Lunes')}>
                            <Text style={styles.buttonText}>LUNES</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.customButton} onPress={() => goToDia('martes')}>
                            <Text style={styles.buttonText}>MARTES</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.customButton} onPress={() => goToDia('miercoles')}>
                            <Text style={styles.buttonText}>MIERCOLES</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.customButton} onPress={() => goToDia('jueves')}>
                            <Text style={styles.buttonText}>JUEVES</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.customButton} onPress={() => goToDia('viernes')}>
                            <Text style={styles.buttonText}>VIERNES</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.customButton} onPress={() => goToDia('sabado')}>
                            <Text style={styles.buttonText}>SABADO</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.customButton} onPress={() => goToDia('domingo')}>
                            <Text style={styles.buttonText}>DOMINGO</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
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

    container: {
        alignItems: 'center',
    },

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
        margin: 65,
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
        marginTop: 10
    }
});

export default Semana;