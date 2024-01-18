import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SelecTutorUser from '../components/SelecTutorUser/SelecTutorUser';
import HomeUsuario from '../screens/HomeUsuario/HomeUsuario';
import HomeTutor from '../screens/HomeTutor/HomeTutor';
import Tareas from '../screens/tareas/Tareas';
import { HomeLogin } from '../screens/HomeLogin/HomeLogin';
import HomeInicio from '../screens/HomeInicio/HomeInicio';
import EnConstruccion from '../screens/EnConstruccion/EnContruccion';


const Stack = createStackNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeInicio} />
      <Stack.Screen name="Login" component={HomeLogin} />
      <Stack.Screen name="Tareas" component={Tareas} />
      <Stack.Screen name="HomeTutor" component={HomeTutor} />
      <Stack.Screen name="HomeUsuario" component={HomeUsuario} />
      <Stack.Screen name="SelecTutorUser" component={SelecTutorUser} />
      <Stack.Screen name="EnConstruccion" component={EnConstruccion} />
      {/* <Stack.Screen name="Settings" component={Settings} /> */}
    </Stack.Navigator>
  );
}

export default StackNavigator;