import newrelic from 'src/server/middleware/newrelic'

export default () => (req, res, next) => {
  newrelic.addCustomParameter('nmUniqueId', req.headers['x-nm-nm_uid'] || 'no_user')
  newrelic.addCustomParameter('GIT_SHA', process.env.GIT_COMMIT)
  newrelic.addCustomParameter('env', `${process.env.NODE_ENV}`)
  return next()
}
