import { FETCH_STUDENTS, FETCH_STUDENTS_SUCCESS, FETCH_STUDENTS_ERROR, UPDATE_STUDENT_NATIONALITY, UPDATE_STUDENT_DATA, UPDATE_STUDENT_FAMILY_MEMBERS,
UPDATE_STUDENT_DATA_SUCCESS, UPDATE_STUDENT_DATA_ERROR, UPDATE_STUDENT_FAMILY_MEMBERS_ERROR, FETCH_STUDENT_FAMILY_MEMBERS, FETCH_STUDENT_FAMILY_MEMBERS_ERROR,
FETCH_STUDENT_FAMILY_MEMBERS_SUCCESS, FETCH_STUDENT_NATIONALITY, FETCH_STUDENT_NATIONALITY_ERROR,
FETCH_STUDENT_NATIONALITY_SUCCESS,SET_STUDENT_LIST, SET_STUDENT_LIST_ERROR, SET_STUDENT_LIST_SUCCESS, UPDATE_STUDENT_FAMILY_MEMBERS_SUCCESS,
UPDATE_STUDENT_NATIONALITY_ERROR, UPDATE_STUDENT_NATIONALITY_SUCCESS,ADD_ROW_FAMILY, SUBMIT_STUDENT_SECTION,SELECTED_STUDENT_ROW,
  FETCH_ACTIVE_SECTIONS, SELECTED_ROLE} from '../actions/action-types'
import {cloneDeep, findIndex, find} from 'lodash'
import config from 'Config'

export const initialState = {
  studentData: [],
  studentFamilyMember:[],
  studentNationality:[],
  isFetching: false,
  hasError: false,
  error: null,
  activeSectionId: config.activeSectionId,
  familyRowCount: 0,
  submitStudentSection: false,
  selectedStudentData: null,
  isRegistar: true
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
      const editPath = findIndex(studentDataArr, question => question.sectionId === payload.sectionId)

      if (editPath === -1) {
        studentDataArr.push({sectionId: payload.sectionId,
          questions: payload.json})
      } else {
        studentDataArr[editPath] = {sectionId: payload.sectionId,
          questions: payload.json}
      }
      return Object.assign({}, state, {
        data: dataArr,
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
    default:
      return state
  }
}

