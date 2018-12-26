import {
  FETCH_FAMILY_MEMBER_NATIONALITY,
  FETCH_FAMILY_MEMBER_NATIONALITY_SUCCESS,
  FETCH_FAMILY_MEMBER_NATIONALITY_ERROR,
  SET_FAMILY_MEMBERS,
  FETCH_STUDENT_FAMILY_MEMBERS_SUCCESS,
  FETCH_STUDENT_FAMILY_MEMBERS_ERROR,
  FETCH_STUDENT_FAMILY_MEMBERS,
  UPDATE_STUDENT_FAMILY_MEMBERS_SUCCESS,
  UPDATE_STUDENT_FAMILY_MEMBERS_ERROR,
  UPDATE_STUDENT_FAMILY_MEMBERS,
  SET_FAMILY_MEMBERS_SUCCESS,
  SET_FAMILY_MEMBERS_ERROR,
  UPDATE_FAMILY_MEMBER_NATIONALITY,
  UPDATE_FAMILY_MEMBER_NATIONALITY_SUCCESS,
  UPDATE_FAMILY_MEMBER_NATIONALITY_ERROR,
  FAMILY_NATIONALITY_INDICATOR,
  DELETE_FAMILY_MEMBERS,
  DELETE_FAMILY_MEMBERS_SUCCESS, DELETE_FAMILY_MEMBERS_ERROR, ADD_FAMILY_BUTTON
} from '../actions/action-types'
import {cloneDeep, findIndex, find} from 'lodash'

export const initialState = {
  familyNationality: null,
  studentFamilyMember: [],
  familyNationalityIndicator: null,
  addButtonTask: true
}

export default (state = initialState, {type, payload, meta}) => {
  switch (type) {
    case FETCH_FAMILY_MEMBER_NATIONALITY:
      return state
    case SET_FAMILY_MEMBERS:
      return state
    case FETCH_STUDENT_FAMILY_MEMBERS:
      return state
    case UPDATE_STUDENT_FAMILY_MEMBERS:
      return state
    case UPDATE_FAMILY_MEMBER_NATIONALITY:
      return state
    case DELETE_FAMILY_MEMBERS:
      return state
    case FETCH_FAMILY_MEMBER_NATIONALITY_SUCCESS:
      return Object.assign({}, state, {
        familyNationality: payload.data
      })
    case FETCH_FAMILY_MEMBER_NATIONALITY_ERROR:
      return Object.assign({}, state, {
        hasError: true,
        error: payload,
        isFetching: false
      })
    case FETCH_STUDENT_FAMILY_MEMBERS_SUCCESS:
      return Object.assign({}, state, {
        studentFamilyMember: payload.data
      })
    case FETCH_STUDENT_FAMILY_MEMBERS_ERROR:
      return Object.assign({}, state, {
        hasError: true,
        error: payload,
        isFetching: false
      })
    case UPDATE_STUDENT_FAMILY_MEMBERS_SUCCESS:
      let familyDataArr = cloneDeep(state.studentFamilyMember)
      if (familyDataArr) {
        const data ={
          ID: payload.data.ID,
          firstName: payload.data.firstName,
          lastName: payload.data.lastName,
          dateOfBirth: payload.data.dateOfBirth,
          relationship: payload.data.relationship
        }
        familyDataArr.push(data)
        return Object.assign({}, state, {
          studentFamilyMember: familyDataArr,
          isFetching: false
        })
      } else {
        const dataValue =[{
          ID: payload.data.ID,
          firstName: payload.data.firstName,
          lastName: payload.data.lastName,
          dateOfBirth: payload.data.dateOfBirth,
          relationship: payload.data.relationship
        }]
        familyDataArr = dataValue
        return Object.assign({}, state, {
          studentFamilyMember: familyDataArr,
          isFetching: false
        })
      }
    case UPDATE_STUDENT_FAMILY_MEMBERS_ERROR:
      return Object.assign({}, state, {
        hasError: true,
        error: payload,
        isFetching: false
      })
    case SET_FAMILY_MEMBERS_SUCCESS:
      const familyDataArray = cloneDeep(state.studentFamilyMember)
      const editPath = findIndex(familyDataArray, family => family.ID.toString() === payload.data.ID)
      if (editPath === -1) {
        familyDataArray.push(payload.data)
      } else {
        const data ={
          ID: payload.data.ID,
          firstName: payload.data.firstName,
          lastName: payload.data.lastName,
          dateOfBirth: payload.data.dateOfBirth,
          relationship: payload.data.relationship
        }
        familyDataArray[editPath] = data
      }
      return Object.assign({}, state, {
        studentFamilyMember: familyDataArray,
        isFetching: false
      })
    case SET_FAMILY_MEMBERS_ERROR:
      return Object.assign({}, state, {
        hasError: true,
        error: payload,
        isFetching: false
      })
    case UPDATE_FAMILY_MEMBER_NATIONALITY_SUCCESS:
      console.log(payload.data)
      return Object.assign({}, state, {
        studentFamilyMember: payload.data,
        isFetching: false
      })
    case UPDATE_FAMILY_MEMBER_NATIONALITY_ERROR:
      return Object.assign({}, state, {
        hasError: true,
        error: payload,
        isFetching: false
      })
    case FAMILY_NATIONALITY_INDICATOR:
      return Object.assign({}, state, {
        familyNationalityIndicator: payload
      })
    case DELETE_FAMILY_MEMBERS_SUCCESS:
      return Object.assign({}, state, {
        studentFamilyMember: payload.data,
        isFetching: false
      })

    case DELETE_FAMILY_MEMBERS_ERROR:
      return Object.assign({}, state, {
        hasError: true,
        error: payload,
        isFetching: false
      })
    case ADD_FAMILY_BUTTON:
      return Object.assign({}, state, {
        addButtonTask: payload
      })
    default:
      return state
  }
}