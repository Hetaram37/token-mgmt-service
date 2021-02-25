const route = require('express').Router()
const {
  createToken,
  checkToken
} = require('../controllers/token.controller')

route.get('/v1/generate/:userId', createToken)
route.get('/v1/verify/:token', checkToken)

module.exports = route
