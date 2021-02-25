'use strict'

const jwt = require('jsonwebtoken')
const config = require('config')
const AppError = require('../utils/appError')
const SERVICE_CON = 'TMS_T_S_'

const generateToken = async (userId, expireOn) => {
  console.debug('generateToken() userId: %s, expireOn: %s', userId, expireOn)
  const expireAt = getExpiryTime(expireOn)
  const token = jwt.sign({ id: userId }, config.get('JWT_key'), { expiresIn: expireAt })
  return { token, expireAt }
}

function getExpiryTime (expiryTime) {
  const timeStamp = getTimeStamp()
  if (!expiryTime) {
    expiryTime = config.get('expiry_time')
  }
  const tokenExpireAt = timeStamp + (expiryTime * 60 * 60)
  return tokenExpireAt
}

function getTimeStamp () {
  const currentDate = new Date().getTime()
  const timeStamp = Math.ceil(currentDate / 1000)
  return timeStamp
}

const verifyToken = async (token) => {
  console.debug('verifyToken() token: %s', token)
  if (token) {
    const tokenArray = token.split(' ')
    const tokenData = jwt.verify(tokenArray[1], config.get('JWT_key'))
    console.debug('Data from JWT verify: %s %j', tokenData, tokenData)
    return tokenData
  }
  throw new AppError(null, SERVICE_CON + 401, 'Not Authorized', 'Not Authorized')
}

module.exports = {
  generateToken,
  verifyToken
}
