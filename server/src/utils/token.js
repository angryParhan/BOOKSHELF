const jwt = require('jsonwebtoken')
const jwtDecode = require('jwt-decode')
const keys = require('../config/keys')

const prefix = 'Bearer '

function create (email, uid) {
  const token = jwt.sign({
    email,
    uid
  }, keys.jwt, {
    expiresIn: 60 * 60
  })
  return prefix + token
}

function decode (token) {
  if (token) {
    const decoded = jwtDecode(token.replace(prefix, ''));
    return decoded
  }
  return null
}

module.exports.create = create
module.exports.decode = decode
