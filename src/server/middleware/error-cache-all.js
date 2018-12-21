/* eslint no-unused-vars: 0 */
import log from 'nmlvhub-node-logger'
import newrelic from 'src/server/middleware/newrelic'
import { detailedErrors } from 'config'

export default () => (err, req, res, next) => {
  newrelic.noticeError(err)
  if (req && req.log) {
    req.log.error(err.message, err.stack)
  } else {
    log.error(err.message, err.stack)
  }
  if (detailedErrors) {
    return res.status(500).send(err.stack)
  }
  // TODO: REPLACE WITH REDIRECT TO 500 Error Page
  return res.status(500).send('Internal application error')
}
