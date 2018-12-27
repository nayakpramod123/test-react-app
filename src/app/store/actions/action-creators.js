import {
  FETCH_STUDENTS, SET_STUDENT_LIST, FETCH_STUDENT_NATIONALITY, UPDATE_STUDENT_NATIONALITY_SUCCESS,
  UPDATE_STUDENT_NATIONALITY_ERROR, FETCH_STUDENT_FAMILY_MEMBERS, UPDATE_STUDENT_FAMILY_MEMBERS_SUCCESS, SET_FAMILY_MEMBERS, DELETE_FAMILY_MEMBERS, FETCH_FAMILY_MEMBER_NATIONALITY,
  UPDATE_FAMILY_MEMBER_NATIONALITY, FETCH_ALL_NATIONALITIES, FETCH_STUDENTS_SUCCESS, FETCH_STUDENTS_ERROR, FETCH_STUDENT_NATIONALITY_SUCCESS,
  FETCH_STUDENT_NATIONALITY_ERROR, FETCH_STUDENT_FAMILY_MEMBERS_SUCCESS, FETCH_STUDENT_FAMILY_MEMBERS_ERROR, FETCH_FAMILY_MEMBER_NATIONALITY_SUCCESS,
  FETCH_FAMILY_MEMBER_NATIONALITY_ERROR, FETCH_ALL_NATIONALITIES_SUCCESS, FETCH_ALL_NATIONALITIES_ERROR, SET_STUDENT_LIST_SUCCESS,
  SET_STUDENT_LIST_ERROR, UPDATE_STUDENT_FAMILY_MEMBERS_ERROR, UPDATE_STUDENT_DATA_ERROR, UPDATE_STUDENT_DATA_SUCCESS, UPDATE_STUDENT_FAMILY_MEMBERS, UPDATE_STUDENT_DATA, UPDATE_STUDENT_NATIONALITY,
  SET_FAMILY_MEMBERS_ERROR, SET_FAMILY_MEMBERS_SUCCESS, UPDATE_FAMILY_MEMBER_NATIONALITY_ERROR, UPDATE_FAMILY_MEMBER_NATIONALITY_SUCCESS,
  DELETE_FAMILY_MEMBERS_ERROR, DELETE_FAMILY_MEMBERS_SUCCESS, FETCH_ACTIVE_SECTIONS, FAMILY_NATIONALITY_INDICATOR, SUBMIT_STUDENT_SECTION,
  SELECTED_STUDENT_ROW, SELECTED_ROLE, NATIONALITY_INDICATOR, SUBMIT_BUTTON_VALUE, ADD_BUTTON_VALUE, SELECTED_FAMILY_ROW, ADD_FAMILY_BUTTON,
  IS_ADD_BUTTON_CLICKED
} from './action-types'

import { get, post, put } from 'axios'
import axios from 'axios'
import config from 'Config'

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

export const fetchStudentsLists = () => (dispatch) => {
  dispatch({ type: FETCH_STUDENTS })
  return get(`${config.domains.restService}${config.services.students}`, fetchOptions)
    .then(json => dispatch({ type: FETCH_STUDENTS_SUCCESS, payload: json }))
    .catch(err => dispatch({ type: FETCH_STUDENTS_ERROR, payload: err }))
}

export const saveStudentList = (studentObj) => (dispatch) => {
  const body ={
    firstName: studentObj.firstName,
    lastName: studentObj.lastName,
    dateOfBirth: studentObj.dateOfBirth,
  }
  dispatch({ type: SET_STUDENT_LIST })
  return post(`${config.domains.restService}${config.services.students}`, body, postOptions(body))
    .then(json => dispatch({ type: SET_STUDENT_LIST_SUCCESS, payload: json }))
    .catch(err => dispatch({ type: SET_STUDENT_LIST_ERROR, payload: err }))
}

export const updateStudentData = (studentObj, studentId) => (dispatch) => {
  const body = {
    'firstName': studentObj.firstName,
    'lastName': studentObj.lastName,
    'dateOfBirth': studentObj.dateOfBirth
  }

  dispatch({ type: UPDATE_STUDENT_DATA })
  return put(`${config.domains.restService}${config.services.students}/${studentId}`, body, putOptions(body))
    .then(response => dispatch({ type: UPDATE_STUDENT_DATA_SUCCESS, payload: response }))
    .catch(err => dispatch({ type: UPDATE_STUDENT_DATA_ERROR, payload: { err: err, body: body } }))
}

export const fetchNationalityForStudents = (studentId) => (dispatch) => {
  dispatch({ type: FETCH_STUDENT_NATIONALITY })
  return get(`${config.domains.restService}${config.services.students}/${studentId}/Nationality/`, fetchOptions)
    .then(json => dispatch({ type: FETCH_STUDENT_NATIONALITY_SUCCESS, payload: json }))
    .catch(err => dispatch({ type: FETCH_STUDENT_NATIONALITY_ERROR, payload: err }))
}

export const updateNationalityForStudents = (studentId, nationalityId) => (dispatch) => {
  const body = {}

  dispatch({ type: UPDATE_STUDENT_NATIONALITY })
  return put(`${config.domains.restService}${config.services.students}/${studentId}/Nationality/${nationalityId}`, body, putOptions(body))
    .then(response => dispatch({ type: UPDATE_STUDENT_NATIONALITY_SUCCESS, payload: response }))
    .catch(err => dispatch({ type: UPDATE_STUDENT_NATIONALITY_ERROR, payload: { err: err, body: body } }))
}

