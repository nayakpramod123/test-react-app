const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())

const speakeasy = require('speakeasy')
const QRCode = require('qrcode')

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept, Pragma, Cache-Control')
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, POST, HEAD, DELETE')
  next()
})

const nationalities = [{
  ID: 1,
  Title: 'India'
}, {
  ID: 2,
  Title: 'UAE'
}, {
  ID: 3,
  Title: 'USA'
}]

let user = {
  'firstName': 'Pramod',
  'lastName': 'Nayak',
  email: 'nayakpramod12322@gmail.com',
  password: 'test'
}

const dateValue = new Date()
const dateFormat = dateValue.getFullYear() + '-' + (dateValue.getMonth() + 1) + '-' + dateValue.getDate()

let students = [{
  ID: 1,
  firstName: 'John',
  lastName: 'Doe',
  dateOfBirth: dateFormat,
  nationality: nationalities[0],
  familyMembers: [{
    ID: 1,
    firstName: 'James',
    lastName: 'Doe',
    dateOfBirth: dateFormat,
    relationship: 'Parent',
    nationality: nationalities[0]
  }]
}]

app.get('/api/Students', (req, res) => {
  const studentsToSend =
    students.map(({ID, firstName, lastName, dateOfBirth}) => ({ID, firstName, lastName, dateOfBirth}))
  res.send(studentsToSend)
})

app.post('/api/Students', (req, res) => {
  const {body: {firstName, lastName, dateOfBirth}} = req
  const ID = Math.floor(Math.random() * 100000)
  students = students.concat([{ID, firstName, lastName, dateOfBirth}])
  res.send({ID, firstName, lastName, dateOfBirth})
})

app.get('/api/Students/:id', ({params: {id}}, res) => res.send(
  students
    .filter(s => s.ID === parseInt(id, 10))
    .map(({ID, firstName, lastName, dateOfBirth}) =>
      ({ID, firstName, lastName, dateOfBirth}))[0]))

app.put('/api/Students/:id', ({params: {id}, body: {firstName, lastName, dateOfBirth}},
  res) => {
  const studentIndex = students.findIndex(({ID}) => ID === parseInt(id, 10))
  const studentToUpdate = students[studentIndex]
  studentToUpdate.firstName = firstName
  studentToUpdate.lastName = lastName
  studentToUpdate.dateOfBirth = dateOfBirth

  res.send(students[studentIndex])
})

app.get('/api/Students/:studentID/Nationality/',
  ({params: {studentID}}, res) => {
    const studentToUpdate = students.find(({ID}) => ID === parseInt(studentID, 10))
    if (studentToUpdate) {
      const {nationality} = studentToUpdate
      res.send({nationality})
    } else {
      res.send({})
    }
  })

app.put('/api/Students/:studentID/Nationality/:nationalityID',
  ({params: {studentID, nationalityID}}, res) => {
    const studentIndexToUpdate = students.findIndex(({ID}) => ID === parseInt(studentID, 10))
    const nationalityToUpdate = nationalities.find(({ID}) =>
      ID === parseInt(nationalityID, 10))
    const studentToUpdate = students[studentIndexToUpdate]

    studentToUpdate.nationality = nationalityToUpdate
    const {ID, firstName, lastName, nationality} = studentToUpdate
    res.send({ID, firstName, lastName, nationality})
  })

app.get('/api/Nationalities', (_, res) => res.send(nationalities))

app.get('/api/Students/:studentID/FamilyMembers/', ({params: {studentID}}, res) => {
  const familyMembersForStudent = students.find(s => s.ID === parseInt(studentID, 10))
  if (familyMembersForStudent) {
    res.send(familyMembersForStudent.familyMembers)
  } else {
    res.send([])
  }
})

app.post('/api/Students/:studentID/FamilyMembers/', (req, res) => {
  const {body: {firstName, lastName, dateOfBirth, relationship}, params: {studentID}} = req
  const studentToUpdate = students.find(s => s.ID === parseInt(studentID, 10))

  const newFamilyMember = {
    ID: Math.floor(Math.random() * 100000),
    firstName,
    lastName,
    dateOfBirth,
    relationship
  }
  studentToUpdate.familyMembers = (studentToUpdate.familyMembers || []).concat([newFamilyMember])
  res.send(newFamilyMember)
})

