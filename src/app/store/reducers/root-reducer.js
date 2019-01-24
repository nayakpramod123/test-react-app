import { combineReducers } from 'redux'
import meta from './meta'
import students from './students'
import familyMembers from './familyMembers'
import nationalities from './nationalities'
import authentication from './authentication'

export default combineReducers({
  meta,
  students,
  familyMembers,
  nationalities,
  authentication
})