export const fetchFamilyMembersForStudents = (studentId) => (dispatch) => {
  dispatch({ type: FETCH_STUDENT_FAMILY_MEMBERS })
  return get(`${config.domains.restService}${config.services.students}/${studentId}/FamilyMembers/`, fetchOptions)
    .then(json => dispatch({ type: FETCH_STUDENT_FAMILY_MEMBERS_SUCCESS, payload: json }))
    .catch(err => dispatch({ type: FETCH_STUDENT_FAMILY_MEMBERS_ERROR, payload: err }))
}

export const updateFamilyMembers = (familyObj, studentId) => (dispatch) => {
  const body = {
    'firstName': familyObj.firstName,
    'lastName': familyObj.lastName,
    'dateOfBirth': familyObj.dateOfBirth,
    'relationship': familyObj.relationship
  }

  dispatch({ type: UPDATE_STUDENT_FAMILY_MEMBERS })
  return  post(`${config.domains.restService}${config.services.students}/${studentId}/FamilyMembers/`, body, postOptions(body))
    .then(response => dispatch({ type: UPDATE_STUDENT_FAMILY_MEMBERS_SUCCESS, payload: response }))
    .catch(err => dispatch({ type: UPDATE_STUDENT_FAMILY_MEMBERS_ERROR, payload: { err: err, body: body } }))
}

export const updateFamilyMembersForStudents = (familyObj, familyId) => (dispatch) => {
  const body = {
    'firstName': familyObj.firstName,
    'lastName': familyObj.lastName,
    'dateOfBirth': familyObj.dateOfBirth,
    'relationship': familyObj.relationship
  }

  dispatch({ type: SET_FAMILY_MEMBERS })
  return put(`${config.domains.restService}${config.services.familyMembers}/${familyId}`, body, putOptions(body))
    .then(response => dispatch({ type: SET_FAMILY_MEMBERS_SUCCESS, payload: response }))
    .catch(err => dispatch({ type: SET_FAMILY_MEMBERS_ERROR, payload: { err: err, body: body } }))
}

export const fetchNationalityForFamilyMembers = (familyMemberId) => (dispatch) => {
  dispatch({ type: FETCH_FAMILY_MEMBER_NATIONALITY })
  return get(`${config.domains.restService}${config.services.familyMembers}/${familyMemberId}/Nationality/`, fetchOptions)
    .then(json => dispatch({ type: FETCH_FAMILY_MEMBER_NATIONALITY_SUCCESS, payload: json }))
    .catch(err => dispatch({ type: FETCH_FAMILY_MEMBER_NATIONALITY_ERROR, payload: err }))
}
``
export const updateNationalityForFamilyMembers = (familyId, nationalityId) => (dispatch) => {
  const body = {}

  dispatch({ type: UPDATE_FAMILY_MEMBER_NATIONALITY })
  return put(`${config.domains.restService}${config.services.familyMembers}/${familyId}/Nationality/${nationalityId}`, body, putOptions(body))
    .then(response => dispatch({ type: UPDATE_FAMILY_MEMBER_NATIONALITY_SUCCESS, payload: response }))
    .catch(err => dispatch({ type: UPDATE_FAMILY_MEMBER_NATIONALITY_ERROR, payload: { err: err, body: body } }))
}

export const fetchAllNationalities = () => (dispatch) => {
  dispatch({ type: FETCH_ALL_NATIONALITIES })
  return get(`${config.domains.restService}${config.services.nationalities}`, fetchOptions)
    .then(json => dispatch({ type: FETCH_ALL_NATIONALITIES_SUCCESS, payload: json }))
    .catch(err => dispatch({ type: FETCH_ALL_NATIONALITIES_ERROR, payload: err }))
}

export const deleteFamilyMembers = (familyId) => (dispatch) => {
  const body = {}

  dispatch({ type: DELETE_FAMILY_MEMBERS })
  return axios.delete(`${config.domains.restService}${config.services.familyMembers}/${familyId}`, body, deleteOptions(body))
    .then(response => dispatch({ type: DELETE_FAMILY_MEMBERS_SUCCESS, payload: response }))
    .catch(err => dispatch({ type: DELETE_FAMILY_MEMBERS_ERROR, payload: { err: err, body: body } }))
}

export const updateActiveSectionId = (activeSectionId) => ({
  type: FETCH_ACTIVE_SECTIONS,
  payload: activeSectionId
})

export const submitSectionStudent = (value) => ({
  type: SUBMIT_STUDENT_SECTION,
  payload: value
})
export const selectedStudentRow = (rowValues) => ({
  type: SELECTED_STUDENT_ROW,
  payload: rowValues
})

export const roleSelected = (value) => ({
  type: SELECTED_ROLE,
  payload: value
})

export const disableNationalityOnAdd = (value) => ({
  type: NATIONALITY_INDICATOR,
  payload: value
})
export const submitButtonValue = (value) => ({
  type: SUBMIT_BUTTON_VALUE,
  payload: value
})

export const addButtonValue = (value) => ({
  type: ADD_BUTTON_VALUE,
  payload: value
})

export const selectedFamilyRow = (rowValues) => ({
  type: SELECTED_FAMILY_ROW,
  payload: rowValues
})

export const disableNationalityOnAddForFamily = (value) => ({
  type: FAMILY_NATIONALITY_INDICATOR,
  payload: value
})

export const addFamilyMemberButton = (value) => ({
  type: ADD_FAMILY_BUTTON,
  payload: value
})

export const isAddButtonClicked = (value) => ({
  type: IS_ADD_BUTTON_CLICKED,
  payload: value
})