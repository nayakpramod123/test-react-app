import React from 'react'
import { Provider } from 'react-redux'
import App from './components/App'
import createStore from './store/create-store'
import makeAxios from './utils/make-axios'
const store = createStore(window.__STATE__, makeAxios)

const Entry = () => {
  return (
    <Provider store={store}>
        <App dispatch={store.dispatch}/>
    </Provider>
  )
}

export default Entry
