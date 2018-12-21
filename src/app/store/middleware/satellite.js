import reporter from 'redux-reporter'

export default reporter(({ type, payload }) => {
  try {
    window._satellite.fireEvent('push', { type, payload })
  } catch (err) {}
}, ({ meta = {} }) => meta.analytics)
