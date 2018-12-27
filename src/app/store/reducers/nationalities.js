import { FETCH_ALL_NATIONALITIES, FETCH_ALL_NATIONALITIES_SUCCESS, FETCH_ALL_NATIONALITIES_ERROR} from '../actions/action-types'

export const initialState = {
  nationalities: [],
  isFetching: false,
  hasError: false,
  error: null
}

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case FETCH_ALL_NATIONALITIES:
      return Object.assign({}, state, {
        isFetching: true,
        hasError: false,
        error: null
      })
    case FETCH_ALL_NATIONALITIES_ERROR:
      return Object.assign({}, state, {
        hasError: true,
        error: payload,
        isFetching: false
      })
    case FETCH_ALL_NATIONALITIES_SUCCESS:
      return Object.assign({}, state, {
        nationalities: payload.data,
        isFetching: false
      })
    default:
      return state
  }
}

