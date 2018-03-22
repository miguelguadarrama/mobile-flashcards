import React from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { connect } from 'react-redux'
import DeckItem from './deckButton'
import { fetchDecks } from '../../actions/deck'

class Decks extends React.Component {

    componentDidMount() {
        this.props.fetchDecks()
    }


    Navigate = (screen, data = {}) => {
        this.props.navigation.navigate(
            screen,
            data
        )
    }
    render() {
        const { decks } = this.props
        console.log(decks)
        return (
            <ScrollView contentContainerStyle={styles.vpad} style={styles.container}>
                {decks && Object.keys(decks).map(title => (
                    <DeckItem onNavigate={this.Navigate} key={title} data={decks[title]} />
                ))}
                <DeckItem onNavigate={() => this.Navigate('NewDeck')} data={{ title: 'New Deck!' }} button={true} />
            </ScrollView>
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
        fetchDecks: () => fetchDecks()(dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Decks)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    vpad: {
        paddingVertical: 20
    }
});