import log from 'nmlvhub-node-logger'
import uniqid from 'uniqid'

export default () => (req, res, next) => {
  const start = Date.now()
  let transactionId = uniqid()
  const loggedHeaders = Object.assign({}, req.headers, { cookie: '' })
  res.set('transactionId', transactionId)
  req.log = log.child({
    requestPath: req.url,
    environment: process.env.NODE_APP_INSTANCE || process.env.NODE_ENV,
    correlationId: req.headers['x-nmlvhub-corid'],
    httpVerb: req.method,
    params: req.params,
    headers: loggedHeaders,
    transactionid: transactionId,
    GIT_SHA: process.env.GIT_COMMIT
  })
  req.log.info('Request Received')
  res.on('finish', () => {
    const duration = Date.now() - start
    req.log.info(`Service Response Time: ${duration}`)
  })
  return next()
}
