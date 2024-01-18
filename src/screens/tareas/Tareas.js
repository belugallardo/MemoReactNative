import React, { useState } from 'react';
import { View, Text, FlatList,Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addTask, deleteTask } from '../../fectures/tareas/tareasSlice'; 
import logoutImage from '../../../assets/logout.png';
import backImage from '../../../assets/back.png';
import { useGetActividadQuery } from '../../fectures/api/apiSlice';

const Tareas = () => {
    const tasks = useSelector(state => state.tareas.tasks);
    const dispatch = useDispatch();
    const [taskInput, setTaskInput] = useState('');
    
    const {data,isLoading,error} = useGetActividadQuery();
    if (data) {
        console.log("Data:", data.data.document);
      } else if (isLoading) {
        console.log("Cargando...");
      } else if (error) {
        console.error("Error:", error);
      }
    
    const addTaskHandler = () => {
        if (taskInput.trim() !== '') {
            dispatch(addTask(taskInput));
            setTaskInput('');
        }
    };

    const deleteTaskHandler = (index) => {
        dispatch(deleteTask(index));
    };

    const renderImageUrlItem = ({ item }) => (
        <View style={styles.imageContainer}>
            <Image source={{ uri: item.imageUrl }} style={styles.imageStyle} />
        </View>
    );

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Enter tarea"
                value={taskInput}
                onChangeText={(text) => setTaskInput(text)}
            />
            <TouchableOpacity style={styles.addButton} onPress={addTaskHandler}>
                <Text>Agregar Tareas</Text>
            </TouchableOpacity>
            <FlatList
                data={tasks}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <View style={styles.taskItem}>
                        <Text>{item}</Text>
                        <TouchableOpacity onPress={() => deleteTaskHandler(index)}>
                            <Text style={styles.deleteButton}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
            <View style={styles.blueButtonContainer}>
                <TouchableOpacity style={styles.blueButton} onPress={() => navigation.navigate('Home')}>
                    <Image source={backImage} style={styles.imageStyle} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.blueButton} onPress={() => navigation.navigate('Home')}>
                    <Image source={logoutImage} style={styles.imageStyle} />
                </TouchableOpacity>
            </View>
            <View style={styles.container}>
            {/* ... (resto del código) */}
            <FlatList
                data={data ? data.data.document : []}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderImageUrlItem}
            />
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
    taskItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingVertical: 10,
    },
    deleteButton: {
        color: 'red',
    },
    blueButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 35,
    },
    imageStyle: {
        width: 70,
        height: 70,
    },
});

export default Tareas;