import { detailedErrors } from 'config'
import validate from 'express-validation'

export default () => (err, req, res, next) => {
  // specific for validation errors
  if (err instanceof validate.ValidationError) {
    if (detailedErrors) {
      return res.status(err.status).json(err)
    }
    return res.status(err.status).json({ msg: 'Bad Request' })
  }
  return next(err)
}
