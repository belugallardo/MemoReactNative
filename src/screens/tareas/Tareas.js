import React, { useState, useEffect } from 'react';
import {
    View,
    FlatList,
    Image,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    useWindowDimensions,
    ActivityIndicator,
} from 'react-native';
import { useGetActividadQuery, useCreateActividadMutation } from '../../fectures/api/apiSlice';
import logoutImage from '../../../assets/logout.png';
import camera from '../../../assets/camera.png';
import backImage from '../../../assets/back.png';
import * as ImagePicker from 'expo-image-picker';


const Tareas = ({ navigation }) => {
    const [image, setImage] = useState('');
    const [categoria, setcategoria] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [filtro, setFiltro] = useState('');
    const [createActividad] = useCreateActividadMutation();
    const windowWidth = useWindowDimensions().width;
    const [actividades, setActividades] = useState([]);
    const { data, isLoading, error, refetch } = useGetActividadQuery();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (data) {
            setActividades(data.data.document);
        }
    }, [data]);

    const handleCreateActividad = async () => {
        try {
            setLoading(true);
            if (userEmail && image) {
                const formData = new FormData();
                formData.append('email', userEmail);
                formData.append('categoria', categoria);
                formData.append('filtro', filtro);
                const file = {
                    uri: image.uri,
                    type: 'image/jpg',
                    name: 'image.jpg',
                };
                formData.append('pictograma', file);
                const result = await createActividad(formData).unwrap();
                console.log('Respuesta de la API:', result);
                if (result.msg) {
                    
                    setActividades(prevActividades => [...prevActividades, result]);
                    

                    refetch();

                } else {
                    console.warn('La API indicó un problema. No se recargó la lista.');
                }
            } else {
                console.warn('Email del usuario o imagen faltante. No se realizó la solicitud POST.');
            }
        } catch (error) {
            console.error('Error al crear actividad:', error);
        } finally {
            setLoading(false);
        }
    };

    const pickImagen = async () => {
        try {
            const { granted } = await ImagePicker.requestCameraPermissionsAsync();
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
                    setcategoria("higiene");
                    setUserEmail("test@test");
                    setFiltro("Estudio");
                }
            }
        } catch (error) {
            console.error("Error al interactuar con la cámara:", error);
        }
    }


    useEffect(() => {
        if (userEmail && image) {
            handleCreateActividad();
            refetch();
        }
    }, [userEmail, image, refetch]);

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
        const tieneTerminoBusqueda = searchTerm.trim().length > 0;
        const coincideConTerminoBusqueda = tieneTerminoBusqueda
            ? item.filtro.some((filtroItem) => filtroItem.toLowerCase().includes(searchTerm.toLowerCase()))
            : true;
    
        if (!coincideConTerminoBusqueda) {
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
                {isLoading || loading ? (
                    
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>
                ) : (
                    
                    <FlatList
                        data={actividades}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={renderImageUrlItem}
                        numColumns={3}
                        contentContainerStyle={styles.pictogramas}
                        style={styles.flatList}
                    />
                    
                    )}
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
    },
    addButton: {
        backgroundColor: 'lightblue',
        padding: 10,
        alignItems: 'center',
        marginBottom: 10,
    },
    imageStyle: {
        width: 90,
        height: 90,

    },
    imageContainer: {
        margin: 7,
        borderWidth: 2,
        borderColor: '#ccc',
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    selectedImageContainer: {
        borderColor: 'blue',
    },
    blueButtonContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginTop: 'auto',
        marginBottom:30,
        
    },
    imageStyleButton: {
        width: 70,
        height: 70,
    },
    pictogramas: {
        alignItems: 'center',
        margin: 15,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },



});

export default Tareas;
