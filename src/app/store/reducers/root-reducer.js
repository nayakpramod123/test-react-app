import { combineReducers } from 'redux'
import meta from './meta'
import students from './students'
import familyMembers from './familyMembers'
import nationalities from './nationalities'

export default combineReducers({
  meta,
  students,
  familyMembers,
  nationalities
})
