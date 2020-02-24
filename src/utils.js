const middleware = cb => async (req, res, next) => {
  await cb(req, res)
  next()
}

const toList = cb => async (req, res) => res.list = await cb()
const reduceObj = reducer => obj => Object
  .entries(obj)
  .reduce((acc, [key, value])=>Object.assign(acc, {[key]:reducer(value)}), {})

const toListObj = reduceObj(toList)
const asMiddleware = reduceObj(middleware)

module.exports = {
  toListObj, asMiddleware
}