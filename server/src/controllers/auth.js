const mysql = require('mysql');
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
      connection.query(`SELECT * FROM bookshelf.users WHERE user_email = '${req.body.email}'`, (error, rows, fields) => {
        if (error) {
          res.send({ error })
          return
        }
        if (rows.length) {
          //error email exist
          res.send({ error: 'email exist' })
          return
        }
        connection.query(`
          INSERT INTO bookshelf.users 
          (user_email, user_password)
          VALUES 
          ('${req.body.email}', '${req.body.password}')`,
          (error, rows, fields) => {
            res.send({rows, fields})
          })
      })
    });
  }
}


module.exports = auth
