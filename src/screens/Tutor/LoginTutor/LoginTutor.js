import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLoginMutation } from '../../../fectures/autenticacion/autenticacion';

const LoginTutor = ({ navigation }) => {
    const [triggerLogin, { data, isError, isSuccess, error, isLoading, reset }] = useLoginMutation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const idEmail = useSelector((state) => state.auth && state.auth.value && state.auth.value.email);
    const [passwordError, setPasswordError] = useState('');
    const [passInvalid, setPassInvalid] = useState('');
    const [tempError, setTempError] = useState('');


    useEffect(() => {
        setEmail(idEmail || '');
    }, [idEmail]);
    useEffect(() => {
        setPassInvalid(tempError);
        if (isSuccess) {
            navigation.navigate('HomeTutor');
        } else if (tempError) {
        }
    }, [isSuccess, tempError, navigation]);

    const goHomeUsuario = () => {
        navigation.navigate('HomeUsuario');
    }
    const goHomeTutor = async () => {
        reset();
        if (!password) {
            setPasswordError('Por favor, ingresa tu contraseña.');
            return;
        }
        await triggerLogin({ email, password });
        console.log(data, isSuccess);
        console.log('Datos enviados:', { email, password });

        if (!isSuccess) {
            setTempError('Contraseña inválida');
        }
    }


    return (
        <View style={styles.container}>
            <View style={styles.titulo}>
                <Text style={styles.tituloText}>LOGIN TUTOR</Text>
            </View>
            <View style={styles.contenedorInput}>
                <Text style={styles.text}>Vuelva a ingresar la contraseña para acceder a la configuración</Text>
                <TextInput
                    style={styles.inputRegistro}
                    label="Contraseña"
                    value={password}
                    onChangeText={(t) => setPassword(t)}
                    secureTextEntry={true}
                    error=''
                    placeholder="Ingrese su contraseña"
                />
                {passwordError !== '' && <Text style={styles.errorText}>{passwordError}</Text>}
                {passInvalid !== '' && <Text style={styles.errorText}>{passInvalid}</Text>}
            </View>
            <View style={styles.contenedorBotonAzul}>
                <TouchableOpacity onPress={goHomeUsuario} >
                    <Image source={require('../../../../assets/back.png')} style={styles.botonAzul} />
                </TouchableOpacity>
                <TouchableOpacity onPress={goHomeTutor} >
                    <Image source={require('../../../../assets/accept.png')} style={styles.botonAzul} />
                </TouchableOpacity>
            </View>
        </View>
    )
};
const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        alignItems: 'center',
    },
    titulo: {
        marginTop: 50,
        marginBottom: 10,
        display:'flex',
        alignItems:'center'
    },
    tituloText: {
        color: '#FF6600',
        letterSpacing: 3,
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 20,
        alignItems: 'center'
    },
    text: {
        marginTop: 30,
        fontSize: 20,
        alignItems: 'center',
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
    contenedorBotonAzul: {
        marginTop: 320,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
    },
    botonAzul: {
        width: 60,
        height: 60,
        marginTop: 27,
        borderRadius: 100,
        backgroundColor: '#0e3ed9',
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginBottom: 10,
    },
});


export default LoginTutor