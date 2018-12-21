import axios from 'axios'

export const checkStatus = (response) => {
  if (!(response.status >= 200 && response.status < 300)) { // status in the range 200-299 or not
    return Promise.reject(new Error(response.statusText || 'Status not OK'))
  }
  return response
}

export const parseJSON = (response) => {
  return response.data
}

export default (url, options) => {
  return axios(Object.assign({}, {url, ...options}))
    .then(checkStatus)
    .then(parseJSON)
}
