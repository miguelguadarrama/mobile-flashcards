import React from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { styles } from '../card/cardAdd'
import { addDeckToDB } from '../../actions/deck'
import { connect } from 'react-redux'

class NewDeck extends React.Component {
    state = {
        name: '',
        error: false
    }

    Submit = () => {
        if (this.state.name.length === 0) return false;
        const obj = {
            title: this.state.name,
            questions: []
        }
        this.props.addDeckToDB(obj)
        this.props.navigation.goBack()
        this.props.navigation.navigate('Deck', { title: obj.title })
    }

    ChangeText = (text) => {
        if (this.props.decks && this.props.decks[text]) {
            this.setState({ name: text, error: true, errorMsg: 'Deck name already exists!' })
            return false;
        }
        this.setState({ name: text, error: false, errorMsg: '' })
    }

    render() {
        const { name, error } = this.state
        return (
            <View style={styles.container}>
                <Text style={styles.deck}>Deck Title:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => this.ChangeText(text)}
                    value={name}
                />

                <TouchableOpacity disabled={name.length === 0 || error} style={styles.submit} onPress={this.Submit}>
                    <Text style={styles.submitText}>Submit</Text>
                </TouchableOpacity>

                {error && (
                    <Text style={styles.error}>{this.state.errorMsg}</Text>
                )}
            </View>
        )
    }
}

const mapStateToProps = (reducer) => {
    return {
        decks: reducer
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addDeckToDB: (deck) => addDeckToDB(deck)(dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewDeck)