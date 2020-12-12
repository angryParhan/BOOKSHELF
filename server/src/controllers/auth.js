const uuid = require('uuid')
const bycrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const jwtDecode = require('jwt-decode');
const keys = require('../config/keys')
const errorHandler = require('../utils/errorHandler')
const callProcedure = require('../utils/callDBProcedure')
const { connection } = require('../utils/connectionPool')

const auth = {
  login (req, res) {
    connection.then(connection => {
      if (req.body.token) {
        const decoded = jwtDecode(req.body.token.replace('Bearer ', ''));
        req.body.value = req.body.value || decoded.email
        req.body.uid = req.body.uid || decoded.user_id
      }
      connection.query(`SELECT * FROM bookshelf.users WHERE user_email = '${req.body.value}' OR user_login = '${req.body.value}' OR user_id = '${req.body.uid}'`)
        .then(rows => {
          if (!(rows||[]).length) {
            return errorHandler(res, 'There is no user with this data')
          }
          const user = rows[0]
          if (!req.body.uid) {
            // check password
            const isPasswordEqual = bycrypt.compareSync(req.body.password, user.user_password)
            if (!isPasswordEqual) {
              return errorHandler(res, 'Password is not equial!')
            }
          }
          const token = jwt.sign({
            email: user.user_email,
            user_id: user.user_id
          }, keys.jwt, {
            expiresIn: 60 * 60
          })
          return res.send({ token: 'Bearer ' + token })
        })
        .catch(e => errorHandler(res, e))
    }).catch(e => errorHandler(res, e))
  },
  registration (req, res) {
    connection.then(connection => {
      let sql = 'WHERE'
      if (req.body.email) {
        sql += ` user_email='${req.body.email}' ${req.body.login ? 'OR' : ''}`
      } else if (req.body.login) {
        sql += ` user_login='${req.body.login}'`
      }
      connection.query(`SELECT * FROM bookshelf.users ${sql}`)
        .then(rows => {
          if (rows.length) { // check user existing
            return errorHandler(res, 'Row with same value exist!')
          }
          // create password
          const salt = bycrypt.genSaltSync(10)
          const password = bycrypt.hashSync(req.body.password, salt)
          const uid = uuid.v4()
          callProcedure('createUser', [uid, uid + '-fav', req.body.login, req.body.email, req.body.user_name, password])
            .then(() => res.send({ uid }))
            .catch(e => errorHandler(res, e))
        })
        .catch(e => errorHandler(res, e))
    }).catch(e => errorHandler(res, e));
  },
  checkExisted (req, res) {
    connection.then(connection => {
      if (!req.body.field) {
        return errorHandler(res, 'There is no fields to check.')
      } else if (!req.body.value) {
        return errorHandler(res, 'Value is empty.')
      }
      connection.query(`SELECT * FROM bookshelf.users WHERE ${(req.body.field || 'user_email')} = '${(req.body.value || '')}'`)
        .then(rows => res.send(!!rows.length))
        .catch(e => errorHandler(res, e))
    }).catch(e => errorHandler(res, e))
  },
}


module.exports = auth
