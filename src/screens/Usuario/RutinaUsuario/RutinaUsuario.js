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
//   const { data, refetch } = useGetRutinaEmailQuery(email);

//   const goHomeUsuario = () => {
//     navigation.navigate('HomeUsuario');
//   };

//   const getDayOfWeek = () => {
//     const days = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
//     const options = { weekday: 'long', timeZone: 'America/Argentina/Buenos_Aires' };
//     const dayIndex = new Date().getDay();
//     const dayOfWeek = new Date().toLocaleString('es-AR', options);
//     setDayOfWeek(days[dayIndex]);
//   };

//   useEffect(() => {
//     getDayOfWeek();
//   }, []);

//   useEffect(() => {
//     if (data && data.document) {
//       const rutinaDia = data.document[0].rutina[dayOfWeek]; 
//       setDatosAlmacenados(rutinaDia);
//     }
//   }, [dayOfWeek, data]);

//   useEffect(() => {
//     const unsubscribe = navigation.addListener('focus', () => {
//       refetch(); 
//     });

//     return unsubscribe;
//   }, [navigation, refetch]);


//   const diaEnMayuscula = dayOfWeek.toUpperCase();
  
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>{diaEnMayuscula}</Text>
//       <FlatList
//         data={datosAlmacenados ? Object.keys(datosAlmacenados) : []}
//         keyExtractor={(item, index) => index.toString()}
//         renderItem={({ item }) => (
//           <View style={styles.containerSubtitle}>
//             <Text style={styles.subTitle}>{item}</Text>
//             <FlatList
//               data={datosAlmacenados[item]}
//               keyExtractor={(subItem, subIndex) => subIndex.toString()}
//               renderItem={({ item: subItem }) => (
//                 <Image source={{ uri: subItem }} style={styles.imageStyle} />
//               )}
//               style={styles.flatList}
//               horizontal={true}
//             />
//           </View>
//         )}
//       />
//       <View style={styles.blueButtonContainer}>
//         <TouchableOpacity style={styles.blueButton} onPress={goHomeUsuario}>
//           <Image source={homeUsuario} style={styles.imageStyleButton} />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container:{
//     marginTop: 50,
//   },
//   title: {
//     fontSize: 40,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     margin: 30,
//     color: '#ff6600'
//   },
//   subTitle: {
//     fontSize: 20,
//     fontWeight: '700',
//     textAlign: 'center',
//     marginVertical: 10,
//     textTransform:'uppercase',
//     color: '#2372d9',
//   },
//   containerSubtitle:{
// alignItems:'flex-start',
// marginLeft: 20,
//   },
//   imageStyle: {
//     width: 90,
//     height: 90,
//     margin: 5,
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
//   },
//   blueButtonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     margin: 35,
//     marginHorizontal:45,
//   },
//   imageStyleButton: {
//     width: 70,
//     height: 70,
//   },
//   flatList:{
//     margin: 10,
//   }
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
    const days = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado',];
    const dayIndex = new Date().getDay()-1;
    setDayOfWeek(days[dayIndex]);
  };

  useEffect(() => {
    getDayOfWeek();
  }, []);

  useEffect(() => {
    if (data && data.document) {
      const rutinaDia = data.document[0].rutina[dayOfWeek]; 
      setDatosAlmacenados(rutinaDia);
    }
  }, [dayOfWeek, data]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      refetch(); 
    });

    return unsubscribe;
  }, [navigation, refetch]);


  const diaEnMayuscula = dayOfWeek.toUpperCase();
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{diaEnMayuscula}</Text>
      <FlatList
        data={datosAlmacenados ? Object.keys(datosAlmacenados) : []}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.containerSubtitle}>
            <Text style={styles.subTitle}>{item}</Text>
            <FlatList
              data={datosAlmacenados[item]}
              keyExtractor={(subItem, subIndex) => subIndex.toString()}
              renderItem={({ item: subItem }) => (
                <Image source={{ uri: subItem }} style={styles.imageStyle} />
              )}
              style={styles.flatList}
              horizontal={true}
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
  container:{
    marginTop: 50,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 30,
    color: '#ff6600'
  },
  subTitle: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginVertical: 10,
    textTransform:'uppercase',
    color: '#2372d9',
  },
  containerSubtitle:{
alignItems:'flex-start',
marginLeft: 20,
  },
  imageStyle: {
    width: 90,
    height: 90,
    margin: 5,
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
  flatList:{
    margin: 10,
  }
});

export default RutinaUsuario;