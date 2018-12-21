import {
  FETCH_STUDENTS, SET_STUDENT_LIST, FETCH_STUDENT_NATIONALITY, UPDATE_STUDENT_NATIONALITY_SUCCESS,
  UPDATE_STUDENT_NATIONALITY_ERROR, FETCH_STUDENT_FAMILY_MEMBERS, UPDATE_STUDENT_FAMILY_MEMBERS_SUCCESS, SET_FAMILY_MEMBERS, DELETE_FAMILY_MEMBERS, FETCH_FAMILY_MEMBER_NATIONALITY,
  UPDATE_FAMILY_MEMBER_NATIONALITY, FETCH_ALL_NATIONALITIES, FETCH_STUDENTS_SUCCESS, FETCH_STUDENTS_ERROR, FETCH_STUDENT_NATIONALITY_SUCCESS,
  FETCH_STUDENT_NATIONALITY_ERROR, FETCH_STUDENT_FAMILY_MEMBERS_SUCCESS, FETCH_STUDENT_FAMILY_MEMBERS_ERROR, FETCH_FAMILY_MEMBER_NATIONALITY_SUCCESS,
  FETCH_FAMILY_MEMBER_NATIONALITY_ERROR, FETCH_ALL_NATIONALITIES_SUCCESS, FETCH_ALL_NATIONALITIES_ERROR, SET_STUDENT_LIST_SUCCESS,
  SET_STUDENT_LIST_ERROR, UPDATE_STUDENT_FAMILY_MEMBERS_ERROR, UPDATE_STUDENT_DATA_ERROR, UPDATE_STUDENT_DATA_SUCCESS, UPDATE_STUDENT_FAMILY_MEMBERS, UPDATE_STUDENT_DATA, UPDATE_STUDENT_NATIONALITY,
  SET_FAMILY_MEMBERS_ERROR, SET_FAMILY_MEMBERS_SUCCESS, UPDATE_FAMILY_MEMBER_NATIONALITY_ERROR, UPDATE_FAMILY_MEMBER_NATIONALITY_SUCCESS,
  DELETE_FAMILY_MEMBERS_ERROR, DELETE_FAMILY_MEMBERS_SUCCESS
} from './action-types'

import config from '../../utils/configs'
import { get } from 'axios'
import { update, find } from 'lodash'

const fetchOptions = { credentials: 'include' }
const postOptions = (data) => ({
  data: JSON.stringify(data),
  credentials: 'include',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
})
const putOptions = (data) => ({
  data: JSON.stringify(data),
  credentials: 'include',
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  }
})

const deleteOptions = (data) => ({
  data: JSON.stringify(data),
  credentials: 'include',
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json'
  }
})

// todo: add conditional load
export const fetchInitialState = () => (dispatch) => Promise.all([
  dispatch(fetchStudentsLists()),
  dispatch(fetchAllNationalities())
])

export const fetchStudentsLists = () => (dispatch, getState, axiosMethod) => {
  dispatch({ type: FETCH_STUDENTS })
  return axiosMethod(`${config.basePath}/getStudentsList`, fetchOptions)
    .then(json => dispatch({ type: FETCH_STUDENTS_SUCCESS, payload: json }))
    .catch(err => dispatch({ type: FETCH_STUDENTS_ERROR, payload: err }))
}

export const saveStudentList = () => (dispatch, getState, axiosMethod) => {
  dispatch({ type: SET_STUDENT_LIST })
  return axiosMethod(`${config.basePath}/setStudentsList`, postOptions(data))
    .then(json => dispatch({ type: SET_STUDENT_LIST_SUCCESS, payload: { sectionId: sectionId, questionId: questionId, json: json } }))
    .catch(err => {
      dispatch({ type: SET_STUDENT_LIST_ERROR, payload: { sectionId: sectionId, questionId: questionId, err: err, policyNum: data.policyNum } })
    })
}

export const updateStudentData = (firstName, lastName, dateOfBirth, studentId) => (dispatch, getState, axiosMethod) => {
  const body = {
    'firstName': firstName,
    'lastName': lastName,
    'dateOfBirth': dateOfBirth
  }

  dispatch({ type: UPDATE_STUDENT_DATA })
  return axiosMethod(`${config.basePath}/setStudentData/${studentId}`, putOptions(body))
    .then(response => dispatch({ type: UPDATE_STUDENT_DATA_SUCCESS, payload: response }))
    .catch(err => dispatch({ type: UPDATE_STUDENT_DATA_ERROR, payload: { err: err, body: body } }))
}

export const fetchNationalityForStudents = (studentId) => (dispatch, getState, axiosMethod) => {
  dispatch({ type: FETCH_STUDENT_NATIONALITY })
  return axiosMethod(`${config.basePath}/getNationalityForStudents/${studentId}/Nationality`, fetchOptions)
    .then(json => dispatch({ type: FETCH_STUDENT_NATIONALITY_SUCCESS, payload: json }))
    .catch(err => dispatch({ type: FETCH_STUDENT_NATIONALITY_ERROR, payload: err }))
}

