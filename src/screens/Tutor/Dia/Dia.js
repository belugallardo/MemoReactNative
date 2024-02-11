import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setDia } from '../../../fectures/estadoCOmponente/estadoComponente';
import { useEditPictoMutation, useGetRutinaEmailQuery } from '../../../fectures/api/apiSlice';
import backImage from '../../../../assets/back.png';
import homeUsuario from '../../../../assets/home.png';

const Dia = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const infoRedux = useSelector((state) => state.setdia);
    const { dia: diaEstado } = infoRedux.value;
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

    useEffect(() => {
        if (isLoading) {
            console.log('Loading...');
        }

        if (error) {
            console.error('Error:', error);
        }
    }, [isLoading, error]);

    const dataRutina = data?.document || [];
    const datosAlmacenados = dataRutina.map(item => item.rutina[diaEstado]);

    const [modoEdicion, setModoEdicion] = useState(false);
    const [selectedImages, setSelectedImages] = useState(new Set());
    //const [selectedImageURL, setSelectedImageURL] = useState('');
    const [momento, setMomento] = useState(''); // Nuevo estado para almacenar el momento del día seleccionado
    const [selectedImageIndex, setSelectedImageIndex] = useState(-1); // Nuevo estado para almacenar el índice de la ima

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
        desactivarModoEdicion(); // Desactivar el modo de edición y limpiar la selección de imágenes

    };


    const toggleImageSelection = (imageUrl, index, momento) => {
        console.log('esto llega en el toggle', imageUrl, index, momento);
        setSelectedImageIndex(index); // Almacenar el índice de la imagen seleccionada
        setMomento(momento); // Almacenar el momento del día actual
        setSelectedImages(new Set([`${momento}_${index}`])); // Almacenar la combinación de momento e índice como identificador único de la imagen seleccionada
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
            <Text style={styles.text}>{momento}</Text>
            <View style={styles.seccionContainer}>
                <TouchableOpacity style={styles.customButton} onPress={() => goToCategorias(momento)}>
                    <Text style={styles.button}>+</Text>
                </TouchableOpacity>
                <FlatList
                    data={datosAlmacenados[0]?.[momento.toLowerCase()] || []}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => renderIcon({ item, index, momento })}
                    numColumns={3}
                    contentContainerStyle={styles.pictogramas}
                    style={styles.flatList}
                />
            </View>
        </View>
    );


    return (
        <View>
            <Text style={styles.titulo}>{`${diaEstado}`}</Text>
            <View style={styles.containerEdit}>
                <TouchableOpacity
                    style={styles.customBottonEdit}
                    onPress={modoEdicion ? desactivarModoEdicion : activarModoEdicion}
                >
                    <Text style={styles.buttonEdit}>{modoEdicion ? 'Cancelar' : 'Editar'}</Text>
                </TouchableOpacity>

                {modoEdicion && (
                    <TouchableOpacity style={styles.customBottonEliminar} onPress={eliminarImagen} disabled={selectedImages.size === 0}>
                        <Text style={styles.buttonEliminar}>Eliminar</Text>
                    </TouchableOpacity>
                )}
            </View>

            {renderSeccion('manana')}
            {renderSeccion('tarde')}
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
    titulo: {
        marginTop: 20,
        fontSize: 50,
        color: '#000000',
        fontWeight: 'bold',
    },
    containerEdit: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    customBottonEdit: {
        width: 100,
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
        margin: 15,
        paddingVertical: 15,
        borderRadius: 10,
        backgroundColor: '#ff0000', // Cambiado a rojo para representar eliminar
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
        marginTop: 15,
        marginLeft: 20,
        color: '#2372d9',
        fontWeight: 'bold',
        fontSize: 15,
    },
    customButton: {
        width: 60,
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
        width: 90,
        height: 90,
    },
    selectedImageContainer: {
        borderColor: 'blue',
    },
    blueButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 35,
        marginHorizontal:45,
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