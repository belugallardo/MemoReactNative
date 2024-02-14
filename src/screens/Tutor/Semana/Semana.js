import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react';
import backImage from '../../../../assets/back.png';
import homeUsuario from '../../../../assets/home.png';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { setDia } from '../../../fectures/estadoCOmponente/estadoComponente';

const Semana = ({navigation}) => {
    const dispatch = useDispatch();
    const goToDia = (dia) => {
        dispatch(setDia({ dia, momento: null }));
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
                        <TouchableOpacity style={styles.customButton} onPress={() => goToDia('lunes')}>
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
        marginTop:65
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