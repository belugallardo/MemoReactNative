import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SelecTutorUser from '../components/SelecTutorUser/SelecTutorUser';
import HomeUsuario from '../screens/Usuario/HomeUsuario/HomeUsuario';
import HomeTutor from '../screens/Tutor/HomeTutor/HomeTutor';
import Tareas from '../screens/tareas/Tareas';
import { HomeLogin } from '../screens/HomeLogin/HomeLogin';
import HomeInicio from '../screens/HomeInicio/HomeInicio';
import EnConstruccion from '../screens/EnConstruccion/EnContruccion';
import CategoriasTutor from '../screens/Tutor/Categorias/categorias';
import Semana from '../screens/Tutor/Semana/Semana';
import Dia from '../screens/Tutor/Dia/Dia';
import Registro from '../screens/Registro/Registro';
import { useSelector } from 'react-redux';
import LoginTutor from '../screens/Tutor/LoginTutor/LoginTutor';

const Stack = createStackNavigator();

function StackNavigator() {

  const idToken = useSelector((state) => state.auth && state.auth.value && state.auth.value.idToken);



  return (
    <Stack.Navigator>
      {idToken ? (
        // Usuario autenticado, mostrar HomeUsuario
        // <Stack.Screen name="HomeUsuario" component={HomeUsuario} />
        <>
        <Stack.Screen name="HomeUsuario" component={HomeUsuario} />
        <Stack.Screen name="HomeTutor" component={HomeTutor} />
        <Stack.Screen name="Tareas" component={Tareas} />
        <Stack.Screen name="SelecTutorUser" component={SelecTutorUser} />
        <Stack.Screen name="CategoriasTutor" component={CategoriasTutor} />
        <Stack.Screen name="Semana" component={Semana} />
        <Stack.Screen name="Dia" component={Dia} />
        <Stack.Screen name="LoginTutor" component={LoginTutor} />
        </>
      ) : (
        // Usuario no autenticado, mostrar otras pantallas
        <>
        
      <Stack.Screen name="Home" component={HomeInicio} />
      <Stack.Screen name="Login" component={HomeLogin} />
      {/* <Stack.Screen name="HomeTutor" component={HomeTutor} /> */}
      {/* <Stack.Screen name="HomeUsuario" component={HomeUsuario} /> */}
      <Stack.Screen name="EnConstruccion" component={EnConstruccion} />
      <Stack.Screen name="Registro" component={Registro} />
      {/* <Stack.Screen name="Settings" component={Settings} /> */}
      </>
      )}
    </Stack.Navigator>
  );
}

export default StackNavigator;