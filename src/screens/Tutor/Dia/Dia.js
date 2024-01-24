import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native';
import React from 'react'

const Dia = ({ route }) => {
    const navigation = useNavigation();
    const { dia } = route.params;
    
    const goToCategorias = (momento) => {
        navigation.navigate('CategoriasTutor', { momento });
    };

    console.log(dia)
    return (
        <View>
            <Text style={styles.titulo}>{`${dia}`}</Text>
            <View>
                <Text>MAÑANA</Text>
                <TouchableOpacity style={styles.customButton} onPress={() => goToCategorias('manana')}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
                
                <Text>TARDE</Text>
                <TouchableOpacity style={styles.customButton} onPress={() => goToCategorias('tarde')}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
               
                <Text>NOCHE</Text>
                <TouchableOpacity style={styles.customButton} onPress={() => goToCategorias('noche')}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    titulo: {
        fontSize: 50,
        color: '#000000',
    },
    customButton: {

        width: 300,
        marginTop: 19,
        marginBottom: 0,
        paddingVertical: 15,
        borderRadius: 100,
        backgroundColor: '#FFD300',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 25,
        letterSpacing: 3,
    },
})
export default Dia