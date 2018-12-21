import React from 'react'
import { renderToString } from 'react-dom/server'
import { readFileSync } from 'fs'
import newrelic from 'newrelic'
import _get from 'lodash/get'
import { basePath, domains, services } from 'config'
import App from './../../app/entry'
import createStore from '../../app/store/create-store'
import { initialState as meta } from './../../app/store/reducers/meta'
import makeAxios from '../../app/utils/make-axios'

const initialState = {
  meta
}

const createPreloadedState = () =>
  Object.assign({}, initialState, {
    meta: Object.assign({}, meta, { title: 'React Application' })
  })
const AppShell = ({ jsxString, state, cssUrl, jsUrl, newrelicJS, csrfToken, clientConfig, encodedContext }) => {
  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <title>${state.meta.title}</title>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta name="mobile-web-app-capable" content="yes">
      ${cssUrl ? `<link rel="stylesheet" media="all" href="${cssUrl}">` : ''}
      <script>
        window.__CONFIG__ = ${JSON.stringify(clientConfig)};
        window.browserContext = "${encodedContext}"
      </script>
    </head>
    <body>
      <div id="app" class="ph-container">${jsxString}</div>
      <script>window.__STATE__=${JSON.stringify(state).replace(/</g, '\\u003c')}</script>
      <script src="${jsUrl}"></script>
    </body>
  </html>`
}
const clientConfig = { basePath, domains, services }

const assetManifest = JSON.parse(readFileSync('./build/public/assets.json'))

const cssUrl = _get(assetManifest, 'app.css', '')
const jsUrl = _get(assetManifest, 'app.js', '')

export default async (req, res, next) => {
  const { log } = req
  try {
    const browserContext = {
      cookies: req.cookies,
      headers: req.headers
    }
    const encodedContext = Buffer.from(JSON.stringify(browserContext),
      'utf8').toString('base64')

    const newrelicJS = newrelic.getBrowserTimingHeader()

    const store = await createStore(createPreloadedState(), makeAxios)

    const state = store.getState()

    const jsxString = renderToString(<App store={store} />)

    const csrfToken = req.csrfToken()
    const html = AppShell({
      cssUrl,
      jsUrl,
      clientConfig,
      state,
      newrelicJS,
      csrfToken,
      jsxString,
      encodedContext
    })
    return res.send(html)
  } catch (err) {
    log.warn({
      message: 'React Application Error: Error in get root service call',
      headers: req.headers,
      error: err.message
    })
    return next(err)
  }
}
