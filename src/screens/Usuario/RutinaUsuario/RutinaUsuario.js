// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, FlatList, Image , TouchableOpacity} from 'react-native';
// import { useSelector } from 'react-redux';
// import { useGetRutinaEmailQuery } from '../../../fectures/api/apiSlice';
// import homeUsuario from '../../../../assets/home.png';

// const RutinaUsuario = ({navigation}) => {
//   const [dayOfWeek, setDayOfWeek] = useState('');
//   const [datosAlmacenados, setDatosAlmacenados] = useState({});
//   const authState = useSelector((state) => state.auth);
//   const email = authState.value.email;
//   const { data } = useGetRutinaEmailQuery(email);

//   const goHomeUsuario = () => {
//     navigation.navigate('HomeUsuario')
// }

//   const getDayOfWeek = () => {
//     const days = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
//     const dayIndex = new Date().getDay();
//     setDayOfWeek(days[dayIndex]);
//   };

//   useEffect(() => {
//     getDayOfWeek();
//   }, []);

//   useEffect(() => {
//     if (data && data.document) {
//       const rutinaDia = data.document[0].rutina[dayOfWeek]; // Obtenemos las rutinas solo para el día actual
//       setDatosAlmacenados(rutinaDia);
//     }
//   }, [dayOfWeek, data]);

//   return (
//     <View>
//       <Text style={styles.title}>{dayOfWeek}</Text>
//       <FlatList
//         data={Object.keys(datosAlmacenados)}
//         keyExtractor={(item, index) => index.toString()}
//         renderItem={({ item }) => (
//           <View>
//             <Text style={styles.subTitle}>{item}</Text>
//             <FlatList
//               data={datosAlmacenados[item]}
//               keyExtractor={(subItem, subIndex) => subIndex.toString()}
//               renderItem={({ item: subItem }) => (
//                 <Image source={{ uri: subItem }} style={styles.imageStyle} />
//               )}
//               style={styles.flatList}
//             />
//           </View>
//         )}
//       />
//                   <View style={styles.blueButtonContainer}>
//                 <TouchableOpacity style={styles.blueButton} onPress={goHomeUsuario}>
//                     <Image source={homeUsuario} style={styles.imageStyleButton} />
//                 </TouchableOpacity>
//                 <TouchableOpacity style={styles.blueButton} onPress={goHomeUsuario}>
//                     <Image source={homeUsuario} style={styles.imageStyleButton} />
//                 </TouchableOpacity>
//             </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   title: {
//     fontSize: 40,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     margin: 30,
//   },
//   subTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginVertical: 10,
//   },
//   imageStyle: {
//     width: 90,
//     height: 90,
//     margin: 5,
//   },
//   subTitle:{
//     fontSize: 20,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginVertical: 10,
//   },
//   flatList:{
//     display: 'flex',
//     flexDirection: 'row',
//   },
//   blueButton: {
//     width: 30,
//     height: 60,
//     marginTop: 1,
//     borderRadius: 100,
//     backgroundColor: '#0a06f1',
//     justifyContent: 'center',
//     alignItems: 'center',
// },
// blueButtonContainer: {
//   flexDirection: 'row',
//   justifyContent: 'space-between',
//   margin: 35,
//   marginHorizontal:45,
// },
// imageStyleButton: {
//   width: 70,
//   height: 70,
// },
// });

// export default RutinaUsuario;
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image , TouchableOpacity} from 'react-native';
import { useSelector } from 'react-redux';
import { useGetRutinaEmailQuery } from '../../../fectures/api/apiSlice';
import homeUsuario from '../../../../assets/home.png';

const RutinaUsuario = ({navigation}) => {
  const [dayOfWeek, setDayOfWeek] = useState('');
  const [datosAlmacenados, setDatosAlmacenados] = useState({});
  const authState = useSelector((state) => state.auth);
  const email = authState.value.email;
  const { data, refetch } = useGetRutinaEmailQuery(email);

  const goHomeUsuario = () => {
    navigation.navigate('HomeUsuario');
  };

  const getDayOfWeek = () => {
    const days = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
    const dayIndex = new Date().getDay();
    setDayOfWeek(days[dayIndex]);
  };

  useEffect(() => {
    getDayOfWeek();
  }, []);

  useEffect(() => {
    if (data && data.document) {
      const rutinaDia = data.document[0].rutina[dayOfWeek]; // Obtenemos las rutinas solo para el día actual
      setDatosAlmacenados(rutinaDia);
    }
  }, [dayOfWeek, data]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      refetch(); // Realizar refetch al enfocar en esta pantalla
    });

    return unsubscribe;
  }, [navigation, refetch]);

  return (
    <View>
      <Text style={styles.title}>{dayOfWeek}</Text>
      <FlatList
        data={datosAlmacenados ? Object.keys(datosAlmacenados) : []}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            <Text style={styles.subTitle}>{item}</Text>
            <FlatList
              data={datosAlmacenados[item]}
              keyExtractor={(subItem, subIndex) => subIndex.toString()}
              renderItem={({ item: subItem }) => (
                <Image source={{ uri: subItem }} style={styles.imageStyle} />
              )}
              style={styles.flatList}
            />
          </View>
        )}
      />
      <View style={styles.blueButtonContainer}>

        <TouchableOpacity style={styles.blueButton} onPress={goHomeUsuario}>
          <Image source={homeUsuario} style={styles.imageStyleButton} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 30,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  imageStyle: {
    width: 90,
    height: 90,
    margin: 5,
  },
  subTitle:{
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  flatList:{
    display: 'flex',
    flexDirection: 'row',
  },
  blueButton: {
    width: 30,
    height: 60,
    marginTop: 1,
    borderRadius: 100,
    backgroundColor: '#0a06f1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  blueButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 35,
    marginHorizontal:45,
  },
  imageStyleButton: {
    width: 70,
    height: 70,
  },
});

export default RutinaUsuario;
