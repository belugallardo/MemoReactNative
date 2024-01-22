import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';

const Camera = () => {
    const [image, setImage] = useState("")

    const pickImagen = async () => {
        const { granted } = await ImagePicker.requestCameraPermissionsAsync()

        if (granted) {
            let result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            console.log(result);

            if (!result.canceled) {
                setImage(result.assets[0].uri);
            }
        }
    }
}

export default Camera