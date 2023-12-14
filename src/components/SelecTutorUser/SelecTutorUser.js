import React, { useState } from 'react';
import { View, Image, StyleSheet, TextInput } from 'react-native';
import CustomButton from '../ButtonMemo/Button';
import HomeTutor from '../HomeTutor/HomeTutor';
import HomeUsuario from '../HomeUsuario/HomeUsuario';

const SelecTutorUser = ({ navigation }) => {
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [attempted, setAttempted] = useState(false);

    const handleLogin = () => {
        if (password === '123456') {
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
            setAttempted(true);
        }
    };

    return (
        <View style={styles.homeLogin}>

            {loggedIn && <HomeTutor />}

            {!loggedIn && !attempted && (
                <View style={styles.item}>
                    <Image
                        style={styles.imgMemo}
                        source={require('../../../assets/logo.png')}
                        resizeMode="contain"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Ingrese la contraseña"
                        secureTextEntry
                        onChangeText={(text) => setPassword(text)}
                    />
                    <CustomButton text="COMENZAR" estilo="customButton" onPress={handleLogin} />
                </View>
            )}

            {attempted && !loggedIn && <HomeUsuario />}
        </View>
    );
};

const styles = StyleSheet.create({
    item:{
        alignItems:'center'

    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginVertical: 10,
        width: '80%',
    },
    imgMemo: {
        width: 300,
        height: 300,
    },
    homeLogin: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:-60
    },
});

export default SelecTutorUser;
