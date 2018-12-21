export default () => (req, res, next) => {
  res.header('Cache-Control', 'no-cache, no-store, must-revalidate')
  return next()
}
