import loadScript from './load-script'

export default callback => {
  const isGoodBrowser = 'fetch' in window && 'Promise' in window && 'assign' in Object && 'Map' in window && typeof new Map().entries === 'function' && 'Set' in window && typeof new Set().entries === 'function'

  if (isGoodBrowser) {
    callback()
  } else {
    loadScript('https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/7.2.5/polyfill.min.js', callback)
  }
}
