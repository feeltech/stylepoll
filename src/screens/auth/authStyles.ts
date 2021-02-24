import {StyleSheet} from "react-native";
import {SCREEN_HEIGHT, SCREEN_WIDTH, STATUS_BAR_HEIGHT} from "../../shared/constants";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        height: SCREEN_HEIGHT
    },
    languageChooser: {
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnCurLanguage: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    curLanguage: {
        color: '#333'
    },
    centerContainer: {
        height: SCREEN_HEIGHT - 50 - 40 - STATUS_BAR_HEIGHT,
        width: SCREEN_WIDTH,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoWrapper: {
        marginBottom: 20
    },
    logo: {
        height: 64,
        overflow: 'hidden'
    },
    loginForm: {
        width: SCREEN_WIDTH * 0.9,
    },
    textInputWrapper: {
        position: 'relative',
        width: '100%',
        height: 44,
        borderRadius: 5,
        borderColor: '#ddd',
        borderWidth: 1,
        marginVertical: 7.5
    },
    textInputErrorWrapper: {
        position: 'relative',
        width: '100%',
        height: 22,
        marginVertical: 7.5
    },
    hidePasswordIcon: {
        position: 'absolute',
        height: 30,
        width: 30,
        justifyContent: 'center',
        alignItems: 'center',
        right: 5,
        top: (44 - 30) / 2
    },
    input: {
        width: '100%',
        height: '100%',
        paddingHorizontal: 15
    },
    btnLogin: {
        marginTop: 7.5,
        width: '100%',
        height: 44,
        borderRadius: 5,
        backgroundColor: '#318bfb',
        justifyContent: 'center',
        alignItems: 'center'
    },
    otherOptionsWrapper: {
        width: SCREEN_WIDTH * 0.9,
        justifyContent: 'center',
        alignItems: 'center',
    },
    forgotPassword: {
        width: SCREEN_WIDTH * 0.8,
        marginVertical: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    divideLine: {
        marginVertical: 10,
        position: 'relative',
        height: 2,
        width: '100%',
        backgroundColor: '#ddd',
    },
    ORtextWrapper: {
        width: 40,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        top: (2 - 20) / 2,
        left: (SCREEN_WIDTH * 0.9 - 40) / 2,
        position: 'absolute',
        paddingHorizontal: 10,
        backgroundColor: '#fff',
    },
    btnLoginWithFacebook: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    registerWrapper: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopColor: '#ddd',
        borderTopWidth: 1
    },
    loadingWrapper: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
        zIndex: 99
    },
    loading: {
        flexDirection: 'row',
        padding: 15,
        borderRadius: 5,
        backgroundColor: '#fff',
        alignItems: 'center'
    },
    keyboardAvoidingViewContainer: {
        position: "relative",
    }
})
