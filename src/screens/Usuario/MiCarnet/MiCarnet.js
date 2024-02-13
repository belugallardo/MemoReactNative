import { View, Text, StyleSheet, TouchableOpacity,Image } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import { useGetUserQuery } from '../../../fectures/api/apiSlice';
import { useFocusEffect } from '@react-navigation/native';

const MiCarnet = ({navigation}) => {
  const authState = useSelector((state) => state.auth);
  const email = authState.value.email;
  const { data, isLoading, error, refetch } = useGetUserQuery(email);
  const apodo = data?.data.card[0];
  const info = data?.data.card[1];
  const contacto = data?.data.card[2];
  const goHomeUsuario = () => {
    navigation.navigate('HomeUsuario');
}

useFocusEffect(
  React.useCallback(() => {
      refetch();
  }, [])
);
  return (
    <View style={styles.containerCarnet} >
    <Text style={styles.textTitle}>HOLA!</Text>
    <View style={styles.contenedorInput}>
    <Text style={styles.textCarnet}>MI APODO ES:</Text>

        <Text style={styles.inputRegistro}>{apodo}</Text>
        
        <Text style={styles.textCarnet}>PARA ENTENDERTE MEJOR NECESITO:</Text>
        <Text style={styles.inputRegistro2}>{info} </Text>

        <Text style={styles.textCarnet}>CONTACTO DE EMERGENCIA:</Text>
        <Text style={styles.inputRegistro}>{contacto} </Text>
    </View>
    <View style={styles.contenedorBotonAzul}>
        <TouchableOpacity onPress={goHomeUsuario} >
            <Image source={require('../../../../assets/back.png')} style={styles.botonAzul} />
        </TouchableOpacity>
    </View>
</View>
)
}
const styles = StyleSheet.create({
containerCarnet: {
flex: 1,
backgroundColor: '#eec144',
padding:15
},
textTitle: {
color: '#ff6600',
fontSize: 45,
fontWeight: '900',
marginLeft: 30,
marginTop: 70,
},
textCarnet: {
color: '#ffffff',
fontSize: 23,
fontWeight: '600',
marginTop: 20,
},
inputRegistro: {
width: 300,
marginTop: 30,
marginBottom: 20,
padding: 10,
borderRadius: 20,
backgroundColor: '#ffffff',
color: '#737474',
fontSize: 16,
width: '88%',
fontWeight: 'bold',
},
inputRegistro2: {
width: 300,
marginTop: 10,
marginBottom: 10,
padding: 10,
borderRadius: 20,
backgroundColor: '#ffffff',
color: '#737474',
fontSize: 16,
width: '88%',
height: 100,
fontWeight: 'bold',
},
contenedorInput:{
marginLeft:20,
},
contenedorBotonAzul: {
flexDirection: 'row',
justifyContent: 'space-between',
width: '80%',
marginLeft: 30,
marginTop: 60,
justifyContent: 'center',
alignItems: 'center',
},
botonAzul: {
width: 60,
height: 60,
borderRadius: 100,
backgroundColor: '#0e3ed9',

},
});

export default MiCarnet