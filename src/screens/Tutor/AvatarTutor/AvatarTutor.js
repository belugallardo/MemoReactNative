import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import backImage from '../../../../assets/back.png';
import accept from '../../../../assets/accept.png';
import { useEditAvatarMutation } from '../../../fectures/api/apiSlice';
import { useSelector } from 'react-redux';

const AvatarTutor = ({navigation}) => {

    const imagen1 = "https://firebasestorage.googleapis.com/v0/b/imagenes-memo.appspot.com/o/nena.png?alt=media&token=60d5d2ca-d456-45bd-9f62-fcbd3907facb";
    const imagen2 = "https://firebasestorage.googleapis.com/v0/b/imagenes-memo.appspot.com/o/nene-2.png?alt=media&token=557e1633-2f26-4217-b9a0-44ca7cc3108c"
    const [postAvatar] = useEditAvatarMutation(); 
    const [selectedImage, setSelectedImage] = useState(null);
    const authState = useSelector((state) => state.auth);
    const email = authState.value.email;

    const avatarImage = {
        avatar:selectedImage
    }

    const avatar = {
        email:email,
        avatar:avatarImage
    }

    const handleImageSelection = (imageUrl) => {
        setSelectedImage(imageUrl);
    }

    const acceptAvatar = async () => {
        if (selectedImage) {
            await postAvatar(avatar);
            navigation.navigate('HomeTutor');
        } else {
            console.log("Por favor, selecciona un avatar antes de continuar.");
        }
    };
    const goHomeTutor = () => {
        navigation.navigate('HomeTutor')
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>SELECCIONA TU AVATAR</Text>
            <View style={styles.containerButton}>
                <TouchableOpacity
                    style={[styles.containerAvatar, selectedImage === imagen1 && styles.selectedAvatar]}
                    onPress={() => handleImageSelection(imagen1)}
                >
                    <Image source={{ uri: imagen1 }} style={{ width: 100, height: 250 }} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.containerAvatar, selectedImage === imagen2 && styles.selectedAvatar]}
                    onPress={() => handleImageSelection(imagen2)}
                >
                    <Image source={{ uri: imagen2 }} style={{ width: 100, height: 200 }} />
                </TouchableOpacity>
            </View>
            <View style={styles.blueButtonContainer}>
                <TouchableOpacity style={styles.blueButton} onPress={goHomeTutor}>
                    <Image source={backImage} style={styles.imageStyle} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.blueButton} onPress={acceptAvatar}>
                    <Image source={accept} style={styles.imageStyle} />
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
container:{
    marginTop: 160,
    flex: 1,
    marginHorizontal:15,
},
containerButton:{
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
},
title:{
    fontSize: 28,
    fontWeight: '600',
    marginBottom:30,
    marginHorizontal:10,
    color:'#ff6600'
},
containerAvatar:{
    width: 150,
    height: 250,
    margin: 10,
    paddingVertical: 0,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#737474',
    shadowOffset: {
        width: 0,
        height: 2,
    },
},
blueButtonContainer: {
    display:'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft:30,
    marginRight:60,
    marginTop:150,
},
blueButton: {
    width: 30,
    height: 60,
    marginTop: 1,
},
imageStyle: {
    width: 70,
    height: 70,
},
selectedAvatar: {
    borderWidth: 2,
    borderColor: 'blue',
},
})

export default AvatarTutor