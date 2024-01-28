import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useEffect } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import backImage from '../../../../assets/back.png';
import homeUsuario from '../../../../assets/home.png';
import { ScrollView } from 'react-native-gesture-handler';

const Semana = ({navigation}) => {
    const route = useRoute();

    const goToDia = (dia) => {
        navigation.navigate('Dia', { dia });
    };

    const goHomeUsuario = () => {
        navigation.navigate('HomeUsuario')
    }

    const goHomeTutor = () => {
        navigation.navigate('HomeTutor')
    }

    return (
        <View>
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.buttonContainer}>

                        <TouchableOpacity style={styles.customButton} onPress={() => goToDia('LUNES')}>
                            <Text style={styles.buttonText}>LUNES</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.customButton} onPress={() => goToDia('MARTES')}>
                            <Text style={styles.buttonText}>MARTES</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.customButton} onPress={() => goToDia('MIERCOLES')}>
                            <Text style={styles.buttonText}>MIERCOLES</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.customButton} onPress={() => goToDia('JUEVES')}>
                            <Text style={styles.buttonText}>JUEVES</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.customButton} onPress={() => goToDia('VIERNES')}>
                            <Text style={styles.buttonText}>VIERNES</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.customButton} onPress={() => goToDia('SABADO')}>
                            <Text style={styles.buttonText}>SABADO</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.customButton} onPress={() => goToDia('DOMINGO')}>
                            <Text style={styles.buttonText}>DOMINGO</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
            <View style={styles.blueButtonContainer}>
                <TouchableOpacity style={styles.blueButton} onPress={goHomeTutor}>
                    <Image source={backImage} style={styles.imageStyle} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.blueButton} onPress={goHomeUsuario}>
                    <Image source={homeUsuario} style={styles.imageStyle} />
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
        margin: 35,
        marginHorizontal:45,
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