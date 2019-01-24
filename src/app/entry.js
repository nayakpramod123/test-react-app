import React from 'react'
import { Provider } from 'react-redux'
import App from './components/App'
import createStore from './store/create-store'
import makeAxios from './utils/make-axios'
import { BrowserRouter } from 'react-router-dom'
const store = createStore(window.__STATE__, makeAxios)

const Entry = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App dispatch={store.dispatch} />
      </BrowserRouter>
    </Provider>
  )
}

export default Entry
