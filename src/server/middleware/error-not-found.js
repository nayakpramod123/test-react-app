import log from 'nmlvhub-node-logger'

export default () => (req, res) => {
  log.error(`Not found: ${req.originalUrl}`)
  // TODO: REPLACE WITH REDIRECT TO 404 PAGE
  return res.status(404).send('404 Not Found')
}
