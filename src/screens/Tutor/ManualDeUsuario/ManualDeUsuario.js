import React from 'react';
import { View, ScrollView, Image, StyleSheet, Dimensions,TouchableOpacity } from 'react-native';
import tutor1 from '../../../../assets/Manual/tutor.png';
import tutor2 from '../../../../assets/Manual/tutor2.png';
import tutor3 from '../../../../assets/Manual/tutor3.png';
import tutor4 from '../../../../assets/Manual/tutor4.png';
import backImage from '../../../../assets/back.png';

const { width: screenWidth } = Dimensions.get('window');
const ManualDeUsuario = ({navigation}) => {
    const images = [
        tutor1,
        tutor2,
        tutor3,
        tutor4
    ];

    return (
        <View style={styles.container}>
            <ScrollView
                vertical
                pagingEnabled
                showsVerticalScrollIndicator={false}
                style={styles.scrollView}
            >
                {images.map((image, index) => (
                    <Image key={index} source={image} style={styles.image} />
                ))}
            </ScrollView>
            <View style={styles.blueButtonContainer}>
            <TouchableOpacity style={styles.blueButton} onPress={() => navigation.navigate('HomeTutor')}>
                    <Image source={backImage} style={styles.imageStyle} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollView: {
        width: screenWidth,
    },
    image: {
        width: screenWidth,
        height: screenWidth * 1.8, 
        resizeMode: 'cover',
    },
    imageStyle: {
        width: 70,
        height: 70,
    },
    blueButton: {
        width: 30,
        height: 60,
        marginTop: 1,
        borderRadius: 100,
        backgroundColor: '#0a06f1',
        justifyContent: 'center',
        alignItems: 'center',
    },
    blueButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        marginBottom:10
    },
});


export default ManualDeUsuario;
