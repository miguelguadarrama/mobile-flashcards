import { Alert } from 'react-native'

export const alert = (body, title = 'Alert') => {
    Alert.alert(
        'Alert',
        body || `There was an error`,
        [
            { text: 'OK' },
        ],
        { cancelable: false }
    )
}