export const updateNationalityForStudents = (firstName, lastName, dateOfBirth, studentId, nationalityId) => (dispatch, getState, axiosMethod) => {
  const body = {
    'firstName': firstName,
    'lastName': lastName,
    'dateOfBirth': dateOfBirth
  }

  dispatch({ type: UPDATE_STUDENT_NATIONALITY })
  return axiosMethod(`${config.basePath}/setNationalityForStudents/${studentId}/Nationality/${nationalityId}`, putOptions(body))
    .then(response => dispatch({ type: UPDATE_STUDENT_NATIONALITY_SUCCESS, payload: response }))
    .catch(err => dispatch({ type: UPDATE_STUDENT_NATIONALITY_ERROR, payload: { err: err, body: body } }))
}

export const fetchFamilyMembersForStudents = (studentId) => (dispatch, getState, axiosMethod) => {
  dispatch({ type: FETCH_STUDENT_FAMILY_MEMBERS })
  return axiosMethod(`${config.basePath}/getStudentsFamilyList/${studentId}/FamilyMembers`, fetchOptions)
    .then(json => dispatch({ type: FETCH_STUDENT_FAMILY_MEMBERS_SUCCESS, payload: json }))
    .catch(err => dispatch({ type: FETCH_STUDENT_FAMILY_MEMBERS_ERROR, payload: err }))
}

export const updateFamilyMembersForStudents = (studentId) => (dispatch, getState, axiosMethod) => {
  const body = {}

  dispatch({ type: UPDATE_STUDENT_FAMILY_MEMBERS })
  return axiosMethod(`${config.basePath}/setStudentsFamilyList/${studentId}/FamilyMembers`, putOptions(body))
    .then(response => dispatch({ type: UPDATE_STUDENT_FAMILY_MEMBERS_SUCCESS, payload: response }))
    .catch(err => dispatch({ type: UPDATE_STUDENT_FAMILY_MEMBERS_ERROR, payload: { err: err, body: body } }))
}

export const updateFamilyMembers = (firstName, lastName, dateOfBirth, relationship, familyId) => (dispatch, getState, axiosMethod) => {
  const body = {
    'firstName': firstName,
    'lastName': lastName,
    'dateOfBirth': dateOfBirth,
    'relationship': relationship
  }

  dispatch({ type: SET_FAMILY_MEMBERS })
  return axiosMethod(`${config.basePath}/setFamilyMembers/${familyId}`, putOptions(body))
    .then(response => dispatch({ type: SET_FAMILY_MEMBERS_SUCCESS, payload: response }))
    .catch(err => dispatch({ type: SET_FAMILY_MEMBERS_ERROR, payload: { err: err, body: body } }))
}

export const fetchNationalityForFamilyMembers = (familyMemberId) => (dispatch, getState, axiosMethod) => {
  dispatch({ type: FETCH_FAMILY_MEMBER_NATIONALITY })
  return axiosMethod(`${config.basePath}/getNationalityOfFamilyMembers/${familyMemberId}/Nationality`, fetchOptions)
    .then(json => dispatch({ type: FETCH_FAMILY_MEMBER_NATIONALITY_SUCCESS, payload: json }))
    .catch(err => dispatch({ type: FETCH_FAMILY_MEMBER_NATIONALITY_ERROR, payload: err }))
}

export const updateNationalityForFamilyMembers = (firstName, lastName, dateOfBirth, studentId, nationalityId) => (dispatch, getState, axiosMethod) => {
  const body = {
    'firstName': firstName,
    'lastName': lastName,
    'dateOfBirth': dateOfBirth
  }

  dispatch({ type: UPDATE_FAMILY_MEMBER_NATIONALITY })
  return axiosMethod(`${config.basePath}/setNationalityForStudents/${studentId}/Nationality/${nationalityId}`, putOptions(body))
    .then(response => dispatch({ type: UPDATE_FAMILY_MEMBER_NATIONALITY_SUCCESS, payload: response }))
    .catch(err => dispatch({ type: UPDATE_FAMILY_MEMBER_NATIONALITY_ERROR, payload: { err: err, body: body } }))
}

export const fetchAllNationalities = () => (dispatch, getState, axiosMethod) => {
  dispatch({ type: FETCH_ALL_NATIONALITIES })
  return axiosMethod(`${config.basePath}/getAllNationalities`, fetchOptions)
    .then(json => dispatch({ type: FETCH_ALL_NATIONALITIES_SUCCESS, payload: json }))
    .catch(err => dispatch({ type: FETCH_ALL_NATIONALITIES_ERROR, payload: err }))
}

export const deleteFamilyMembers = (familyId) => (dispatch, getState, axiosMethod) => {
  const body = {}

  dispatch({ type: DELETE_FAMILY_MEMBERS })
  return axiosMethod(`${config.basePath}/deleteFamilyMembers/${familyId}`, deleteOptions(body))
    .then(response => dispatch({ type: DELETE_FAMILY_MEMBERS_SUCCESS, payload: response }))
    .catch(err => dispatch({ type: DELETE_FAMILY_MEMBERS_ERROR, payload: { err: err, body: body } }))
}
