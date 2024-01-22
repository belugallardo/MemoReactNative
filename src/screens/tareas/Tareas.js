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
import { useGetActividadQuery,useCreateActividadMutation } from '../../fectures/api/apiSlice';
import logoutImage from '../../../assets/logout.png';
import camera from '../../../assets/camera.png';
import backImage from '../../../assets/back.png';
import Camera from '../../components/Camera/camera';
import * as ImagePicker from 'expo-image-picker';



const Tareas = () => {
    //camara
    const [image, setImage] = useState('');
    // const [description, setDescription] = useState(''); // Agrega el estado para la descripción del usuario
    // const [userEmail, setUserEmail] = useState(''); // Agrega el estado para el email del usuario

    const [createActividad] = useCreateActividadMutation();

    const pickImagen = async () => {

        try {
            const { granted } = await ImagePicker.requestCameraPermissionsAsync()
            console.log("Permisos concedidos:", granted);
            if (granted) {
                let result = await ImagePicker.launchCameraAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    aspect: [4, 3],
                    quality: 1,
                });

                if (!result.canceled) {
                    setImage(result.assets[0]);
                    handleCreateActividad();
                }
            }
        } catch (error) {
            console.error("Error al interactuar con la cámara:", error);
        }
    }


    //envio de imagen a la api
    const handleCreateActividad = async () => {
        try {
            // Verifica que el email del usuario y la descripción estén disponibles antes de realizar la solicitud POST
            // const imageContent = image
            const categoria = "higiene"
            const filtro = "test"
            const email = "test@test"
            if (email && image && image.uri) {
                const formData = new FormData();
                formData.append('email', email);
                formData.append('categoria', categoria);
                formData.append('filtro', filtro);

                // Convierte la URI del archivo en un objeto File
                const file = {
                    uri: image.uri,
                    type: 'image/jpg',
                    name: 'image.jpg',
                };

                formData.append('pictograma', file);

                console.log("formulario", formData);


                const result = await createActividad(formData).unwrap();
                console.log('Respuesta de la API:', result);
            } else {
                console.warn('Email del usuario o imagen faltante. No se realizó la solicitud POST.');
            }
        } catch (error) {
            console.error('Error al crear actividad:', error);
        }
    };
        //fin


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


        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Buscar por filtro"
                    value={searchTerm}
                    onChangeText={(text) => setSearchTerm(text)}
                />
                <View style={styles.pictogramas}>
                    <FlatList
                        data={data ? data.data.document : []}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={renderImageUrlItem}
                        horizontal={true} // Cambio: renderiza las imágenes en posición horizontal
                        contentContainerStyle={styles.pictogramas} // Cambio: estilo para el contenedor de FlatList
                    />
                </View>

                <View style={styles.blueButtonContainer}>
                    <TouchableOpacity style={styles.blueButton} onPress={() => navigation.navigate('Home')}>
                        <Image source={backImage} style={styles.imageStyleButton} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.blueButton} onPress={pickImagen}>
                        <Image source={camera} style={styles.imageStyleButton} />
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
            flexWrap: 'wrap',
            flexDirection: 'row', // Cambio: establecer dirección de fila
            alignItems: 'center', // Cambio: centrar verticalmente las imágenes
        },

        selectedImageContainer: {
            borderColor: 'blue', // Puedes cambiar el color para indicar la selección
        },
        blueButtonContainer: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: 35,
        },
        imageStyleButton: {
            width: 70,
            height: 70,
        },
        pictogramas: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center'
        }
    });

    export default Tareas;



