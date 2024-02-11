import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import backImage from '../../../../assets/back.png';
import home from '../../../../assets/home.png';

const CategoriasTutor = (params) => {
    const route = useRoute();
    const navigation = useNavigation();
    const infoRedux = useSelector((state) => state.setdia);
    const  diaEstado  = infoRedux.value.dia;
    const momentoEstado = infoRedux.value.momento;
    console.log("Esto llega como dia y momento",momentoEstado, diaEstado)
   

    const goToTareas = (categoria) => {
        navigation.navigate('Tareas', { categoria, momentoEstado, diaEstado });
    };
    const goHomeUsuario = () => {
        navigation.navigate('HomeUsuario')
    }


    return (
        <View>
            <View style={styles.container}>
                <Text>CTEGORIAS</Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.customButton} onPress={() => goToTareas('higiene')}>
                        <Text style={styles.buttonText}>HIGIENE</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.customButton} onPress={() => goToTareas('alimentacion')}>
                        <Text style={styles.buttonText}>ALIMENTACION</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.customButton} onPress={() => goToTareas('recreacion')}>
                        <Text style={styles.buttonText}>RECREACION</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.customButton} onPress={() => goToTareas('escuela')}>
                        <Text style={styles.buttonText}>ESCUELA</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.customButton} onPress={() => goToTareas('extras')}>
                        <Text style={styles.buttonText}>EXTRAS</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.blueButtonContainer}>
                <TouchableOpacity style={styles.blueButton} onPress={goHomeUsuario}>
                    <Image source={backImage} style={styles.imageStyle} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.blueButton} onPress={goHomeUsuario}>
                    <Image source={home} style={styles.imageStyle} />
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
        backgroundColor: '#FFD300',
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
        marginTop: 100
    }
});

export default CategoriasTutor;
