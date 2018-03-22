import React from 'react';
import { View, StatusBar } from 'react-native';
import { createStore, compose, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { StackNavigator } from 'react-navigation';
import Decks from './components/deck/deckList'
import Deck from './components/deck/deckView'
import { Constants } from 'expo'
import NewDeck from './components/deck/deckAdd'
import CardAdd from './components/card/cardAdd'
import Quiz from './components/quiz/quizView'
import thunk from 'redux-thunk';
import { setNotification } from './helpers/notification'

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
      headerStyle: {
        backgroundColor: '#DDD',
      },
    }
  },
  Deck: {
    screen: Deck,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#DDD',
      },
    },
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#DDD',
      },
    }
  },
  CardAdd: {
    screen: CardAdd,
    navigationOptions: {
      title: 'Add Card to Deck',
      headerStyle: {
        backgroundColor: '#DDD',
      },
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#DDD',
      },
    }
  }
})

const logger = store => next => action => {
  console.group(action.type);
  console.log("dispatching", action);
  let result = next(action)
  //console.log("store after");
  //console.log(store.getState())
  console.groupEnd(action.type);
  return result
}

export default class App extends React.Component {
  componentDidMount(){
    setNotification()
  }
  render() {
    return (
      <Provider store={createStore(reducer, compose(
        applyMiddleware(logger, thunk)
      ))}>
        <React.Fragment>
          <MyStatusBar backgroundColor={'#DDD'} />
          <Stack />
        </React.Fragment>
      </Provider>
    );
  }
}
