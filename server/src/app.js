const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mysql = require('mysql')
const passport = require('passport')
const authRoutes = require('./routes/auth')
// const {sequelize} = require('./models')
// const config = require('./config/config')


const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(passport.initialize())
app.use(cors())
app.use('/api/auth', authRoutes)

require('./middleware/passport')(passport)

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '111111111111',
  database: 'bookshelf'
})

connection.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Connected')
  }
})

app.listen(process.env.PORT || 8090)
