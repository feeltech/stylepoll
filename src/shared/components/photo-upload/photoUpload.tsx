import { Image } from 'react-native'
import PhotoUpload from 'react-native-photo-upload'
import React from "react";

export default class PhotoUploadComponent extends React.Component<any, any>{
    render() {
        return (
            <PhotoUpload
                onPhotoSelect={avatar => {
                    if (avatar) {
                        console.log('Image base64 string: ', avatar)
                    }
                }}
            >
                <Image
                    style={{
                        paddingVertical: 30,
                        width: 75,
                        height: 75,
                        borderRadius: 75/2
                    }}
                    resizeMode='cover'
                    source={{
                        uri: 'https://www.sparklabs.com/forum/styles/comboot/theme/images/default_avatar.jpg'
                    }}
                />
            </PhotoUpload>
        );
    }
}
