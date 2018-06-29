import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import Main from './src/main'
import reducers from './src/reducers'

const store = createStore(reducers)

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    )
  }
}
