import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React from 'react'
import { useGetUserQuery } from '../../../fectures/api/apiSlice';
import { useSelector } from 'react-redux';
import next from '../../../../assets/next.png'

const Bienvenido = ({navigation}) => {
    const authState = useSelector((state) => state.auth);
    const email = authState.value.email;
    const { data, isLoading, error, refetch } = useGetUserQuery(email);
    const avatar = data?.data.avatar;
    const apodo = data?.data.card[0];
    const goRutinaUsuario = () => {
        navigation.navigate('RutinaUsuario')
    }

    return (
        
        <View style={styles.container}>
            <View stle={styles.containerTitle}>
                <Text style={styles.title}>BIENVENIDO </Text>
                <Text style={styles.apodo}>{apodo}</Text>
            </View>
            <TouchableOpacity style={styles.containerAvatar}>
                <Image source={{ uri: avatar }} style={{ width: 220, height: 550 }} />
            </TouchableOpacity>
            <View style={styles.blueButtonContainer}>
            <TouchableOpacity style={styles.blueButton} onPress={goRutinaUsuario}>
                    <Image source={next} style={styles.imageStyle} />
            </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
    },
    containerAvatar: {
        width: 250,
        height: 350,
        marginTop:35,
        marginBottom:80,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        marginTop: 60,
        fontSize: 38,
        fontWeight: '600',
        marginBottom: 10,
        marginHorizontal: 10,
        color: '#ff6600'
    },
    apodo: {
        fontSize: 28,
        fontWeight: '600',
        marginBottom: 60,
        marginHorizontal: 10,
        color: '#ff6600',
        textAlign:'center'
    },
    containerTitle: {
        alignItems: 'center',
    },
    blueButton: {
        width: 30,
        height: 60,
        marginTop: 1,
    },
    blueButtonContainer: {
        display:'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft:30,
        marginRight:60,
        marginTop:10,
    },
    imageStyle: {
        width: 70,
        height: 70,
    },
})
export default Bienvenido