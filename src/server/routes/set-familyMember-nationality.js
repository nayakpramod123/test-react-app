import asyncFunc from 'asyncawait/async'
import awaitFunc from 'asyncawait/await'
import { setFamilyMemberNationality } from '../services'
import { getHeaders } from '../utils/index'

export default asyncFunc((req, res) => {
  const { log } = req
  try {
   let headers = getHeaders(req, res)
    /**
     *  Spawn an updated logger, to ensure we log nmUniqueId throughout app for tracking purposes.
     *  This can be swapped out for whatever tracers are deemed necessary for your app
     */
    const postData = {
      'firstName': req.body.firstName,
      'lastName': req.body.lastName,
      'dateOfBirth': req.body.dateOfBirth
    }
    const response = awaitFunc(setFamilyMemberNationality(headers, postData, req.params.id, req.params.nationalityId))
    log.info({message: 'Success in setStudentLists'})
    return res.status(200).json(response.data)
  } catch (err) {
    log.warn({
      message: 'React App Error: Error in setStudentLists',
      headers: req.headers,
      error: err.message
    })
    return res.status(400).end()
  }
})
