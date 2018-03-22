import { CREATE_DECK, ADD_CARD_TO_DECK, SET_DECKS, REMOVE_DECK } from './actionTypes'
import { getDecks, addDeck, removeDeck, addCardToDeck } from '../helpers/api'

const setDecks = (data) => {
    return {
        type: SET_DECKS,
        data
    }
}

const createDeck = (deck) => {
    return {
        type: CREATE_DECK,
        deck
    }
}

const rmDeck = (title) => {
    return {
        type: REMOVE_DECK,
        title
    }
}

const addToDeck = (deck, question, answer) => {
    return {
        type: ADD_CARD_TO_DECK,
        deck,
        question,
        answer
    }
}

export const addCardToDeckDB = (deck, question, answer) => dispatch => {
    addCardToDeck(deck, question, answer)
        .then(data => dispatch(addToDeck(deck, question, answer)))
}

export const removeDeckFromDB = (title) => dispatch => {
    removeDeck(title)
        .then(data => dispatch(rmDeck(title)))
}

export const addDeckToDB = (deck) => dispatch => {
    addDeck(deck)
        .then(data => dispatch(createDeck(deck)))
}

export const fetchDecks = () => dispatch => {
    getDecks().then(data => dispatch(setDecks(data)))
}