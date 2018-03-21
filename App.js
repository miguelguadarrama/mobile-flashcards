import React from 'react';
import { View, StatusBar } from 'react-native';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { StackNavigator } from 'react-navigation';
import Decks from './components/deck/deckList'
import Deck from './components/deck/deckView'
import { Constants } from 'expo'
import NewDeck from './components/deck/deckAdd'
import CardAdd from './components/card/cardAdd'

const MyStatusBar = ({ backgroundColor, ...props }) => {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Stack = StackNavigator({
  Decks: {
    screen: Decks,
    navigationOptions: {
      title: 'Deck List',
      style: {
        height: 10
      }
    }
  },
  Deck: {
    screen: Deck,
    title: 'Deck'
  },
  NewDeck: {
    screen: NewDeck,
    title: 'CreateDeck'
  },
  CardAdd: {
    screen: CardAdd,
    navigationOptions: {
      title: 'Add Card to Deck'
    }
  }
})

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <React.Fragment>
          <MyStatusBar backgroundColor={'#EEE'} />
          <Stack />
        </React.Fragment>
      </Provider>
    );
  }
}
