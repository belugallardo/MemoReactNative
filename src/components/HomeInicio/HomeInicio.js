import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { TouchableOpacity, Text } from 'react-native';
import CustomButton from '../ButtonMemo/Button'; 

const HomeInicio = ({ navigation }) => {
  const goToLogin = () => {
    navigation.navigate('Login'); 
  };

  const goToRegister = () => {
    navigation.navigate('Register'); 
  };

  return (
    <View style={styles.homeLogin}>
      <View style={styles.imgMemoContenedor}>
        <Image
          style={styles.imgMemo}
          source={require('../../../assets/logo.png')} 
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
    width: 400, 
    height: 400, 
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
    backgroundColor: 'blue', 
    margin: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white', 
    textAlign: 'center',
    fontSize: 16,
  },
});

export default HomeInicio;
