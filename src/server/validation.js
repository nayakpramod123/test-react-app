import * as Joi from 'joi'

const headers = Joi.object()
  .keys()
  .unknown()
const putExampleBody = Joi.object()
  .keys({
    _csrf: Joi.string().required(),
    info: Joi.string().required()
  })
  .unknown()

export const validateRoot = (req, res, next) => {
  Joi.validate(req.headers, headers, err => {
    if (err) {
      return next(err)
    }
    return next()
  })
}

export const validateHealth = (req, res, next) => {
  Joi.validate(req.headers, headers, err => {
    if (err) {
      return next(err)
    }
    return next()
  })
}

export const validatePutExample = (req, res, next) => {
  Joi.validate(req.body, putExampleBody, err => {
    if (err) {
      return next(err)
    }
    return next()
  })
}
