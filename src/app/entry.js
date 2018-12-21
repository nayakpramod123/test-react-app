import React from 'react'
import { Provider } from 'react-redux'
import App from './components/App'

const Entry = ({store}) => {
  return (
    <Provider store={store}>
        <App />
    </Provider>
  )
}

export default Entry
