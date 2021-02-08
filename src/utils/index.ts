import uuid from 'react-native-uuid';
import storage from "@react-native-firebase/storage";

export const capitalizeFirstLetter = (str: string) => {
    return str && str.length ? str.charAt(0).toUpperCase() + str.slice(1) : str;
};

export function generateGUID() {
    return uuid.v1();
}

export function uploadImageAndGetUrl(imageUrl: string): Promise<string> {
    const guid = generateGUID();
    const filePath = `images/posts/${guid}.jpeg`
    const reference = storage().ref(filePath);
    const task = reference.putString(`${imageUrl}`, storage.StringFormat.DATA_URL)
    return task.then(res => {
        return storage()
            .ref(filePath)
            .getDownloadURL()
            .then((url) => {
                return Promise.resolve(url)
            }).catch(err => {
                return Promise.reject(err)
            })
    }).catch(err => {
        return Promise.reject(err)
    })
}
