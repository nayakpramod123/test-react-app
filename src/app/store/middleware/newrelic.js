import reporter, { errorReporter as newrelicErrorReporter, crashReporter as newrelicCrashReporter } from 'redux-reporter'

const report = (error) => {
  try {
    window.newrelic.noticeError(error)
  } catch (err) {}
}

export const crashReporter = newrelicCrashReporter(report)
export const errorReporter = newrelicErrorReporter(report)
export const analyticsReporter = reporter(({ type, payload }) => {
  try {
    window.newrelic.addPageAction(type, payload)
  } catch (err) {}
}, ({ meta = {} }) => meta.analytics)
