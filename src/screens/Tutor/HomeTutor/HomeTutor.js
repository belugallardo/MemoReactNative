import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import backImage from '../../../../assets/back.png';
import logoutImage from '../../../../assets/logout.png';

const HomeTutor = ({navigation}) => {


    const goAvatar = () => {
        navigation.navigate('AvatarTutor');
    };
    const goToSemana = () => {
        navigation.navigate('Semana');
    };
    const goHomeUsuario = () => {
        navigation.navigate('HomeUsuario');
    };
    const goManualDeUso = () => {
        navigation.navigate('ManualDeUso');
    };
    const goMiCarnetTutor = () => {
        navigation.navigate('MiCarnetTutor');
    };

    return (
        <View >
            <View style={styles.container}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.customButton} onPress={goManualDeUso}>
                        <Text style={styles.buttonText}>MANUAL DE USO</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.customButton} onPress={goAvatar}>
                        <Text style={styles.buttonText}>AVATAR</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.customButton} onPress={goMiCarnetTutor}>
                        <Text style={styles.buttonText}>MI CARNET</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.customButton} onPress={goToSemana}>
                        <Text style={styles.buttonText} estilo="customButton" >SEMANA</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.blueButtonContainer}>
                <TouchableOpacity style={styles.blueButton} onPress={goHomeUsuario}>
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
        marginTop:140,
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
        alignItems: 'center',
    },
    blueButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 35,
        marginTop: 170,
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
        marginTop: 40
    }
});

export default HomeTutor;

