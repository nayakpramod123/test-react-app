import express from 'express'
import helmet from 'helmet'
import attachRunMiddleware from 'run-middleware'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import csrf from 'csurf'
import url from 'url'
import { basePath, assetPath, domains } from 'config'
import {
  errorCacheAll,
  errorNotFound,
  errorValidation,
  cacheControl,
  newrelic,
  logger
} from './middleware/index'
import { isDev } from './utils/index'
import { validateHealth, validateRoot } from './validation'
import { getHealth, getStudentsList, setStudentsList, setStudentData, getStudentNationality, setStudentNationality, getStudentsFamilyList, setStudentsFamilyList,
  setFamilyMembers, deleteFamilyMembers, getNationalityOfFamilyMembers, setNationalityOfFamilyMembers,  getAllNationalities} from './routes/index'

const app = express()

app.use(helmet({
  crossdomain: true, // checkmarx requirement
  dnsPrefetchControl: true,
  frameguard: true, // IRM recommendation (clickjacking, etc.)
  hidePoweredBy: true, // IRM requirement
  hsts: true, // checkmarx requirement
  ieNoOpen: true,
  noSniff: true,
  xssFilter: true
}))

const api = express.Router()
const domain = url.parse(domains.plan).hostname

const csrfProtection = csrf({
  cookie: { secure: !isDev, httpOnly: true, domain },
  ignoreMethods: ['GET', 'HEAD', 'OPTIONS', 'POST']
})

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

attachRunMiddleware(app)

app.disable('x-powered-by')
app.use(newrelic())

app.use(`${basePath}${assetPath}`, express.static('build/public', { maxAge: '365d' }))

app.use(cacheControl())
api.use(cookieParser())

api.route('/health').get(validateHealth, getHealth)
api.use(logger()) // everything after this on api router  will have full request logging.
api.route('/setStudentsList').post(logger(), validateRoot, csrfProtection, setStudentsList)
api.route('/getStudentsList').get(logger(), validateRoot, csrfProtection, getStudentsList)
api.route('/setStudentData/:id').put(logger(), validateRoot, csrfProtection, setStudentData)
api.route('/getNationalityForStudents/:id/Nationality').get(logger(), validateRoot, csrfProtection, getStudentNationality)
api.route('/setNationalityForStudents/:id/Nationality/:nationalityId').put(logger(), validateRoot, csrfProtection, setStudentNationality)
api.route('/getStudentsFamilyList/:id/FamilyMembers').get(logger(), validateRoot, csrfProtection, getStudentsFamilyList)
api.route('/setStudentsFamilyList/:id/FamilyMembers').post(logger(), validateRoot, csrfProtection, setStudentsFamilyList)
api.route('/setFamilyMembers/:id').put(logger(), validateRoot, csrfProtection, setFamilyMembers)
api.route('/deleteFamilyMembers/:id').delete(logger(), validateRoot, csrfProtection, deleteFamilyMembers)
api.route('/getNationalityOfFamilyMembers/:id/Nationality').get(logger(), validateRoot, csrfProtection, getNationalityOfFamilyMembers)
api.route('/setNationalityOfFamilyMembers/:id/Nationality/:nationalityId').put(logger(), validateRoot, csrfProtection, setNationalityOfFamilyMembers)
api.route('/getAllNationalities').get(logger(), validateRoot, csrfProtection, getAllNationalities)

app.use(basePath, api)

// ERROR HANDLING
app.use(errorValidation())
app.use(errorNotFound())
app.use(errorCacheAll())

export default app
