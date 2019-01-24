import {
  DELETE_SET_UP,
  DELETE_SET_UP_ERROR,
  DELETE_SET_UP_SUCCESS,
  FETCH_SET_UP,
  FETCH_SET_UP_ERROR,
  FETCH_SET_UP_SUCCESS,
  SET_UP_AUTHENTICATION,
  SET_UP_AUTHENTICATION_ERROR,
  SET_UP_AUTHENTICATION_SUCCESS,
  VERIFY_AUTHENTICATION,
  VERIFY_AUTHENTICATION_ERROR,
  VERIFY_AUTHENTICATION_SUCCESS,
  LOGIN_USER,
  LOGIN_USER_ERROR,
  LOGIN_USER_SUCCESS,
  SAVE_OTP,
  VERIFY_OTP,
  VERIFY_OTP_ERROR,
  VERIFY_OTP_SUCCESS
} from '../actions/action-types'
import {cloneDeep} from 'lodash'

export const initialState = {
  loginSuccess: false,
  twoFactor: {},
  twoFactorFetch: {},
  deleteSetUp: false,
  isFetching: false,
  hasError: false,
  error: null,
  isVerified: false,
  otp: '',
  otpVerified: false
}

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case FETCH_SET_UP:
      return Object.assign({}, state, {
        isFetching: true,
        hasError: false,
        error: null
      })
    case DELETE_SET_UP:
    case SET_UP_AUTHENTICATION:
    case VERIFY_AUTHENTICATION:
    case LOGIN_USER:
    case VERIFY_OTP:
      return state
    case DELETE_SET_UP_SUCCESS:
      return Object.assign({}, state, {
        deleteSetUp: true,
        otpVerified: false,
        twoFactor: {},
        isFetching: false,
        isVerified: false
      })
    case DELETE_SET_UP_ERROR:
      console.log('Error in Delete')
      return Object.assign({}, state, {
        hasError: true,
        error: payload,
        isFetching: false
      })
    case FETCH_SET_UP_SUCCESS:
      return Object.assign({}, state, {
        twoFactorFetch: payload.data,
        isFetching: false
      })
    case FETCH_SET_UP_ERROR:
      console.log('Error in Fetch Set up')
      return Object.assign({}, state, {
        hasError: true,
        error: payload,
        isFetching: false
      })
    case SET_UP_AUTHENTICATION_SUCCESS:
      return Object.assign({}, state, {
        twoFactor: payload.data,
        isFetching: false
      })
    case SET_UP_AUTHENTICATION_ERROR:
      console.log('Error in Set up authentication')
      return Object.assign({}, state, {
        hasError: true,
        error: payload,
        isFetching: false
      })
    case VERIFY_AUTHENTICATION_SUCCESS:
      const twoFactorData = cloneDeep(state.twoFactor)
      if (payload.status === 200) {
        twoFactorData['secret'] = twoFactorData.tempSecret
        twoFactorData.tempSecret = ''
      }
      return Object.assign({}, state, {
        isVerified: true,
        otpVerified: true,
        twoFactor: twoFactorData,
        isFetching: false
      })
    case VERIFY_AUTHENTICATION_ERROR:
      console.log('Error in Verify authentication')
      return Object.assign({}, state, {
        hasError: true,
        otpVerified: false,
        error: payload,
        isFetching: false,
        isVerified: false
      })
    case LOGIN_USER_SUCCESS:
      return Object.assign({}, state, {
        loginSuccess: true,
        isFetching: false
      })
    case LOGIN_USER_ERROR:
      console.log('Error in Login Error')
      return Object.assign({}, state, {
        hasError: true,
        error: payload,
        isFetching: false
      })
    case SAVE_OTP:
      return Object.assign({}, state, {
        otp: payload
      })
    case VERIFY_OTP_SUCCESS:
      return Object.assign({}, state, {
        otpVerified: true
      })
    case VERIFY_OTP_ERROR:
      console.log('Error in Verify Otp', payload)
      return Object.assign({}, state, {
        hasError: true,
        otpVerified: false,
        error: payload,
        isFetching: false
      })
    default:
      return state
  }
}
