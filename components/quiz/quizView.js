import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import AnswerButton from './answerButton';
import { FontAwesome } from '@expo/vector-icons'
import { setNotification, clearNotification } from '../../helpers/notification'

class Quiz extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const { deck } = navigation.state.params

        return {
            title: `Quiz: ${deck.title}`,
            showAnswer: false
        }
    }
    state = {
        current: 0,
        score: 0
    }

    restart = () => {
        this.setState({
            current: 0,
            score: 0
        })
    }

    componentWillUpdate(props, state) {
        if(state.current === props.navigation.state.params.deck.questions.length){
            console.log("clearing notification, and setting a new one for next day")
            clearNotification()
                .then(setNotification)
        }
    }

    setAnswer(val) {
        this.setState(s => ({ score: s.score += val, current: s.current + 1 }))
    }
    render() {
        const { deck: { questions } } = this.props.navigation.state.params;
        const { current, showAnswer, score } = this.state
        return (
            <View style={styles.container}>
                {current < questions.length && (
                    <React.Fragment>
                        <Text style={{ textAlign: 'center' }}>{showAnswer ? 'Answer' : `Question ${current + 1}/${questions.length}`}</Text>
                        <Text style={styles.question}>{questions[current][showAnswer ? 'answer' : 'question']}</Text>
                        <AnswerButton onPress={() => this.setAnswer(1)} style={{ backgroundColor: 'green' }}>Correct</AnswerButton>
                        <AnswerButton onPress={() => this.setAnswer(0)} style={{ backgroundColor: 'red' }}>Incorrect</AnswerButton>
                        <TouchableOpacity style={styles.flipButton} onPress={() => this.setState(p => ({ showAnswer: !p.showAnswer }))}>
                            <Text style={styles.flipButtonText}>Flip Card</Text>
                        </TouchableOpacity>
                        <Text>{questions.length - (current + 1)} Questions remaining</Text>
                    </React.Fragment>
                )}
                {current === questions.length && (
                    <React.Fragment>
                        <Text style={styles.score}>{Math.round(score * 100 / questions.length).toFixed(0)}%</Text>
                        <Text>{score} out of {questions.length} answers correct!</Text>
                        <TouchableOpacity style={styles.endBtn} onPress={() => this.restart()}>
                            <Text><FontAwesome name="refresh" /> Restart Quiz</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.endBtn} onPress={() => this.props.navigation.goBack()}>
                            <Text>Back to deck</Text>
                        </TouchableOpacity>
                    </React.Fragment>
                )}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    question: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 20
    },
    flipButton: {
        backgroundColor: '#DDD',
        borderRadius: 5,
        padding: 6
    },
    flipButtonText: {
        textAlign: 'center'
    },
    score: {
        fontSize: 40
    },
    endBtn: {
        backgroundColor: '#DDD',
        padding: 5,
        marginTop: 10,
        borderRadius: 4
    }
})

export default Quiz