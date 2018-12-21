import React from 'react'
import { hydrate } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import ensurePolyfills from './utils/ensure-polyfills'
import Entry from './entry'

import createStore from './store/create-store'
import makeAxios from './utils/make-axios'

const renderEntry = Component =>
  ensurePolyfills(() => {
    const app = document.getElementById('app')
    const store = createStore(window.__STATE__, makeAxios)
    hydrate(
      <AppContainer>
        <Component store={store} />
      </AppContainer>,
      app
    )
  })

renderEntry(Entry)

if (module.hot) {
  module.hot.accept('./entry.js', () => {
    /* eslint-disable global-require */
    const RootContainer = require('./entry.js').default
    renderEntry(RootContainer)
  })
}
