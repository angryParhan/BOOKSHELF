const mysql = require('mysql')
const uuid = require('uuid')
const bycrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../config/keys')
const errorHandler = require('../utils/errorHandler')

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '1111',
  database: 'bookshelf'
});

const auth = {
  login (req, res) {
    pool.getConnection((e, connection) => {
      if (e) {
        errorHandler(res, e)
        return
      }
      connection.query(`SELECT * FROM bookshelf.users WHERE user_email = '${req.body.value}' OR user_login = '${req.body.value}'`, (error, rows) => {
        if (error) {
          errorHandler(res, error)
          return
        } else if (!(rows||[]).length) {
          res.status(404).json({ message: 'There is no user with this data' })
          return
        }
        const user = rows[0]
        const isPasswordEqual = bycrypt.compareSync(req.body.password, user.user_password)
        if (!isPasswordEqual) {
          res.status(401).json({
            message: 'Password is not equial!'
          })
          return
        }
        const token = jwt.sign({
          email: user.user_email,
          user_id: user.user_id
        }, keys.jwt, {
          expiresIn: 60 * 60
        })
        res.status(200).json({
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
        res.send(400).json({ error: 'There is no fields to check.' })
        return
      } else if (!req.body.value) {
        res.send(400).json({ error: 'Value is empty.' })
        return
      }
      connection.query(`SELECT * FROM bookshelf.users WHERE ${(req.body.field || 'user_email')} = '${(req.body.value || '')}'`, (error, rows) => {
        if (error) {
          errorHandler(res, error)
          return
        }
        res.send(!!rows.length)
      })
    });
  },
  registration (req, res) {
    pool.getConnection((e, connection) => {
      if (e) {
        errorHandler(res, e)
        return
      }
      let sql = ''
      if (req.body.login) {
        sql = `OR user_login = '${req.body.login}'`
      }
      connection.query(`SELECT * FROM bookshelf.users WHERE user_email = '${req.body.email}' ` + sql, (error, rows) => {
        if (error) {
          errorHandler(res, error)
          return
        } else if (rows.length) { // check user existing
          res.send(409).json({ error: 'Row with same value exist!' })
          return
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
          ('${req.body.user_name}', '${uid}', '${req.body.email}', '${password}', '${req.body.login}')`, (er) => {
            if (er) {
              errorHandler(res, er)
              return
            }
            res.send({ uid })
        })
      })
    });
  }
}


module.exports = auth
