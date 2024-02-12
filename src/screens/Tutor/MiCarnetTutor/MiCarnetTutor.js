import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useEditCarnetMutation } from '../../../fectures/api/apiSlice';

const MiCarnetTutor = ({navigation}) => {

    const [apodo, setApodo] = useState('');
    const [datos, setDatos] = useState('');
    const [contacto, setContacto] = useState('');
    const [rutaCarnet] = useEditCarnetMutation();

    const authState = useSelector((state) => state.auth);
    const email = authState.value.email;

    const goHomeUsuario = () => {
        navigation.navigate('HomeUsuario');
    }

    const card = {
        card:[apodo,
            datos,
            contacto]
    }
    const carnet = {
        email:email,
        card:card
    }
    const accept = () => {
        rutaCarnet(carnet)
        navigation.navigate('HomeTutor')
    }

    return (
        <View style={styles.containerCarnet} >
            <Text style={styles.textTitle}>HOLA!</Text>
            <View style={styles.contenedorInput}>
            <Text style={styles.textCarnet}> MI APODO ES:</Text>

                <TextInput
                    style={styles.inputRegistro}
                    label="apodo"
                    value={apodo}
                    onChangeText={(t) => setApodo(t)}
                    //secureTextEntry={true}
                    error=''
                    placeholder="Ingrese el apodo"
                />
                <Text style={styles.textCarnet}> PARA ENTENDERTE MEJOR NECESITO:</Text>
                <TextInput
                    style={styles.inputRegistro}
                    label="datos"
                    value={datos}
                    onChangeText={(t) => setDatos(t)}
                    //secureTextEntry={true}
                    error=''
                    placeholder="Ingrese información importante para ti"
                />
                <Text style={styles.textCarnet}> CONTACTO DE EMERGENCIA:</Text>
                <TextInput
                    style={styles.inputRegistro}
                    label="contacto"
                    value={contacto}
                    onChangeText={(t) => setContacto(t)}
                    //secureTextEntry={true}
                    error=''
                    placeholder="Contacto de emergencia"
                />
            </View>
            <View style={styles.contenedorBotonAzul}>
                <TouchableOpacity onPress={goHomeUsuario} >
                    <Image source={require('../../../../assets/back.png')} style={styles.botonAzul} />
                </TouchableOpacity>
                <TouchableOpacity onPress={accept} >
                    <Image source={require('../../../../assets/accept.png')} style={styles.botonAzul} />
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    containerCarnet: {
        flex: 1,
        backgroundColor: '#eec144',
    },
    textTitle: {
        color: '#ff6600',
        fontSize: 40,
        fontWeight: 'bold',
        marginLeft: 30,
        marginTop: 60,
    },
    textCarnet: {
        color: '#ffffff',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
    },
    inputRegistro: {
        width: 300,
        marginTop: 30,
        marginBottom: 20,
        padding: 10,
        borderRadius: 100,
        backgroundColor: '#ffffff',
        color: '#737474',
        fontSize: 16,
        width: '88%'
    },
    contenedorInput:{
        marginLeft:20,
    },
    contenedorBotonAzul: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginLeft: 40,
        marginTop: 20,
    },
    botonAzul: {
        width: 60,
        height: 60,
        borderRadius: 100,
        backgroundColor: '#0e3ed9',
    },
});
export default MiCarnetTutor