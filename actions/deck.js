import { CREATE_DECK, ADD_CARD_TO_DECK } from './actionTypes'

export const createDeck = (title) => {
    return {
        type: CREATE_DECK,
        title
    }
}

export const addCardToDeck = (deck, question, answer) => {
    return {
        type: ADD_CARD_TO_DECK,
        deck,
        question,
        answer
    }
}