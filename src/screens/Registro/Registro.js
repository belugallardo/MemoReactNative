import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput } from 'react-native';
import { useSignupMutation } from '../../fectures/autenticacion/autenticacion';
import { useCreateUserMutation } from '../../fectures/api/apiSlice';

const Registro = ({ navigation }) => {
    const [triggerSignup, { data, isError, isSuccess, error, isLoading }] = useSignupMutation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [passwordMatchError, setPasswordMatchError] = useState('');
    const [createUser] = useCreateUserMutation();

    console.log(data, isSuccess, error)
    useEffect(() => {
        if (isSuccess) console.log(data)
        if (isError) console.log(error)
    }, [data, isError, isSuccess])

    useEffect(() => {
        if (isSuccess) {
            navigation.navigate('Login')
        }
        if (isError) {
            setEmailError('Error en el registro. Por favor intentalo nuevamente')
        }
    }, [isError, isSuccess, navigation])

    const HomeInicio = () => {
        navigation.navigate('Home');
    };

    const onSubmit = () => {
        // Validación básica
        setEmailError('');
        setPasswordError('');
        setConfirmPasswordError('');
        setPasswordMatchError('');

        if (!email) {
            setEmailError('Por favor, ingresa tu email.');
        }
        if (!password) {
            setPasswordError('Por favor, ingresa tu contraseña.');
        }
        if (!confirmPassword) {
            setConfirmPasswordError('Por favor, confirma tu contraseña.');
        }
        if (password !== confirmPassword) {
            setPasswordMatchError('Las contraseñas no coinciden.');
        }

        if (email && password && confirmPassword && password === confirmPassword) {
            triggerSignup({ email, password });
            createUser({email});

        }
    };

    return (

        <View style={styles.containerRegister}>
            <View style={styles.hero}>
                <View style={styles.formRegistro}>
                    <View style={styles.titulo}>
                        <Text style={styles.tituloText}>REGISTRO</Text>
                    </View>
                    <Text style={styles.subtitulo}>EMAIL:</Text>
                    <TextInput
                        style={[styles.inputRegistro, emailError !== '' && styles.inputError]}
                        label="Email"
                        value={email}
                        onChangeText={(t) => setEmail(t)}
                        secureTextEntry={false}
                        error={emailError !== '' ? true : false}
                        placeholder="Enter your email"

                    />
                    {emailError !== '' && <Text style={styles.errorText}>{emailError}</Text>}
                    <Text style={styles.subtitulo}>CONTRASEÑA:</Text>
                    <TextInput
                        style={[styles.inputRegistro, passwordError !== '' && styles.inputError]}
                        label="Contraseña"
                        value={password}
                        onChangeText={(t) => setPassword(t)}
                        secureTextEntry={true}
                        error={passwordError !== '' ? true : false}
                        placeholder="Enter your password"
                    />
                    {passwordError !== '' && <Text style={styles.errorText}>{passwordError}</Text>}
                    <Text style={styles.subtitulo}>CONFIRMAR CONTRASEÑA:</Text>
                    <TextInput
                        style={[styles.inputRegistro, confirmPasswordError !== '' && styles.inputError]}
                        label="Confirmar Contraseña"
                        value={confirmPassword}
                        onChangeText={(t) => setConfirmPassword(t)}
                        secureTextEntry={true}
                        error={confirmPasswordError !== '' ? true : false}
                        placeholder="Confirm your password"
                    />
                    {confirmPasswordError !== '' && <Text style={styles.errorText}>{confirmPasswordError}</Text>}
                    {passwordMatchError !== '' && <Text style={styles.errorText}>{passwordMatchError}</Text>}
                    <View style={styles.contenedorBotonAzul}>
                        <TouchableOpacity onPress={HomeInicio}>
                            <Image source={require('../../../assets/back.png')} style={styles.botonAzul} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onSubmit}>
                            <Image source={require('../../../assets/accept.png')} style={styles.botonAzul} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

// Estilos con StyleSheet.create
const styles = StyleSheet.create({
    containerRegister: {
        flex: 4,
        backgroundColor: '#ECECF5',
        width: '100%',
    },
    hero: {
        marginTop: 50,
    },
    formRegistro: {
        width: '100%',
        alignItems: 'center',
    },
    titulo: {
        marginBottom: 10,
    },
    tituloText: {
        color: '#FF6600',
        letterSpacing: 3,
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    subtitulo: {
        color: '#737474',
        fontSize: 16,
        paddingVertical: 5,
        marginTop: 15,
    },
    inputRegistro: {

        marginBottom: 10,
        padding: 10,
        borderRadius: 100,
        backgroundColor: '#ffffff',
        color: '#737474',
        fontSize: 16,
        width: '88%',
    },
    contenedorBotonAzul: {
        marginTop: 50,
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
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
        lineHeight: 60,
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginBottom: 10,
    },
});

export default Registro;
