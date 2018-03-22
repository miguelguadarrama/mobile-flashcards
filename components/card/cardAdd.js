import React from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { addCardToDeckDB } from '../../actions/deck'

class CardAdd extends React.Component {

    state = {
        question: '',
        answer: ''
    }
    Submit = () => {
        const deck = this.props.navigation.state.params.title
        const { question, answer } = this.state
        if(question.length === 0 || answer.length === 0){
            return false;
        }
        this.props.addToDeck(deck, question, answer)
        this.props.navigation.goBack()
    }
    render() {
        const { title } = this.props.navigation.state.params
        return (
            <View style={styles.container}>
                <Text style={styles.deck}>Deck: {title}</Text>
                <Text style={styles.title}>Question</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => this.setState({ question: text })}
                    value={this.state.question}
                />
                <Text style={styles.title}>Answer</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => this.setState({ answer: text })}
                    value={this.state.answer}
                />
                <TouchableOpacity style={styles.submit} onPress={this.Submit}>
                    <Text style={styles.submitText}>Submit</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#FFF'
    },
    submit: {
        marginTop: 30,
        backgroundColor: '#369',
        padding: 15,
    },
    submitText: {
        color: '#FFF',
        fontSize: 20,
        textAlign: 'center'
    },
    deck: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15
    },
    input: {
        height: 40,
        borderColor: '#DDD',
        borderWidth: 1,
        marginBottom: 20,
        padding: 5,
    },
    title: {
        fontSize: 18,
        alignItems: 'center',
        padding: 10
    },
    error: {
        color: 'red'
    }
})

const mapDispatchToProps = dispatch => {
    return {
        addToDeck: (deck, question, answer) => addCardToDeckDB(deck, question, answer)(dispatch)
    }
}

export default connect(null, mapDispatchToProps)(CardAdd)