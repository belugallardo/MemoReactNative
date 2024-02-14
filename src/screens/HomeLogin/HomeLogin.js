import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, } from 'react-native';
import { useLoginMutation } from '../../fectures/autenticacion/autenticacion';
import { useDispatch } from 'react-redux';
import { setUser } from '../../fectures/estadoAutenticacion/estadoAutenticacion';

export const HomeLogin = ({ navigation }) => {
  const [triggerLogin, { data, isError, isSuccess, error, isLoading }] = useLoginMutation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [checkEmailPassword, setCheckEmailPassword] = useState('');
  const [tempError, setTempError] = useState('');
  const dispatch = useDispatch()

  useEffect(() => {
    if (isSuccess) {
      dispatch(setUser(data));
    }
    if (isError) {
      setTempError('Usuario y / o contraseña incorrecto');
    }
  }, [data, isError, isSuccess]);

  useEffect(() => {
    setCheckEmailPassword(tempError);
  }, [tempError]);

  const onSubmit = async () => {
    setEmailError('');
    setPasswordError('');

    if (!email) {
      setEmailError('Por favor, ingresa tu email.');
    }
    if (!password) {
      setPasswordError('Por favor, ingresa tu contraseña.');
    }
    if (password && email) {

      try {
        await triggerLogin({ email, password });
        setTempError('');
      } catch (error) {
        console.log('Error al iniciar sesión:', error);
        setTempError('Usuario y / o contraseña incorrecto');
      }
    }
  };

  const HomeInicio = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.containerRegister}>
      <View style={styles.hero}>
        <View style={styles.formRegistro}>
          <View style={styles.titulo}>
            <Text style={styles.tituloText}>LOGIN</Text>
          </View>
          <Text style={styles.subtitulo}>EMAIL:</Text>
          <TextInput
            style={styles.inputRegistro}
            label="Email"
            value={email}
            onChangeText={(t) => setEmail(t)}
            secureTextEntry={false}
            error={emailError !== '' ? true : false}
            placeholder="Ingrese su email"
          />
          {emailError !== '' && <Text style={styles.errorText}>{emailError}</Text>}
          <Text style={styles.subtitulo}>CONTRASEÑA:</Text>
          <TextInput
            style={styles.inputRegistro}
            label="Contraseña"
            value={password}
            onChangeText={(t) => setPassword(t)}
            secureTextEntry={true}
            error={passwordError !== '' ? true : false}
            placeholder="Ingrese su contraseña"
          />
          {passwordError !== '' && <Text style={styles.errorText}>{passwordError}</Text>}
          {checkEmailPassword !== '' && <Text style={styles.errorText}>{checkEmailPassword}</Text>}

          <View style={styles.contenedorBotonAzul}>
            {/* Los botones con sus imágenes */}
            <TouchableOpacity onPress={HomeInicio} >
              <Image source={require('../../../assets/back.png')} style={styles.botonAzul} />
            </TouchableOpacity>
            <TouchableOpacity onPress={onSubmit} >
              <Image source={require('../../../assets/accept.png')} style={styles.botonAzul} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = {
  containerRegister: {
    flex: 4,
    backgroundColor: '#ECECF5',
    width: '100%'
  },
  hero: {
    marginTop: 50,
  },
  formRegistro: {
    width: '100%',
    alignItems: 'center',
  },
  titulo: {
    marginTop: 40,
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
  },
  inputRegistro: {
    width: 300,
    marginBottom: 20,
    padding: 10,
    borderRadius: 100,
    backgroundColor: '#ffffff',
    color: '#737474',
    fontSize: 16,
    width: '88%'
  },
  olvideContrasenia: {
    color: '#206ce5',
    fontSize: 14,
    marginTop: 15,
  },
  contenerContrasenia: {
    alignItems: 'center',
  },
  contenedorBotonAzul: {
    marginTop: 250,
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
};