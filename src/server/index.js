require('source-map-support/register')
require('newrelic')
let log  = require('pino')
let app = require('./app')
const https = require('https')
const http = require('http')
const httpsWrapper = require('nm-px-https-wrapper')

const httpListenerPort = (() => {
  return 9094
})()

const httpsListenerPort = (() => {
  return 8443
})()


const httpServer = http.createServer(app).listen(httpListenerPort, () => {
  log.info('app is listening at localhost:' + httpListenerPort)
})

const httpsServer = https.createServer(nmlvLastMileCerts.apiCerts, app).listen(httpsListenerPort, () => {
  log.info('app is listening at localhost:' + httpsListenerPort)
})

process.on('SIGTERM', () => {
  httpServer.close(() => {
    log.info('SIGTERM issued...app is shutting down')
    process.exit(0)
  })
  httpsServer.close(() => {
    log.info('SIGTERM issued...app is shutting down')
    process.exit(0)
  })
})
