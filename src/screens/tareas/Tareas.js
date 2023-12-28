import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addTask, deleteTask } from '../../fectures/tareas/tareasSlice'; 

const Tareas = () => {
    const tasks = useSelector(state => state.tareas.tasks);
    const dispatch = useDispatch();
    const [taskInput, setTaskInput] = useState('');

    const addTaskHandler = () => {
        if (taskInput.trim() !== '') {
            dispatch(addTask(taskInput));
            setTaskInput('');
        }
    };

    const deleteTaskHandler = (index) => {
        dispatch(deleteTask(index));
    };

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
});

export default Tareas;