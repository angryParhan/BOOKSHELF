const mysql = require('mysql')
const uuid = require('uuid')
const bycrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../config/keys')
const errorHandler = require('../utils/errorHandler')

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '111111111111',
  database: 'bookshelf'
});

const auth = {
  login (req, res) {
    pool.getConnection((e, connection) => {
      if (e) {
        errorHandler(res, e)
        return
      }
      connection.query(`SELECT * FROM bookshelf.users WHERE user_email = '${req.body.value}' OR user_login = '${req.body.value}' OR user_id = '${req.body.uid}'`, (error, rows) => {
        if (error) {
          errorHandler(res, error)
          return
        } else if (!(rows||[]).length) {
          return res.send({ message: 'There is no user with this data' })
        }
        const user = rows[0]
        if (!req.body.uid) {
          // check password
          const isPasswordEqual = bycrypt.compareSync(req.body.password, user.user_password)
          if (!isPasswordEqual) {
            return res.send({
              message: 'Password is not equial!'
            })
          }
        }
        const token = jwt.sign({
          email: user.user_email,
          user_id: user.user_id
        }, keys.jwt, {
          expiresIn: 60 * 60
        })
        console.log(token);
        return res.send({
          token: 'Bearer ' + token
        })
      })
    });
  },
  checkExisted (req, res) {
    pool.getConnection((e, connection) => {
      if (e) {
        errorHandler(res, e)
        return
      } else if (!req.body.field) {
        return res.send({ error: 'There is no fields to check.' })
      } else if (!req.body.value) {
        return res.send({ error: 'Value is empty.' })
      }
      connection.query(`SELECT * FROM bookshelf.users WHERE ${(req.body.field || 'user_email')} = '${(req.body.value || '')}'`, (error, rows) => {
        if (error) {
          errorHandler(res, error)
          return
        }
        return res.send(!!rows.length)
      })
    });
  },
  registration (req, res) {
    pool.getConnection((e, connection) => {
      if (e) {
        errorHandler(res, e)
        return
      }
      let sql = 'WHERE'
      if (req.body.email) {
        sql += ` user_email='${req.body.email}' ${req.body.login ? 'OR' : ''}`
      } else if (req.body.login) {
        sql += ` user_login='${req.body.login}'`
      }
      console.log(sql);
      connection.query(`SELECT * FROM bookshelf.users ${sql}`, (error, rows) => {
        if (error) {
          errorHandler(res, error)
          return
        } else if (rows.length) { // check user existing
          return res.send({ error: 'Row with same value exist!', rows })
        }
        // create password
        const salt = bycrypt.genSaltSync(10)
        const password = bycrypt.hashSync(req.body.password, salt)
        const uid = uuid.v4()
        console.log(uid)
        connection.query(`
          INSERT INTO bookshelf.users 
          (user_name, user_id, user_email, user_password, user_login)
          VALUES 
          ('${req.body.user_name}', '${uid}', '${req.body.email || req.body.login}', '${password}', '${req.body.login || req.body.email}')`, (er) => {
            if (er) {
              errorHandler(res, er)
              return
            }
            return res.send({ uid })
        })
      })
    });
  }
}


module.exports = auth
