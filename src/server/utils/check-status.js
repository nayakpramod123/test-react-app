const checkStatus = function (response) {
  if (response && response.status >= 200 && response.status < 300) {
    return response
  }
  const error = new Error(response ? response.statusText || 'Status not OK' : 'Status not OK')
  error.response = response
  throw error
}

module.exports = {checkStatus}
