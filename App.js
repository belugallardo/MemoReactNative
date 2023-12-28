import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from './src/navigation/navigation';
import { store } from './src/app/store'
import { Provider } from 'react-redux'

// export default function App() {
//   return (
//     <NavigationContainer>
//       <StackNavigator/>
//     </NavigationContainer>
//   );
// }

export default function App() {
  return (
  <Provider store={store}>  
    <NavigationContainer>
      <StackNavigator/>
    </NavigationContainer>
  </Provider>
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


