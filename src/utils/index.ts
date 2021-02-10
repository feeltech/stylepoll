import uuid from 'react-native-uuid';
import storage from "@react-native-firebase/storage";
import {isNull,isUndefined} from 'lodash'

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

export function getProgressBarValue(valueTotal:number,total:number){
    if(!isUndefined(valueTotal) && !isNull(valueTotal) && !isUndefined(total) && !isNull(total)) {
        if(total === 0){
            return 0
        }
        // return parseFloat((valueTotal/total).toFixed(1))
        return valueTotal/total
    }else {
        return 0
    }

}
