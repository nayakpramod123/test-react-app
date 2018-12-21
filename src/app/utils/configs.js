/* global __CLIENT__ */
export default (typeof __CLIENT__ !== 'undefined' && __CLIENT__) ? window.__CONFIG__ : require('config')
