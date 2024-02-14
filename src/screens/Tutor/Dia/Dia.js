import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setDia } from '../../../fectures/estadoCOmponente/estadoComponente';
import { useEditPictoMutation, useGetRutinaEmailQuery } from '../../../fectures/api/apiSlice';
import backImage from '../../../../assets/back.png';
import homeUsuario from '../../../../assets/home.png';
import { useFocusEffect } from '@react-navigation/native';


const Dia = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const infoRedux = useSelector((state) => state.setdia);
    const { dia: diaEstado } = infoRedux.value;
    const diaEnMayuscula = diaEstado.toUpperCase();
    const authState = useSelector((state) => state.auth);
    const email = authState.value.email;
    const [edPicto] = useEditPictoMutation();
    const goToCategorias = (momento) => {
        dispatch(setDia({ dia: diaEstado, momento }));
        navigation.navigate('CategoriasTutor', { momento });
    };
    const goHomeUsuario = () => {
        navigation.navigate('HomeUsuario')
    }
    
    const goHomeTutor = () => {
        navigation.navigate('HomeTutor')
    }
    
    const { data, isLoading, error, refetch } = useGetRutinaEmailQuery(email);
    useFocusEffect(
        React.useCallback(() => {
            refetch();
        }, [])
    );

    useEffect(() => {
        if (isLoading) {
            console.log('Loading...');
        }

        if (error) {
            console.error('Error:', error);
        }
    }, [isLoading, error, refetch]);

    const dataRutina = data?.document || [];
    const datosAlmacenados = dataRutina.map(item => item.rutina[diaEstado]);
    const [modoEdicion, setModoEdicion] = useState(false);
    const [selectedImages, setSelectedImages] = useState(new Set());
    const [momento, setMomento] = useState(''); 
    const [selectedImageIndex, setSelectedImageIndex] = useState(-1); 
    const activarModoEdicion = () => {
        setModoEdicion(true);
    };
    const desactivarModoEdicion = () => {
        setModoEdicion(false);
        setSelectedImages(new Set());
        setSelectedImageIndex(-1);
    };

    const pictoAEliminar = {
        email: email,
        dia: diaEstado,
        horario: momento,
        index: selectedImageIndex
    };


    const eliminarImagen = async () => {
        await edPicto(pictoAEliminar);
        refetch();
        desactivarModoEdicion(); 
    };
    const toggleImageSelection = (imageUrl, index, momento) => {
        setSelectedImageIndex(index); 
        setMomento(momento); 
        setSelectedImages(new Set([`${momento}_${index}`])); 
    };
    const renderIcon = ({ item, index, momento }) => (
        <TouchableOpacity
            key={index}
            style={[
                styles.imageContainer,
                selectedImages.has(`${momento}_${index}`) && styles.selectedImageContainer,
            ]}
            onPress={() => modoEdicion && toggleImageSelection(item, index, momento)}
        >
            <Image source={{ uri: item }} style={styles.imageStyle} />
        </TouchableOpacity>
    );
    const renderSeccion = (momento) => (
        <View>
            <View style={styles.seccionContainer}>
                <TouchableOpacity style={styles.customButton} onPress={() => goToCategorias(momento)}>
                    <Text style={styles.button}>+</Text>
                </TouchableOpacity>
                    <FlatList
                        data={datosAlmacenados[0]?.[momento.toLowerCase()] || []}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => renderIcon({ item, index, momento })}
                        horizontal={true}
                    />
            </View>
        </View>
    );
    return (
        <View style={styles.contenedor}>
            <Text style={styles.titulo}>{`${diaEnMayuscula}`}</Text>
            <View style={styles.containerEdit}>
                <TouchableOpacity
                    style={styles.customBottonEdit}
                    onPress={modoEdicion ? desactivarModoEdicion : activarModoEdicion}>
                    <Text style={styles.buttonEdit}>{modoEdicion ? 'Cancelar' : 'Editar'}</Text>
                </TouchableOpacity>
                {modoEdicion && (
                    <TouchableOpacity style={styles.customBottonEliminar} onPress={eliminarImagen} disabled={selectedImages.size === 0}>
                        <Text style={styles.buttonEliminar}>Eliminar</Text>
                    </TouchableOpacity>
                )}
            </View>
            <Text style={styles.text}>MAÑANA</Text>
            {renderSeccion('manana')}
            <Text style={styles.text}>TARDE</Text>
            {renderSeccion('tarde')}
            <Text style={styles.text}>NOCHE</Text>
            {renderSeccion('noche')}
            <View style={styles.blueButtonContainer}>
                <TouchableOpacity style={styles.blueButton} onPress={goHomeTutor}>
                    <Image source={backImage} style={styles.imageStyleButton} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.blueButton} onPress={goHomeUsuario}>
                    <Image source={homeUsuario} style={styles.imageStyleButton} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    contenedor: {
        marginTop: 60,
        marginLeft: 10,
    },
    titulo: {
        marginLeft: 20,
        fontSize: 45,
        color: '#2372d9',
        fontWeight: 'bold',
    },
    containerEdit: {
        flexDirection: 'row',
        justifyContent: 'flex-end',

        marginTop: 10,
    },
    customBottonEdit: {
        height: 40,
        width: 100,
        margin: 15,
        paddingVertical: 10,
        borderRadius: 10,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#737474',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonEdit: {
        color: '#2372d9',
        fontWeight: 'bold',
        fontSize: 16,
    },
    customBottonEliminar: {
        width: 100,
        height: 40,
        margin: 15,
        paddingVertical: 10,
        borderRadius: 10,
        backgroundColor: '#ff0000', 
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#737474',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonEliminar: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    seccionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    text: {
        marginLeft: 20,
        color: '#2372d9',
        fontWeight: '900',
        fontSize: 20,
    },
    customButton: {
        width: 60,
        height:70,
        margin: 15,
        paddingVertical: 15,
        borderRadius: 10,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#737474',
        shadowOffset: {
            width: 0,
            height: 2,
        },
    },
    imageContainer: {
        margin: 7,
        borderWidth: 2,
        borderColor: '#ccc',
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    imageStyle: {
        width: 70,
        height: 70,
    },
    selectedImageContainer: {
        borderColor: 'blue',
    },
    blueButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 35,
        marginTop:50,
        marginHorizontal: 45,
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
    imageStyleButton: {
        width: 70,
        height: 70,
    },
});

export default Dia;