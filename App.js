import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomeInicio from './src/components/HomeInicio/HomeInicio';
import { HomeLogin } from './src/components/HomeLogin/HomeLogin';
import 'react-native-gesture-handler';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";
import Tareas from './src/screens/tareas/Tareas';
import HomeTutor from './src/components/HomeTutor/HomeTutor';
import HomeUsuario from './src/components/HomeUsuario/HomeUsuario';
import SelecTutorUser from './src/components/SelecTutorUser/SelecTutorUser';



export default function App() {

  const Stack = createStackNavigator();

  function MyStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeInicio} />
        <Stack.Screen name="Login" component={HomeLogin} />
        <Stack.Screen name="Tareas" component={Tareas} />
        <Stack.Screen name="HomeTutor" component={HomeTutor} />
        <Stack.Screen name="HomeUsuario" component={HomeUsuario} />
        <Stack.Screen name="SelecTutorUser" component={SelecTutorUser} />
        {/* <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Settings" component={Settings} /> */}
      </Stack.Navigator>
    );
  }
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


