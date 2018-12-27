import { FETCH_STUDENTS, FETCH_STUDENTS_SUCCESS, FETCH_STUDENTS_ERROR, UPDATE_STUDENT_NATIONALITY, UPDATE_STUDENT_DATA,
UPDATE_STUDENT_DATA_SUCCESS, UPDATE_STUDENT_DATA_ERROR, FETCH_STUDENT_NATIONALITY, FETCH_STUDENT_NATIONALITY_ERROR,
FETCH_STUDENT_NATIONALITY_SUCCESS,SET_STUDENT_LIST, SET_STUDENT_LIST_ERROR, SET_STUDENT_LIST_SUCCESS,
UPDATE_STUDENT_NATIONALITY_ERROR, UPDATE_STUDENT_NATIONALITY_SUCCESS,ADD_ROW_FAMILY, SUBMIT_STUDENT_SECTION,SELECTED_STUDENT_ROW,
  FETCH_ACTIVE_SECTIONS, SELECTED_ROLE, NATIONALITY_INDICATOR, SUBMIT_BUTTON_VALUE, ADD_BUTTON_VALUE, SELECTED_FAMILY_ROW,
  IS_ADD_BUTTON_CLICKED} from '../actions/action-types'
import {cloneDeep, findIndex, find} from 'lodash'
import config from 'Config'

export const initialState = {
  studentData: [],
  studentNationality: null,
  isFetching: false,
  hasError: false,
  error: null,
  activeSectionId: config.activeSectionId,
  familyRowCount: 0,
  submitStudentSection: false,
  selectedStudentData: null,
  isRegistar: null,
  nationalityIndicator: null,
  submitButtonValue: '',
  addButtonValue: '',
  selectedFamilyRow: null,
  isAddButtonClicked: false
}

export default (state = initialState, {type, payload, meta}) => {
  let stateData
  switch (type) {
    case FETCH_STUDENTS:
      return Object.assign({}, state, {
        isFetching: true,
        hasError: false,
        error: null
      })
    case SET_STUDENT_LIST:
      return state
    case UPDATE_STUDENT_DATA:
      return state
    case FETCH_STUDENT_NATIONALITY:
      return state
    case UPDATE_STUDENT_NATIONALITY:
      return state
    case FETCH_STUDENTS_ERROR:
      return Object.assign({}, state, {
        hasError: true,
        error: payload,
        isFetching: false
      })
    case FETCH_STUDENTS_SUCCESS:
      return Object.assign({}, state, {
        studentData: payload.data,
        isFetching: false
      })
    case SET_STUDENT_LIST_SUCCESS:
      const dataArr = cloneDeep(state.studentData)
      dataArr.push(payload.data)
      return Object.assign({}, state, {
        studentData: dataArr,
        isFetching: false
      })
    case SET_STUDENT_LIST_ERROR:
      return Object.assign({}, state, {
        hasError: true,
        error: payload,
        isFetching: false
      })
    case UPDATE_STUDENT_DATA_SUCCESS:
      const studentDataArr = cloneDeep(state.studentData)
      const editPath = findIndex(studentDataArr, student => student.ID === payload.data.ID)
      if (editPath === -1) {
        studentDataArr.push(payload.data)
      } else {
        const data ={
          ID: payload.data.ID,
          firstName: payload.data.firstName,
          lastName: payload.data.lastName,
          dateOfBirth: payload.data.dateOfBirth
        }
        studentDataArr[editPath] = data
      }
      return Object.assign({}, state, {
        studentData: studentDataArr,
        isFetching: false
      })
    case UPDATE_STUDENT_DATA_ERROR:
      return Object.assign({}, state, {
        hasError: true,
        error: payload,
        isFetching: false
      })
    case FETCH_ACTIVE_SECTIONS:
      return Object.assign({}, state, {
        activeSectionId: payload,
        isFetching: false
      })
    case ADD_ROW_FAMILY:
      let familyRowCountValue = cloneDeep(state.familyRowCount)
      return Object.assign({}, state, {
        familyRowCount: familyRowCountValue++
      })
    case SUBMIT_STUDENT_SECTION:
      return Object.assign({}, state, {
        submitStudentSection: payload
      })
    case SELECTED_STUDENT_ROW:
      return Object.assign({}, state, {
        selectedStudentData: payload
      })
    case SELECTED_ROLE:
      return Object.assign({}, state, {
        isRegistar: payload
      })
    case NATIONALITY_INDICATOR:
      return Object.assign({}, state, {
        nationalityIndicator: payload
      })
    case SUBMIT_BUTTON_VALUE:
      return Object.assign({}, state, {
        submitButtonValue: payload
      })
    case FETCH_STUDENT_NATIONALITY_SUCCESS:
      return Object.assign({}, state, {
        studentNationality: payload.data
      })
    case FETCH_STUDENT_NATIONALITY_ERROR:
      return Object.assign({}, state, {
        hasError: true,
        error: payload,
        isFetching: false
      })
    case UPDATE_STUDENT_NATIONALITY_SUCCESS:
      const nationality ={
        nationality: payload.data.nationality
      }
      return Object.assign({}, state, {
        studentNationality: nationality
      })
    case UPDATE_STUDENT_NATIONALITY_ERROR:
      return Object.assign({}, state, {
        hasError: true,
        error: payload,
        isFetching: false
      })
    case ADD_BUTTON_VALUE:
      return Object.assign({}, state, {
        addButtonValue: payload
      })
    case SELECTED_FAMILY_ROW:
      return Object.assign({}, state, {
        selectedFamilyRow: payload
      })
    case IS_ADD_BUTTON_CLICKED:
      return Object.assign({}, state, {
        isAddButtonClicked: payload
      })
    default:
      return state
  }
}

