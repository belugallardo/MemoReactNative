import React, { useState } from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { useGetActividadQuery } from '../../fectures/api/apiSlice';
import logoutImage from '../../../assets/logout.png';
import backImage from '../../../assets/back.png';

const Tareas = () => {
    const { data, isLoading, error } = useGetActividadQuery();
    const [selectedImages, setSelectedImages] = useState(new Set());
    const [searchTerm, setSearchTerm] = useState('');

    const toggleImageSelection = (imageUrl) => {
        const newSelectedImages = new Set(selectedImages);
        if (newSelectedImages.has(imageUrl)) {
            newSelectedImages.delete(imageUrl);
        } else {
            newSelectedImages.add(imageUrl);
        }
        setSelectedImages(newSelectedImages);
    };

    const renderImageUrlItem = ({ item }) => {
        // Filtra las imágenes según el término de búsqueda en el campo "filtro"
        if (searchTerm && !item.filtro.some((filtroItem) => filtroItem.includes(searchTerm))) {
            return null;
        }

        return (
            <TouchableOpacity
                style={[
                    styles.imageContainer,
                    selectedImages.has(item.imageUrl) && styles.selectedImageContainer,
                ]}
                onPress={() => toggleImageSelection(item.imageUrl)}
            >
                <Image source={{ uri: item.imageUrl }} style={styles.imageStyle} />
            </TouchableOpacity>
        );
    };

    const agregarTareasSeleccionadas = () => {
        const tareasSeleccionadas = Array.from(selectedImages);
        console.log(tareasSeleccionadas)
        // Realiza el POST a la API con las tareasSeleccionadas
        // Puedes utilizar fetch o cualquier librería para manejar las solicitudes HTTP

        // Ejemplo:
        fetch('tu-url-de-api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ tareas: tareasSeleccionadas }),
        })
            .then((response) => response.json())
            .then((data) => {
                // Maneja la respuesta de la API según tus necesidades
                console.log('Respuesta de la API:', data);
            })
            .catch((error) => {
                console.error('Error al realizar la solicitud POST:', error);
            });
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Buscar por filtro"
                value={searchTerm}
                onChangeText={(text) => setSearchTerm(text)}
            />
            <FlatList
                data={data ? data.data.document : []}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderImageUrlItem}
            />
            <TouchableOpacity
                style={styles.addButton}
                onPress={agregarTareasSeleccionadas}
            >
                <Text>Agregar Tareas Seleccionadas</Text>
            </TouchableOpacity>

            <View style={styles.blueButtonContainer}>
                <TouchableOpacity style={styles.blueButton} onPress={() => navigation.navigate('Home')}>
                    <Image source={backImage} style={styles.imageStyleButton} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.blueButton} onPress={() => navigation.navigate('Home')}>
                    <Image source={logoutImage} style={styles.imageStyleButton} />
                </TouchableOpacity>
            </View>
        </View>



    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    addButton: {
        backgroundColor: 'lightblue',
        padding: 10,
        alignItems: 'center',
        marginBottom: 10,
    },
    imageStyle: {
        width: 70,
        height: 70,
        
    },
    imageContainer: {
        margin: 5,
        borderWidth: 2,
        borderColor: '#ccc',
        borderRadius: 8,
        overflow: 'hidden',
        flexDirection: 'row', // Cambio: establecer dirección de fila
        alignItems: 'center', // Cambio: centrar verticalmente las imágenes
    },

    selectedImageContainer: {
        borderColor: 'blue', // Puedes cambiar el color para indicar la selección
    },
    blueButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 35,
    },
    imageStyleButton: {
        width: 70,
        height: 70,
    },
});

export default Tareas;

