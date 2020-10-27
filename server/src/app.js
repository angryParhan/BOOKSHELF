const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mysql = require('mysql')
// const {sequelize} = require('./models')
// const config = require('./config/config')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1111',
  database: 'mydb'
})

connection.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Connected')
  }
})

app.get('/server', (req, res) => {
  connection.query('SELECT * FROM mydb.in_mails', (error, rows, fields) => {
    if (error) {
      res.send({
        error,
      })
      return
    }
    res.send({
      rows,
      fields
    })
  })
})

app.listen(process.env.PORT || 8081)
