import { compose, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers/root-reducer'
import IS_CLIENT from '../utils/is-client'
import { analyticsReporter, crashReporter, errorReporter } from './middleware/newrelic'
import satellite from './middleware/satellite'

const analyticsMiddleware = []

if (IS_CLIENT) {
  if (window.newrelic) {
    analyticsMiddleware.push(crashReporter, analyticsReporter, errorReporter)
  }
  if (window._satellite) {
    analyticsMiddleware.push(satellite)
  }
}

export default (initialState, fetchMethod) => {
  const enhancer = compose(
      applyMiddleware(...[thunk.withExtraArgument(fetchMethod), ...analyticsMiddleware]),
      IS_CLIENT && window.devToolsExtension ? window.devToolsExtension() : (f) => f
  )

  const store = createStore(rootReducer, initialState, enhancer)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers/root-reducer', () => {
      const nextRootReducer = require('./reducers/root-reducer').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
