import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'

const AnswerButton = (props) => {
    return (
        <TouchableOpacity {...props} style={[styles.button, props.style || {}]}>
            <Text style={styles.text}>{props.children}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        marginBottom: 15,
        padding: 10,
        backgroundColor: '#000',
        borderRadius: 4
    },
    text: {
        color: '#FFF',
        fontSize: 16
    }
})

export default AnswerButton