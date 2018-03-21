import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux'
import DeckItem from './deckButton'

class Decks extends React.Component {

    Navigate = (screen, data = {}) => {
        this.props.navigation.navigate(
            screen,
            data
        )
    }
    render() {
        const { decks } = this.props
        //console.log(decks)
        return (
            <View style={styles.container}>
                {decks && Object.keys(decks).map(title => (
                    <DeckItem onNavigate={this.Navigate} key={title} data={decks[title]} />
                ))}
                <DeckItem onNavigate={() => this.Navigate('NewDeck')} data={{ title: 'New Deck!' }} button={true} />
            </View>
        )
    }
}

const mapStateToProps = (reducer) => {
    return {
        decks: reducer
    }
}

export default connect(mapStateToProps)(Decks)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});