import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setDia } from '../../../fectures/estadoCOmponente/estadoComponente';
import { useGetRutinaEmailQuery } from '../../../fectures/api/apiSlice';


const Dia = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const infoRedux = useSelector((state) => state.setdia);
    const { dia: diaEstado } = infoRedux.value;

    const goToCategorias = (momento) => {
        dispatch(setDia({ dia: diaEstado, momento }));
        navigation.navigate('CategoriasTutor', { momento });
    };

    const { data, isLoading, error, refetch } = useGetRutinaEmailQuery('emy@gmail.com');

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
    const [selectedImageURL, setSelectedImageURL] = useState('');

    const activarModoEdicion = () => {
        setModoEdicion(true);
    };

    const desactivarModoEdicion = () => {
        setModoEdicion(false);
        setSelectedImages(new Set());
    };


    const eliminarImagen = () => {
        // Utiliza selectedImageURL y momento para realizar las acciones necesarias
        console.log(`Eliminar imagen: ${selectedImageURL} en el momento ${momento}`);
    
        const nuevasImagenes = datosAlmacenados.map((item) => {
            const nuevasRutinas = { ...item };
            Object.keys(nuevasRutinas).forEach((momento) => {
                nuevasRutinas[momento.toLowerCase()] = nuevasRutinas[momento.toLowerCase()].filter(
                    (url) => !selectedImages.has(url)
                );
            });
            console.log(nuevasRutinas);
            return nuevasRutinas;
        });
    
        // Aquí puedes agregar la lógica para enviar las imágenes eliminadas a la API si es necesario
        // refetch();
    
        desactivarModoEdicion(); // Desactivar el modo de edición y limpiar las imágenes seleccionadas
    };
    


    const toggleImageSelection = (imageUrl) => {
        const newSelectedImages = new Set(selectedImages);
        if (newSelectedImages.has(imageUrl)) {
            newSelectedImages.delete(imageUrl);
            setSelectedImageURL('');
        } else {
            newSelectedImages.add(imageUrl);
            setSelectedImageURL(imageUrl);
        }
        setSelectedImages(newSelectedImages);
    
        // Ahora `selectedImageURL` contiene la URL de la imagen seleccionada y `diaEstado` contiene el momento asociado.
    };
    
    
    const renderIcon = ({ item, index }) => (
        <TouchableOpacity
            key={index}
            style={[
                styles.imageContainer,
                selectedImages.has(item) && styles.selectedImageContainer,
            ]}
            onPress={() => modoEdicion && toggleImageSelection(item)}
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
                    renderItem={renderIcon}
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

            {renderSeccion('MANANA')}
            {renderSeccion('TARDE')}
            {renderSeccion('NOCHE')}
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
});

export default Dia;