app.put('/api/FamilyMembers/:id',
  (req, res) => {
    const {body: {firstName, lastName, dateOfBirth, relationship}, params: {id: ID}} = req

    const studentToUpdate = students.find(s => s.familyMembers.some(k => k.ID === parseInt(ID, 10)))
    const familyMemberToUpdate = studentToUpdate.familyMembers.find(s => s.ID === parseInt(ID, 10))
    const studentIndex = students.indexOf(studentToUpdate)
    const familyMemberIndex = studentToUpdate.familyMembers.indexOf(familyMemberToUpdate)

    familyMemberToUpdate.firstName = firstName
    familyMemberToUpdate.lastName = lastName
    familyMemberToUpdate.dateOfBirth = dateOfBirth
    familyMemberToUpdate.relationship = relationship

    students[studentIndex].familyMembers[familyMemberIndex] = familyMemberToUpdate

    res.send({firstName, lastName, dateOfBirth, relationship, ID})
  })

app.delete('/api/FamilyMembers/:id',
  (req, res) => {
    const {params: {id: ID}} = req

    const studentToUpdate = students.find(s => s.familyMembers.some(k => k.ID === parseInt(ID, 10)))
    const familyMemberToUpdate = studentToUpdate.familyMembers.find(s => s.ID === parseInt(ID, 10))
    const studentIndex = students.indexOf(studentToUpdate)
    const familyMemberIndex = studentToUpdate.familyMembers.indexOf(familyMemberToUpdate)

    students[studentIndex].familyMembers.splice(familyMemberIndex, 1)

    res.send(students[studentIndex].familyMembers)
  })

app.get('/api/FamilyMembers/:familyMemberID/Nationality/',
  ({params: {familyMemberID}}, res) => {
    const studentToUpdate = students.find(s => s.familyMembers.some(k => k.ID === parseInt(familyMemberID, 10)))
    if (studentToUpdate) {
      const familyMemberToUpdate = studentToUpdate.familyMembers.find(s => s.ID === parseInt(familyMemberID, 10))
      res.send(familyMemberToUpdate.nationality)
    } else {
      res.send({})
    }
  })

app.put('/api/FamilyMembers/:familyMemberID/Nationality/:nationalityID',
  ({params: {familyMemberID, nationalityID}}, res) => {
    const studentToUpdate = students.find(s => s.familyMembers.some(k => k.ID === parseInt(familyMemberID, 10)))
    const familyMemberToUpdate = studentToUpdate.familyMembers.find(s => s.ID === parseInt(familyMemberID, 10))
    const studentIndex = students.indexOf(studentToUpdate)
    const familyMemberIndex = studentToUpdate.familyMembers.indexOf(familyMemberToUpdate)
    const nationality = nationalities.find(s => s.ID === +nationalityID)

    students[studentIndex].familyMembers[familyMemberIndex].nationality = nationality
    res.send(students[studentIndex].familyMembers)
  })

app.post('/login', function (req, res) {
  if (req.body.email === user.email && req.body.password === user.password) {
    return res.status(200).send('success')
  } else {
    return res.status(400).send('Invalid Credentials')
  }
})

app.post('/verifyotp', function (req, res) {
  if (!req.body.otp) {
    return res.status(400).send('Please enter otp to continue')
  }
  // validate otp
  var verified = speakeasy.totp.verify({
    secret: req.body.secret,
    encoding: 'base32',
    token: req.body.otp
  })
  if (verified) {
    return res.status(200).send('success')
  } else {
    return res.status(400).send('Invalid OTP')
  }
})

// setup two factor for logged in user
app.post('/twofactor/setup', function (req, res) {
  const secret = speakeasy.generateSecret({length: 10})
  QRCode.toDataURL(secret.otpauth_url, (err, dataUrl) => {
    if (err) {
      console.log('Error: ', err)
    }
    // save to logged in user.
    user.twofactor = {
      secret: '',
      tempSecret: secret.base32,
      dataURL: dataUrl,
      otpURL: secret.otpauth_url
    }
    return res.json({
      message: 'Verify OTP',
      tempSecret: secret.base32,
      dataURL: dataUrl,
      otpURL: secret.otpauth_url
    })
  })
})

// get 2fa details
app.get('/twofactor/setup', function (req, res) {
  res.json(user.twofactor)
})

// disable 2fa
app.delete('/twofactor/setup', function (req, res) {
  delete user.twofactor
  res.send('success')
})

// before enabling totp based 2fa; it's important to verify, so that we don't end up locking the user.
app.post('/twofactor/verify', function (req, res) {
  var verified = speakeasy.totp.verify({
    secret: user.twofactor.tempSecret, // secret of the logged in user
    encoding: 'base32',
    token: req.body.token
  })
  if (verified) {
    user.twofactor.secret = user.twofactor.tempSecret
    return res.send('Two-factor auth enabled')
  }
  return res.status(400).send('Invalid token, verification failed')
})

app.listen('8088', () => console.log('Started Listening'))
