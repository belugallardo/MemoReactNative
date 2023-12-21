import React, { useRef, useEffect } from 'react';
import { View, Image, StyleSheet, Text, Animated, Easing } from 'react-native';

const EnConstruccion = () => {
    const fontSize = useRef(new Animated.Value(20)).current;
    const color = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Animación del tamaño del texto
        Animated.timing(fontSize, {
            toValue: 30,
            duration: 1000,
            useNativeDriver: false,
        }).start();

        // Animación del color del texto
        Animated.timing(color, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: false,
            easing: Easing.linear,
        }).start();
    }, []);

    // Interpolación para el color del texto
    const textColor = color.interpolate({
        inputRange: [0, 1],
        outputRange: ['blue', 'red'],
    });

    return (
        <View style={styles.homeLogin}>
            <View style={styles.imgMemoContenedor}>
                <Image
                    style={styles.imgMemo}
                    source={require('../../../assets/logo.png')}
                    resizeMode="contain"
                />
            </View>

            <View>
                <Animated.Text style={[styles.redText, { fontSize: fontSize, color: textColor }]}>
                    En Construcción
                </Animated.Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    imgMemoContenedor: {
        alignItems: 'center',
    },
    homeLogin: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imgMemo: {
        width: 400,
        height: 400,
    },
    redText: {
        fontSize: 20,
    },
});

export default EnConstruccion;
