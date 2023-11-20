import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { TouchableOpacity, Text } from 'react-native';
import CustomButton from '../Button.js/Button'; // Asegúrate de importar el botón personalizado de React Native

const HomeInicio = ({ navigation }) => {
  const goToLogin = () => {
    navigation.navigate('Login'); // Reemplaza 'Login' con la ruta correspondiente en tu app
  };

  const goToRegister = () => {
    navigation.navigate('Register'); // Reemplaza 'Register' con la ruta correspondiente en tu app
  };

  return (
    <View style={styles.homeLogin}>
      <View style={styles.imgMemoContenedor}>
        <Image
          style={styles.imgMemo}
          source={require('../../../assets/logo.png')} // Reemplaza con la ruta de tu imagen
          resizeMode="contain"
        />
      </View>

      <View style={styles.botonComenzar}>
        <TouchableOpacity>
        <CustomButton text="LOGIN" estilo="customButton" onPress={goToLogin} />
        </TouchableOpacity>
        <TouchableOpacity>
        <CustomButton text="REGISTRO" estilo="customButtonAzul" onPress={goToRegister} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  botonComenzar: {
    
    flexDirection: 'column',
    justifyContent: 'center',
  },
  imgMemo: {
    width: 400, // Cambia el tamaño de la imagen según tus necesidades
    height: 400, // Cambia el tamaño de la imagen según tus necesidades
  },
  imgMemoContenedor: {
    alignItems: 'center',
  },
  homeLogin: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  customButton: {
    backgroundColor: 'blue', // Color de fondo del botón
    margin: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white', // Color del texto del botón
    textAlign: 'center',
    fontSize: 16,
  },
});

export default HomeInicio;
