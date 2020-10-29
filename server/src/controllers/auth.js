const mysql = require('mysql');
const uuid = require('uuid')
const bycrypt = require('bcryptjs');
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '1111',
  database: 'bookshelf'
});

const auth = {
  login (req, res) {
    res.send(200).json({
      message: 'Good login'
    })
  },
  registration (req, res) {
    pool.getConnection((e, connection) => {
      if (e) {
        res.send(503).json({ error: e })
        return
      }
      let sql = ''
      if (req.body.login) {
        sql = `OR user_login = '${req.body.login}'`
      }
      console.log(`SELECT * FROM bookshelf.users WHERE user_email = '${req.body.email}'` + sql)
      connection.query(`SELECT * FROM bookshelf.users WHERE user_email = '${req.body.email}' ` + sql, (error, rows, fields) => {
        if (error) {
          res.send(400).json({ error })
          return
        }
        if (rows.length) {
          //error email exist
          res.send({ error: 'email exist' })
          return
        }
        const salt = bycrypt.genSaltSync(10)
        const password = bycrypt.hashSync(req.body.password, salt)
        const uid = uuid.v4()
        console.log(uid)
        connection.query(`
          INSERT INTO bookshelf.users 
          (user_id, user_email, user_password, user_login)
          VALUES 
          ('${uid}', '${req.body.email}', '${password}', '${req.body.login}')`,
          (er, rows, fields) => {
            if (er) {
              res.send({er})
              return
            }
            res.send({rows, fields})
        })
      })
    });
  }
}


module.exports = auth
