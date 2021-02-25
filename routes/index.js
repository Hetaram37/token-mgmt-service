'use strict'

const tokenRoute = require('./token.route')

module.exports = (app) => {
  app.use('/api/token', tokenRoute)
}
