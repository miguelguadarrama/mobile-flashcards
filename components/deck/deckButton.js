import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

const DeckItem = (props) => {
    const { data: { title, questions }, onNavigate, button } = props;
    const q = questions && questions.length || 0;
    return (
        <View>
            <TouchableOpacity style={styles.deck} onPress={() => onNavigate('Deck', { title })}>
                <Text style={styles.deckTitle}>{title}</Text>
                {!button && (
                    <Text style={styles.deckSubtitle}>{q} question{q === 1 ? '' : 's'}</Text>
                )}
            </TouchableOpacity>
        </View>
    )
}

export default DeckItem

const styles = StyleSheet.create({
    deck: {
        padding: 10,
        borderWidth: 0,
        borderRadius: 4,
        margin: 10,
        marginBottom: -2,
        backgroundColor: '#369',
        borderColor: '#000'
    },
    deckSubtitle: {
        paddingTop: 5,
        color: '#FFF'
    },
    deckTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFF'
    }
});