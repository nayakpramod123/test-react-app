import 'source-map-support/register'
import 'newrelic'
import 'isomorphic-fetch'
import log from 'nmlvhub-node-logger'
import app from './app'
const httpsWrapper = require('nm-px-https-wrapper')

const httpListenerPort = (() => {
  return 9094
})()

const httpsListenerPort = (() => {
  return 8443
})()


// Replace you app.listen() call with the following.
httpsWrapper({
    // For Express
  app: app,
  httpPort: httpListenerPort,
  httpsPort: httpsListenerPort,
  callbacks: {
    httpListen: (server, port) => {
      log.info('app is listening at localhost:', port)
    },
    httpsListen: (server, port) => {
      log.info('app is listening at localhost:', port)
    },
    onClose: ({ httpServer, httpsServer }) => {
      log.info('SIGTERM issued...HTTP and HTTPS servers have shutting down, exiting process.')
    }
  }
})
