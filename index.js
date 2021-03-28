/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import firebase from '@react-native-firebase/app'

const c = {
    "type": "service_account",
    "project_id": "stylepoll-c5e43",
    "private_key_id": "a49f0a85f6edbbfd47d9508ecedcb1f70bcbb50a",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDaGxzLC76xDBjL\n619nQfBS6sBXDtT8pQGPpYXKa4wdYltQsjjL0qJUnv9GsCnoX66Y0uubF4n+40Yg\nCvGrtT5PNfvm6vlCraepJJjfGGA8xYOMm/dACglYlUat/bqWwV+fxwnnqFtqumdJ\nMiE70DTVswh7mOCTavl6M6lFP+CQX7Fj+0Zx9N4fybEpbzadhaLdZCt8fS1lRdro\nz+8A4YCTA6FmulzKIJOvHxwdEYs5R/QvI2Z73FSy9pPLVLNFMfL0TqMVdMvWgfsz\naDudAIRiNz1Kg38GPlk1leveiRpDfgLx+TKHP9kRvl7xig+/96c0yEJme+XOkUVp\nr4/v6sN1AgMBAAECggEACVctPdTcRHYhfw+EH8acettALs+dIiS+6F6iWC+QP0Ho\naeWitmKS6STWBzpMJn4n2rZNuMVNTPPWxlCHAQowskZm6gDDeVjj2+6L+CHxx9Mo\nSxadhB8/PzfwCvYuziiskQnTzBlTBkMYC/PFpetzbSN5stwH4h2sCXu6PWj66Qkx\nMP0V3aMsD545O7q05wTlmxVGCBnpSgA5QBbXIjZKTx+EBidY6LhEVEzMnL1e4Ear\nz5MlxwOYTTghV8nt1cb4iQU7DOvfUP5o5tyo8m7j1rhEzRx4EjBnNPjGfRTfJbAM\nG2dKNbhH248wMN9WC16M9/gfTU56MkWuBELJKxZKAQKBgQDtecr3Z/9CBJoFXL4g\nb9TBy2/sjhx3bSoe6Fe66HDpBpjA6UrYBeiV2W+M2lcfuKICAMU9Z+VY7HVpbIdI\nlM9zV1h1cz4F98AE7HaIjQ7ql38jjv1C8PLDm+xsYBtHMNKlJq5JfKSw5HoC68E6\nX7QSjQ9FNuZE9EHXqvUm3hDclQKBgQDrHoTQbq8KKBy+OoQICQrRQxE1zmXvYSri\nCfJ/ZqFP6Ov9CfVhffCB+o3J+2cG5e8mg5ftC9AhCXmiiJU0O3BlGhBwz+r8JzRZ\nw5Qx3jfPCLurycJTjkJV/d/ow87aQg0aWQeCjKD44hMBqC8WzS1LVaeK+wGL3dkx\nPzPGDl+zYQKBgC9cELxSgzeZT1YubsRtSRL1DXcxyD+RB8tuLsDZxlrSs/gVDpYS\nZ5Yq7PI8QQ/UdIrNuIhMhhK75ZaGzFwPQWgRTVTvDLmH9UWGGwWUjBsA55wh0iRd\nhSy5lebvK8GA3SGOm0eQkg+tISAgAEMx/umMNDVrg3TQ+aiXMZj0xIwZAoGBALC2\nomoqFoNSvK+5OUz0xt2bQ88mDvVJGbsEcO+SSoHN9biciII67s4ya+k4fCnyHbnb\nxA9VBpweC/6+Gy5D0mkamuq/SsU0DiO9XJ/Sfi2sSamHHfhA/ti01FqU+N6QMFry\nOTPE0KPe/xwKtUG0+msZuLA7keD23+wkrZwZZ5JhAoGBAJ8t0jmuq/nyI/GyG8hz\nRGikirJ0pduuJWnafQ9GMLhLuqBFJLXiXmLwUOP0cxiCvzJpafAYOjjZ5hTLUH9u\nhC+2OAnon+mpf/sjJwkQjlBg4kpRt1/MHRcaOh/74Q60eyFUwNho6Ro9OhfyeCMh\n7o54rNyXiYjcj8Lump/0ZzlB\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-inp2w@stylepoll-c5e43.iam.gserviceaccount.com",
    "client_id": "113485724418518378776",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-inp2w%40stylepoll-c5e43.iam.gserviceaccount.com"
}

// firebase.initializeApp(c)
AppRegistry.registerComponent(appName, () => App);
