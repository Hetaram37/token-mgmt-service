'use strict'

const {
  generateToken,
  verifyToken
} = require('../services/token.service')
const { getStatusCode } = require('../utils/statusCode')
const CONTROLLER_CONS = 'TMS_TC_'

const createToken = async (req, res) => {
  try {
    const userId = req.params.userId
    const expireAT = req.query.expireAT
    const respose = await generateToken(userId, expireAT)
    res.status(200).json({
      data: respose,
      status_code: CONTROLLER_CONS + 200,
      status_message: 'Token generated successfully.',
      errors: null
    })
  } catch (error) {
    console.error('Error while generating new token: %s %j', error, error)
    if (getStatusCode(error.status_code)) {
      res.status(getStatusCode(error.status_code)).send(error)
    } else {
      let errors = error
      if (error.errors) {
        errors = error.errors
      }
      res.status(500).json({
        data: null,
        status_code: CONTROLLER_CONS + 500,
        status_message: 'Server error',
        errors: errors
      })
    }
  }
}

const checkToken = async (req, res) => {
  try {
    const token = req.params.token
    const respose = await verifyToken(token)
    res.status(200).json({
      data: respose,
      status_code: CONTROLLER_CONS + 200,
      status_message: 'Token verified successfully.',
      errors: null
    })
  } catch (error) {
    console.error('Error while verifying token: %s %j', error, error)
    if (getStatusCode(error.status_code)) {
      res.status(getStatusCode(error.status_code)).send(error)
    } else {
      let errors = error
      if (error.errors) {
        errors = error.errors
      }
      res.status(500).json({
        data: null,
        status_code: CONTROLLER_CONS + 500,
        status_message: 'Server error',
        errors: errors
      })
    }
  }
}

module.exports = {
  createToken,
  checkToken
}
