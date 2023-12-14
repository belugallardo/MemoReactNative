import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, } from 'react-native';
import GoogleButton from '../ButtonGoogle/ButtonGoogle';
import { getAuth, GoogleAuthProvider, signInWithPopup ,signInWithCredential,signInWithRedirect,signInWithGoogle } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import axios from 'axios';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';



export const HomeLogin = ({navigation}) => {

  
  
  const [firebaseConfig, setFirebaseConfig] = useState(null);
  
  const signInWithGoogleMethod = async () => {
    try {
      const response = await axios.get('http://192.168.100.2:8080/login');

      if (!response.data) {
        throw new Error('Empty response from server');
      }

      // Almacena la configuración en el estado
      setFirebaseConfig(response.data);
      // Inicializar Firebase en el cliente con la configuración obtenida
      const app = initializeApp(response.data);
      const auth = getAuth(app);
      
      const provider = new GoogleAuthProvider();{

      }
      // const result = await signInWithPopup(auth, provider);
      const result = await signInWithGoogle(auth, provider);

      // Usuario autenticado con éxito
      const user = credential.user;
      const tokenInfo = await user.getIdTokenResult();
      console.log('Usuario autenticado:', user.tokenInfo);
      console.log('PRUEBA USER TOKEN: ', user.tokenInfo) //propiedad accesToken
      const token = await user.getIdToken(); // metodo para pedir el token
      console.log('Token de usuario logueado: ', token);



      // Hacer una solicitud GET a la ruta /contacto con el token
      const contactoResponse = await axios.get('http://localhost:5000/api/contacto', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Respuesta de la ruta /contacto:', contactoResponse.data);
    } catch (error) {
      console.error('Error signing in with Google:', error.message);
    }
  };

  const HomeInicio = () => {
    navigation.navigate('Home'); 
  };

  // const contactohandler = async () => {
  //   // Hacer una solicitud GET a la ruta /contacto con el token
  //   const token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjBiYmQyOTllODU2MmU3MmYyZThkN2YwMTliYTdiZjAxMWFlZjU1Y2EiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiSm9yZ2UgTG96YW5vIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0pqLURhNHpaQ3U0b0hCSDJiSjVPYkw5TTZvNnBicmEzYm0zSHlrUUUzUzJ1WHQ9czk2LWMiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZXZlbnR3YXZlLWFyIiwiYXVkIjoiZXZlbnR3YXZlLWFyIiwiYXV0aF90aW1lIjoxNzAxMjEyODIwLCJ1c2VyX2lkIjoiaGZPSk85TFI3aVdBYzg5THJIcjBUeTZFcjFFMiIsInN1YiI6ImhmT0pPOUxSN2lXQWM4OUxySHIwVHk2RXIxRTIiLCJpYXQiOjE3MDEyMTI4MjAsImV4cCI6MTcwMTIxNjQyMCwiZW1haWwiOiJwdW50b25ldGF6dWxAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZ29vZ2xlLmNvbSI6WyIxMDg5MTY3NzAzNzEwOTQ1NjczMzAiXSwiZW1haWwiOlsicHVudG9uZXRhenVsQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6Imdvb2dsZS5jb20ifX0.jhC_xeeVUlY8gGhAes8kEsoBlyylvyVBFPBO7YCo3JOuTWiACs-YZ1noUGISfA3iY4SRC8Co7JTPGi41-C14I-xhqbc_ullN9uvwyW4-KLdpKszb5D2B8V0zEVQ6guPk8ryeXhTOzBmF9eJhYDoNtSzhtRLBWT6Du1_zeBUFqqLiJELjJrv1RUakYU6_hO90L9Zhy0Evv9GkSYpupN2M4b-AFZrOQY5T8iMlzr8270o5F_XL51l6B83Tw_IhVTVniD7O2fk_sOSR9_fHSlksGW1G3l0pYtu8XScF1PheK_RBoCRvslfnHof0v_oaFFjx14Rzx3FwHzEF1DA9RxgACQ'
  //   try {
  //     const contactoResponse = await axios.get('http://localhost:5000/api/contacto', {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     console.log('Respuesta de la ruta /contacto:', contactoResponse.data);
  //   } catch (error) {
  //     console.error('Error signing in with Google:', error.message);
  //   }
  // }
  return (
    <View style={styles.containerRegister}>
      <View style={styles.hero}>
        <View style={styles.formRegistro}>
          <View style={styles.titulo}>
            <Text style={styles.tituloText}>Login</Text>
          </View>
          <Text style={styles.subtitulo}>EMAIL:</Text>
          <TextInput
            style={styles.inputRegistro}
            placeholder="Enter your email"
          // Otros atributos aquí, como onChangeText, value, etc.
          />
          <Text style={styles.subtitulo}>CONTRASEÑA:</Text>
          <TextInput
            style={styles.inputRegistro}
            secureTextEntry={true}
            placeholder="Enter your password"
          // Otros atributos aquí, como onChangeText, value, etc.
          />
          <TouchableOpacity >
            <Text style={styles.olvideContrasenia}>OLVIDÉ MI CONTRASEÑA</Text>
          </TouchableOpacity>

              <GoogleButton onPress={signInWithGoogleMethod}/>

          <View style={styles.contenedorBotonAzul}>
            {/* Los botones con sus imágenes */}
            <TouchableOpacity onPress={HomeInicio} >
              <Image  source={require('../../../assets/back.png')} style={styles.botonAzul}  />
            </TouchableOpacity>
            <TouchableOpacity onPress={HomeInicio} >
              <Image  source={require('../../../assets/accept.png')} style={styles.botonAzul} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

// Estilos (aproximados) en React Native
const styles = {
  containerRegister: {
    flex: 4,
    // justifyContent: 'center',
    backgroundColor: '#ECECF5',
    width: '100%'
  },
  hero: {
    marginTop: 200,
  },
  formRegistro: {
    width: '100%',
    alignItems: 'center',
  },
  titulo: {
    marginBottom: 20,
  },
  tituloText: {
    color: '#FF6600',
    letterSpacing: 3,
    fontSize: 40,
     // Ajusta la fuente a la importada
  },
  subtitulo: {
    color: '#737474',
    fontSize: 16,
    paddingVertical: 5,
    fontFamily: 'nunito', // Ajusta la fuente a la importada
  },
  inputRegistro: {
    width: 300,
    marginBottom: 20,
    padding: 10,
    borderRadius: 100,
    backgroundColor: '#ffffff',
    color: '#737474',
    fontSize: 16,
    fontFamily: 'nunito', // Ajusta la fuente a la importada
    width: '88%'
  },
  olvideContrasenia: {
    color: '#206ce5',
    fontSize: 14,
    marginTop: 15,
    fontFamily: 'nunito', // Ajusta la fuente a la importada
  },
  contenerContrasenia: {
    alignItems: 'center',
  },
  contenedorBotonAzul: {
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '65%', // Porcentaje del ancho del contenedor padre
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
};
