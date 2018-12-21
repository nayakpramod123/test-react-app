import asyncFunc from 'asyncawait/async'
import awaitFunc from 'asyncawait/await'
import { getStudentLists } from '../services'
import { getHeaders } from '../utils/index'

export default asyncFunc((req, res) => {
  const { log } = req
  try {
    // const headers = getHeaders(req, res)
    let headers = getHeaders(req, res)
    /**
     *  Spawn an updated logger, to ensure we log nmUniqueId throughout app for tracking purposes.
     *  This can be swapped out for whatever tracers are deemed necessary for your app
     */
    const response = awaitFunc(getStudentLists(headers))
    log.info({message: 'Success in getEditMessages'})
    return res.status(200).json(response.data)
  } catch (err) {
    log.warn({
      message: 'Get Students List Error',
      headers: req.headers,
      error: err.message
    })
    return res.status(400).end()
  }
})
