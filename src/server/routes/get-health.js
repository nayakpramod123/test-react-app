import newrelic from 'newrelic'
import os from 'os'

export default (req, res) => {
  newrelic.setIgnoreTransaction(true)
  return res.json({
    'Node Host': os.hostname(),
    'Git SHA': process.env.GIT_COMMIT
  })
}
