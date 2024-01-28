import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native';
import React from 'react'

const Dia = ({ navigation, route }) => {
    const { dia } = route.params;

    const goToCategorias = (momento) => {
        navigation.navigate('CategoriasTutor', { momento });
    };

    console.log(dia)
    return (
        <View>
            <Text style={styles.titulo}>{`${dia}`}</Text>
            <View style={styles.containerEdit}>
                <TouchableOpacity style={styles.customButtonEdit} onPress={() => goToCategorias('manana')}>
                    <Text style={styles.buttonEdit}>Editar</Text>
                </TouchableOpacity>
            </View>
            <View>
                <Text style={styles.text}>MAÑANA</Text>
                <TouchableOpacity style={styles.customButton} onPress={() => goToCategorias('manana')}>
                    <Text style={styles.button}>+</Text>
                </TouchableOpacity>

                <Text style={styles.text}>TARDE</Text>
                <TouchableOpacity style={styles.customButton} onPress={() => goToCategorias('tarde')}>
                    <Text style={styles.button}>+</Text>
                </TouchableOpacity>

                <Text style={styles.text}>NOCHE</Text>
                <TouchableOpacity style={styles.customButton} onPress={() => goToCategorias('noche')}>
                    <Text style={styles.button}>+</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    titulo: {
        marginTop: 20,
        fontSize: 50,
        color: '#000000',
        fontWeight: 'bold',
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
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        color: '#2372d9',
        fontWeight: 'bold',
        fontSize: 25,
        letterSpacing: 3,
    },
    text: {
        marginTop: 15,
        marginLeft: 20,
        color: '#2372d9',
        fontWeight: 'bold',
        fontSize: 15,
    },
    buttonEdit: {
        color: '#ffffff',
        paddingLeft: 10,

    },
    containerEdit: {
        backgroundColor: '#ff6600',
        width: 60,
        borderRadius: 50,
    },
    customBottonEdit: {
        // display:'flex',
        // justifyContent: 'flex-end', 
    }

})
export default Dia