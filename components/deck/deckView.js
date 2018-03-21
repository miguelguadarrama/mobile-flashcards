import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import CardAdd from '../card/cardAdd'

class Deck extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const { title } = navigation.state.params

        return {
            title: `${title}`
        }
    }
    render() {
        const { deck: { title, questions }, navigate } = this.props
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subtitle}>{questions ? questions.length : 0} questions</Text>
                <TouchableOpacity onPress={() => navigate('CardAdd', { title })} style={[styles.quiz, { backgroundColor: 'transparent', borderWidth: 1, padding: 10 }]}>
                    <Text style={styles.quizText}>Add Card</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.quiz}>
                    <Text style={styles.quizText}>Start Quiz</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    quiz: {
        marginTop: 25,
        padding: 15,
        borderRadius: 4,
        backgroundColor: '#DDD',
    },
    quizText: {
        fontWeight: 'bold'
    }
})

const mapStateToProps = (reducer, { navigation }) => {
    const { title } = navigation.state.params
    return {
        deck: reducer[title]
    }
}

const mapDispatchToProps = (dispatch, { navigation }) => {
    return {
        navigate: (screen, data = {}) => navigation.navigate(screen, data)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Deck)