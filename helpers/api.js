import { AsyncStorage } from 'react-native';
//getDecks, getDeck, saveDeckTitle, addCardToDeck

export const getDecks = () => {
    return AsyncStorage.getAllKeys().then(keys =>
        AsyncStorage.multiGet(keys).then(stores =>
            stores.map((result, i, store) => {
                let key = store[i][0];
                let value = JSON.parse(store[i][1]);
                if (value) {
                    return {
                        title: value.title,
                        questions: value.questions
                    };
                }
            })
            /*.filter(items => {
                if (items) {
                    return typeof items.questions !== 'undefined'
                }
            }*/
        )
    )
}

export const getDeck = (id) => {
    return AsyncStorage.getItem(id);
}

export const removeDeck = (title) => {
    return AsyncStorage.removeItem(title)
}

export const saveDeckTitle = (deck) => {
    return AsyncStorage.setItem(deck, JSON.stringify({ deck, questions: [] }));
}

export const addDeck = (deck) => {
    return AsyncStorage.setItem(deck.title, JSON.stringify(deck));
}

export const addCardToDeck = (deck, question, answer) => {
    return AsyncStorage.getItem(deck).then(result => {
        const data = JSON.parse(result);

        let questions = data.questions;
        questions.push({ question, answer });

        AsyncStorage.mergeItem(deck, JSON.stringify({
            questions
        }));
    });
}