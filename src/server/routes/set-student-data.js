import asyncFunc from 'asyncawait/async'
import awaitFunc from 'asyncawait/await'
import { setStudentData } from '../services'
import { getHeaders } from '../utils/index'

export default asyncFunc((req, res) => {
  const { log } = req
  try {
    const headers = getHeaders(req, res)
    /**
     *  Spawn an updated logger, to ensure we log nmUniqueId throughout app for tracking purposes.
     *  This can be swapped out for whatever tracers are deemed necessary for your app
     */
    const putData = {
      'firstName': req.body.firstName,
      'lastName': req.body.lastName,
      'dateOfBirth': req.body.dateOfBirth
    }
    const response = awaitFunc(setStudentData(headers, putData, req.params.id))
    log.info({message: 'Success in setStudentData'})
    return res.status(200).json(response)
  } catch (err) {
    log.warn({
      message: 'React App Error: Error in setStudentData',
      headers: req.headers,
      error: err.message
    })
    return res.status(400).end()
  }
})
