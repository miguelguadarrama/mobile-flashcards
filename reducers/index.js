import { ADD_CARD_TO_DECK, SET_DECKS, CREATE_DECK, REMOVE_DECK } from '../actions/actionTypes'

const initialState = {
    /*React: {
        title: 'React',
        color: '#369',
        questions: [
            {
                question: 'What is React?',
                answer: 'A library for managing user interfaces'
            },
            {
                question: 'Where do you make Ajax requests in React?',
                answer: 'The componentDidMount lifecycle event'
            }
        ]
    },
    JavaScript: {
        title: 'JavaScript',
        questions: [
            {
                question: 'What is a closure?',
                answer: 'The combination of a function and the lexical environment within which that function was declared.'
            }
        ]
    }*/
}

const reducer = (state = initialState, action) => {
    let deck = '';
    let array = [];
    switch (action.type) {
        
        case SET_DECKS: 
            deck = {};
            Object.keys(action.data).forEach(i => {
                deck[action.data[i].title] = action.data[i];
            })
            return {
                ...state,
                ...deck
            }
        case CREATE_DECK: 
            return {
                ...state,
                [action.deck.title]: action.deck
            }
        case REMOVE_DECK:
            deck = {}
            Object.keys(state).filter(i => i !== action.title).forEach(item => {
                deck[item] = state[item];
            })
            return {
                ...deck
            }
        case ADD_CARD_TO_DECK:
            return {
                ...state,
                [action.deck]: {
                    ...state[action.deck],
                    questions: state[action.deck].questions.concat({ question: action.question, answer: action.answer })
                }
            }
        default:
            return state
    }
}

export default reducer