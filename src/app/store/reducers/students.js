import { FETCH_STUDENTS, FETCH_STUDENTS_SUCCESS, FETCH_STUDENTS_ERROR, UPDATE_STUDENT_NATIONALITY, UPDATE_STUDENT_DATA, UPDATE_STUDENT_FAMILY_MEMBERS,
UPDATE_STUDENT_DATA_SUCCESS, UPDATE_STUDENT_DATA_ERROR, UPDATE_STUDENT_FAMILY_MEMBERS_ERROR, FETCH_STUDENT_FAMILY_MEMBERS, FETCH_STUDENT_FAMILY_MEMBERS_ERROR,
FETCH_STUDENT_FAMILY_MEMBERS_SUCCESS, FETCH_STUDENT_NATIONALITY, FETCH_STUDENT_NATIONALITY_ERROR,
FETCH_STUDENT_NATIONALITY_SUCCESS,SET_STUDENT_LIST, SET_STUDENT_LIST_ERROR, SET_STUDENT_LIST_SUCCESS, UPDATE_STUDENT_FAMILY_MEMBERS_SUCCESS,
UPDATE_STUDENT_NATIONALITY_ERROR, UPDATE_STUDENT_NATIONALITY_SUCCESS} from '../actions/action-types'
import {cloneDeep, findIndex, find} from 'lodash'

export const initialState = {
  studentData: [],
  studentFamilyMember:[],
  studentNationality:[],
  isFetching: false,
  hasError: false,
  error: null
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
        studentData: payload,
        isFetching: false
      })
    case SET_STUDENT_LIST_SUCCESS:
      const dataArr = cloneDeep(state.studentData)
      dataArr.push(payload.json)
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
    default:
      return state
  }
}

